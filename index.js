function loadCategories () {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data)=> displayCategories(data.data))
    // .then((data)=> console.log(data.data))
}

function displayCategories (data){
    // console.log(data);

    const LearnVocabulariesContainer = document.getElementById("LearnVocabularies-container");
    // LearnVocabulariesContainer.innerHTML = ""
    
    for(let cat of data){
        // console.log(cat)
        const categoriesDiv = document.createElement("div")
        categoriesDiv.innerHTML = `
            <button onclick = "loadLessonLevel(${cat.level_no})" class="btn font-semibold text-sm text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white"> <i class="fa-solid fa-book-open"></i> Lesson- ${cat.level_no}</button>
    
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
        // console.log(lesson);*******************
        const lessonCard = document.createElement("div")
        lessonCard.innerHTML = `
            <div class="card bg-base-100 shadow-sm ">
                <div class="card-body items-center my-3">
    
                    <div class="">
                        <h1 class="text-3xl font-bold">${lesson.word}</h1>
                    </div>
                    <div class="mb-3">
                        <h2 class="text-xl font-medium">${lesson.meaning}</h2>
                    </div>
                    <div>
                        <p class="text-2xl text-[#18181B] font-semibold">${lesson.pronunciation}</p>
                    </div>
                    <div class="flex gap-x-60 pt-10">
                        <div class="">
                            <i class=" btn place-content-center bg-[#1A91FF10] fa-solid fa-circle-info "></i>
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


// loadLessonBtn()


const loadLessonLevel = (level_no) =>{
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data=>displayLesson(data.data))
}
