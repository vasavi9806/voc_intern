/* ==========================================================================
   EDITKARO.IN — form handling
   Both the newsletter and contact forms POST to a single Google Apps Script
   Web App, which routes rows into the correct sheet tab based on the
   hidden "formType" field. See /apps-script/Code.gs for the script and
   /apps-script/README.md for the 5-minute deployment steps.

   >>> REPLACE THIS WITH YOUR DEPLOYED WEB APP URL <<<
   ========================================================================== */
window.EK_SCRIPT_URL = "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec";

(function () {
  "use strict";

  function setStatus(el, state, message) {
    if (!el) return;
    el.dataset.state = state;
    el.textContent = message;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function handleSubmit(form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var statusEl = form.querySelector(".form-status");
      var honey = form.querySelector(".honey");
      if (honey && honey.value) return; // bot caught by honeypot, silently drop

      var emailField = form.querySelector('[type="email"]');
      if (emailField && !isValidEmail(emailField.value)) {
        setStatus(statusEl, "err", "Enter a valid email address.");
        emailField.focus();
        return;
      }

      var requiredFields = form.querySelectorAll("[required]");
      for (var i = 0; i < requiredFields.length; i++) {
        if (!requiredFields[i].value.trim()) {
          setStatus(statusEl, "err", "Please fill in all required fields.");
          requiredFields[i].focus();
          return;
        }
      }

      var submitBtn = form.querySelector('[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      setStatus(statusEl, "", "");

      var data = new FormData(form);

      var configured = window.EK_SCRIPT_URL && window.EK_SCRIPT_URL.indexOf("REPLACE_WITH") === -1;

      if (!configured) {
        // No Apps Script deployed yet — fail gracefully, keep dev/testers unblocked.
        console.warn("EK_SCRIPT_URL is not configured yet. See /apps-script/README.md.");
        setStatus(
          statusEl,
          "err",
          "Form isn't connected to a sheet yet — see apps-script/README.md to finish setup."
        );
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        return;
      }

      fetch(window.EK_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script web apps don't return CORS headers by default
        body: data
      })
        .then(function () {
          // "no-cors" gives us an opaque response, so we optimistically treat this as success.
          setStatus(statusEl, "ok", form.dataset.successMessage || "Thanks — you're on the list.");
          form.reset();
        })
        .catch(function (err) {
          console.error("Form submit failed:", err);
          setStatus(statusEl, "err", "Something went wrong. Please try again in a moment.");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        });
    });
  }

  document.querySelectorAll("form[data-ek-form]").forEach(handleSubmit);
})();
