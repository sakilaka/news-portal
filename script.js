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
    catagoryDiv.innerHTML = `<div onclick="loadCategoryDetails(${category.category_id})" class="fs-4 fw-bold">${category.category_name}</div>`

    catagoryContainer.appendChild(catagoryDiv);

    }
}

// load Category Details by category id

const loadCategoryDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryDetails(data.data);
    }
    catch(error){
        console.log(error);
    }
  }
        
//   display Category Details

const displayCategoryDetails = news =>{
    console.log(news);
    const catagoryDetail = document.getElementById('category-details');
    news.forEach(list =>{
        const listDiv = document.createElement('div');
        listDiv.classList.add('row' , 'my-3','border' ,'border-dark');
        listDiv.innerHTML = `
        <div class="col-lg-2 col-sm-1 border-3" >
          <img src="${list.thumbnail_url}" class="rounded-start" alt="...">
        </div>

        <div class="col-lg-10 col-sm-2">
            <div class="card-body ms-5">
              <h5 class="card-title fw-bold fs-3">${list.title}</h5>
              <p class="card-text fs-5">${list.details.slice(0,500)}</p>
              <div class="d-flex">
               <img class="rounded-pill" style="width:60px; height:60px;" src="${list.author.img}" >
                 <div class="ms-2">
                 <h5 >${list.author.name}</h5>
                 <p>${list.author.published_date}</p>
                 </div>

                 <div class="d-flex" style="margin-left: 120px;margin-top: 8px;">
                    <i class="fa-solid fa-eye mt-1"></i>
                    <h5 class="ms-3">${list.total_view}</h5>
                 </div>



              </div>
            </div>
        </div>
        `
        catagoryDetail.appendChild(listDiv);
    })
              
        

}




loadCategories();
