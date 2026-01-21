function handleLogin(){
    const textInput = document.getElementById("textInput").value.trim() ;
    const passwordInput = document.getElementById("passwordInput").value;

    if(!textInput){
        alert("Please Tell use your Name first");
        return;
    }

    if(passwordInput !== "123456"){
        alert("Wrong Password. Contact admin to get your Login Code");
        return;
    }
  document.getElementById("bannerSection").classList.add("hidden");



  document.getElementById("navbarSection").classList.remove("hidden");
  document.getElementById("learnSection").classList.remove("hidden");
  document.getElementById("faqSection").classList.remove("hidden")
}


function logout(){
    const logoutBtn = document.getElementById("logout");

    document.getElementById("bannerSection").classList.remove("hidden");

    document.getElementById("navbarSection").classList.add("hidden");
    document.getElementById("learnSection").classList.add("hidden");
    document.getElementById("faqSection").classList.add("hidden")

}

/* ================= LOADER ================= */
function showLoader(){
    const loader = document.getElementById("loader");
    if(loader) loader.classList.remove("hidden");
}

function hideLoader(){
    const loader = document.getElementById("loader");
    if(loader) loader.classList.add("hidden");
}



function loadCategories () {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data)=> displayCategories(data.data))
   
}

function displayCategories (data){
    const LearnVocabulariesContainer = document.getElementById("LearnVocabularies-container");
    
    for(let cat of data){
        const categoriesDiv = document.createElement("div")
        categoriesDiv.innerHTML = `
            <button id = "btn-${cat.level_no}" onclick = "loadLessonLevel(${cat.level_no})" class="btn font-semibold text-sm text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"> <i class="fa-solid fa-book-open"></i> Lesson- ${cat.level_no}</button>
    
        `
        LearnVocabulariesContainer.append(categoriesDiv)
    }
}

loadCategories();


function loadLessonBtn(){
    fetch("https://openapi.programming-hero.com/api/level/5")
    .then((res) => res.json())
    .then((data) => displayLesson(data.data))
}

const displayLesson = (data)=>{
    const lessonContainer = document.getElementById("lesson-Container")
    lessonContainer.innerHTML = "";

    if(data.length == 0){
        lessonContainer.innerHTML = `
            <div class="col-span-full flex flex-col justify-center items-center     text-center py-10">
                    <img class="w-[140px]" src="./assets/alert-error.png" alt="">
                    <h4 class="text-[#79716B] py-5">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h4>
                    <h1 class="font-medium text-4xl">নেক্সট Lesson এ যান</h1>
                </div>
        `;
        return;
    }
    data.forEach((lesson) =>{
        const lessonCard = document.createElement("div")
        lessonCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm ">
                <div class="card-body items-center my-3 text-center">
    
                    <div class="">
                        <h1 class="text-3xl font-bold">${lesson.word}</h1>
                    </div>
                    <div>
                        <h3>Meaning / pronunciation</h3>
                    </div>
                    <div class="mb-3">
                        <p class="text-xl font-medium">${lesson.meaning || "অর্থ নেই"} / ${lesson.pronunciation}</p>
                    </div>
                    
                    <div class="flex gap-x-60 pt-10">
                        <div class="details">
                            <i onclick = loadDetails(${lesson.id}) class=" btn place-content-center bg-[#1A91FF10] fa-solid fa-circle-info "></i>
                        </div>
                        <div>
                            <i class="btn place-content-center bg-[#1A91FF10] fa-solid fa-volume-high"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
        lessonContainer.append (lessonCard)
    });
}


const loadLessonLevel = (level_no) =>{
    
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
    
    showLoader();
    fetch(url)
    .then(res => res.json())
    .then(data=>{
        removeActiveClass();
        const clickButton = document.getElementById(`btn-${level_no}`)
        clickButton.classList.add("active")
        displayLesson(data.data)
    })
    .finally(() => hideLoader());
}

function removeActiveClass (){
    const activeButton = document.getElementsByClassName("active");
    for(let btn of activeButton){
        btn.classList.remove("active")
    }

}


const loadDetails = (wordId) => {
    console.log(wordId)
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => showModal(data.data));
}

const showModal = (data) => {
    document.getElementById("my_modal_lesson").showModal();
    const modelContainer = document.getElementById("modelContainer");
    modelContainer.innerHTML = `
        <div class="border-2 border-[#EDF7FF] px-3 rounded-xl">
            <h1 class="font-semibold text-4xl my-4">${data.word}
            <span>(<i class="fa-solid fa-microphone"></i> : ${data.pronunciation})</span>
        </h1>
        <h1 class="font-semibold text-2xl mb-1">Meaning:</h1>
        <p class="mb-3 font-medium text-lg">
            ${data.meaning || "অর্থ পাওয়া যায়নি"}
        </p>

        <h1 class="font-semibold text-xl mb-1">Example:</h1>
        <p class="mb-3 text-lg text--[#000000]">
            ${data.sentence}
        </p>

        <h1 class="text-xl mt-4">সমার্থক শব্দ গুলো</h1>
        <p class="mb-1">
            ${data.synonyms}
        </p>
        </div>
    `
}

 const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {

      faqItems.forEach(i => {
        if (i !== item) {
          i.querySelector('.faq-content').classList.add('hidden');
          i.querySelector('.faq-icon').textContent = '+';
        }
      });

      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');

      content.classList.toggle('hidden');
      icon.textContent = content.classList.contains('hidden') ? '+' : '−';
    });
  });