const loadCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category)
    }
    catch(error){
        console.log(error);
    }
}

const displayCategories = catagories =>{
    const catagoryContainer = document.getElementById('catagory-container');
   
    for(const category of catagories){
    const catagoryDiv = document.createElement('div');
    catagoryDiv.innerHTML = `<div class="fs-4 fw-bold">${category.category_name}</div>`

    catagoryContainer.appendChild(catagoryDiv);

    }
}






loadCategories();
