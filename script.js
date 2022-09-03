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
  toggleSpinner(true);
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
    // console.log(news);

    const catagoryDetail = document.getElementById('category-details');
    
    catagoryDetail.innerHTML = ``;
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
                 <h5 >${list.author ? list.author.name : 'No Author name' }</h5>
                 <p>${list.author.published_date}</p>
                 </div>

                 <div class="d-flex" style="margin-left: 120px;margin-top: 8px;">
                    <i class="fa-solid fa-eye mt-1"></i>
                    <h5 class="ms-3">${list.total_view ? list.total_view : 'No View' }</h5>
                 </div>

                 <button onclick="loadListDetails('${list._id}')" style="margin-left: 150px;margin-top: 8px;" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#listDetails">View Details</button>

              </div>
           
            </div>
        </div>
           `
            //  Sort by total_views

          //   list.sort((a, b) => {
          //     return b.total_view - a.total_view;
          // });
           catagoryDetail.appendChild(listDiv);

         
        


// for item count 
      const textField = document.getElementById('text-field');
      textField.innerText = catagoryDetail.childNodes ? catagoryDetail.childNodes.length : 'No ' ;

       })
       toggleSpinner(false)
        
}

const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
      loaderSection.classList.remove('d-none');
    }
    else{
      loaderSection.classList.add('d-none')
    }
  }  
  
 
  

// load one list details 

 const loadListDetails = async news_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayListDetails(data.data[0]);
    }
    catch(error){
        console.log(error);
    }
}

const displayListDetails = info =>{
    // console.log(info);
    
    const listTitle = document.getElementById('listDetailsLabel');
    listTitle.innerHTML = `${info.author ? info.author.name : 'No Author'}`;
    listTitle.innerText = info.author.name;
    const listTable = document.getElementById('listBody');
    listTable.innerHTML = `
    <h5>publish Date : ${info.author.published_date ? info.author.published_date : 'no Publish Date' }</h5>
    <h5>Views : ${info.total_view ? info.total_view : 'no View ' }</h5>
    <h5>Rating Number : ${info.rating.number ? info.rating.number : 'no Rating ' }</h5>
    <h5>Rating Badge : ${info.rating.badge ? info.rating.badge : 'no badge ' }</h5>
    <h5>Is trending : ${info.others_info ? info.others_info.is_trending : 'no information ' }</h5>
    <h5>Is today pick : ${info.others_info ? info.others_info.is_todays_pick : 'no information ' }</h5>
    `
}
    



loadCategories();
