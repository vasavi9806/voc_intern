const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const summaryInput = document.getElementById("summary");

const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewSummary = document.getElementById("previewSummary");

const educationContainer = document.getElementById("educationContainer");
const experienceContainer = document.getElementById("experienceContainer");

const previewEducation = document.getElementById("previewEducation");
const previewExperience = document.getElementById("previewExperience");
const previewSkills = document.getElementById("previewSkills");

const addEducation = document.getElementById("addEducation");
const addExperience = document.getElementById("addExperience");

const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");

const progressBar = document.getElementById("progressBar");

nameInput.addEventListener("input", () => {
    previewName.textContent = nameInput.value || "Your Name";
    updateProgress();
});

emailInput.addEventListener("input", () => {
    previewEmail.textContent = emailInput.value || "Email";
    updateProgress();
});

phoneInput.addEventListener("input", () => {
    previewPhone.textContent = phoneInput.value || "Phone";
    updateProgress();
});

summaryInput.addEventListener("input", () => {
    previewSummary.textContent =
        summaryInput.value || "Your profile summary will appear here.";
    updateProgress();
});

function updateEducation() {
    previewEducation.innerHTML = "";

    const items = document.querySelectorAll(".education");

    let hasValue = false;

    items.forEach(item => {
        if (item.value.trim() !== "") {
            hasValue = true;
            const li = document.createElement("li");
            li.textContent = item.value;
            previewEducation.appendChild(li);
        }
    });

    if (!hasValue) {
        previewEducation.innerHTML = "<li>No Education Added</li>";
    }

    updateProgress();
}

function updateExperience() {
    previewExperience.innerHTML = "";

    const items = document.querySelectorAll(".experience");

    let hasValue = false;

    items.forEach(item => {
        if (item.value.trim() !== "") {
            hasValue = true;
            const li = document.createElement("li");
            li.textContent = item.value;
            previewExperience.appendChild(li);
        }
    });

    if (!hasValue) {
        previewExperience.innerHTML = "<li>No Experience Added</li>";
    }

    updateProgress();
}

document.addEventListener("input", e => {

    if (e.target.classList.contains("education")) {
        updateEducation();
    }

    if (e.target.classList.contains("experience")) {
        updateExperience();
    }

});
addEducation.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Degree";
    input.className = "education";
    educationContainer.appendChild(input);
});

addExperience.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Experience";
    input.className = "experience";
    experienceContainer.appendChild(input);
});

const skillCheckboxes = document.querySelectorAll(".skills input");

skillCheckboxes.forEach(skill => {

    skill.addEventListener("change", () => {

        previewSkills.innerHTML = "";

        skillCheckboxes.forEach(item => {

            if(item.checked){

                const span = document.createElement("span");

                span.className = "skill-tag";

                span.textContent = item.value;

                previewSkills.appendChild(span);

            }

        });

        updateProgress();

    });

});

function updateProgress(){

    let total = 0;

    let completed = 0;

    total += 4;

    if(nameInput.value.trim()!="") completed++;
    if(emailInput.value.trim()!="") completed++;
    if(phoneInput.value.trim()!="") completed++;
    if(summaryInput.value.trim()!="") completed++;

    total++;

    const education = document.querySelectorAll(".education");

    for(let item of education){

        if(item.value.trim()!=""){

            completed++;
            break;

        }

    }

    total++;

    const experience = document.querySelectorAll(".experience");

    for(let item of experience){

        if(item.value.trim()!=""){

            completed++;
            break;

        }

    }

    total++;

    for(let item of skillCheckboxes){

        if(item.checked){

            completed++;
            break;

        }

    }

    progressBar.style.width = (completed/total)*100 + "%";

}

clearBtn.addEventListener("click",()=>{

    document.querySelectorAll("input").forEach(input=>{

        if(input.type==="checkbox"){

            input.checked=false;

        }else{

            input.value="";

        }

    });

    document.querySelectorAll("textarea").forEach(area=>{

        area.value="";

    });

    previewName.textContent="Your Name";
    previewEmail.textContent="Email";
    previewPhone.textContent="Phone";
    previewSummary.textContent="Your profile summary will appear here.";

    previewEducation.innerHTML="<li>No Education Added</li>";
    previewExperience.innerHTML="<li>No Experience Added</li>";
    previewSkills.innerHTML="";

    progressBar.style.width="0%";

});

downloadBtn.addEventListener("click",()=>{

    const element=document.querySelector(".resume");

    html2pdf()
    .set({
        margin:0.5,
        filename:"Resume.pdf",
        image:{type:"jpeg",quality:1},
        html2canvas:{scale:2},
        jsPDF:{unit:"in",format:"a4",orientation:"portrait"}
    })
    .from(element)
    .save();

});

updateProgress();