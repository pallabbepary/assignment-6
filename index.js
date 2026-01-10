function loadCategories () {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data)=> displayCategories(data.data))
    // .then((data)=> console.log(data.data))
}

function displayCategories (data){
    // console.log(data);

    const categoriesContainer = document.getElementById("categories-container");
    for(let cat of data){
        // console.log(cat)
        const categoriesDiv = document.createElement("div")
        categoriesDiv.innerHTML = `
            <button class="btn font-semibold text-sm text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white">${cat.level_no}<img src="./assets/fa-book-open.png" alt=""> -Lesson</button>
    
        `
        categoriesContainer.append(categoriesDiv)
    }
}

loadCategories();


function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/level/5")
    .then((res) => res.json())
    .then((data) => console.log(data.data))
}


loadVideos()