

const key ="563492ad6f917000010000010068185655e747e88b3a946dc3d740dc"
const Container=document.querySelector(".container");
const BtnSearch=document.querySelector(".search_btn")
const InputSearch=document.querySelector(".Search_Input>input")
const LoadMore=document.querySelector(".LoadMore")
var n=1;
var SearchNextPage=""
var SearchStatus=false;
var MyData

creatGallery()

//Creat Gallery in first time 
async function creatGallery(url)
{
	let mydata = await fetch(`https://api.pexels.com/v1/curated?per_page=16&page=1`,{
		method: "GET",
		headers:{
			Accept: "application/json",
			Authorization: key
		}
	})
	let data =await mydata.json();

	createImage(data)
}


//Search Photo function
async function SearchPhoto(query)
{
 let mydata = await fetch(`https://api.pexels.com/v1/search?query=${query}`,{
	 method: "GET",
	 headers:{
		 Accept: "application/json",
		 Authorization: key
	 }
 })
 let data =await mydata.json();
 console.log(data.next_page)
 SearchNextPage=data.next_page;
 MyData=data;
 createImage(data)

}

// Creat and Append PicDiv
function createImage(data){
	if(data.total_results!==0){
		let photos= data.photos
		photos.forEach(photo=>{
		let newDiv=document.createElement("div");
	    newDiv.classList.add("pic");
		newDiv.innerHTML=`<img src=${photo.src.large}></img>
		<p>${photo.photographer}</p>`
		Container.appendChild(newDiv)
		
		})
	}else {
		let Newhead=document.createElement("h1");
		Newhead.classList.add("NoResult");
		Newhead.textContent="Sorry No Results"
		Container.appendChild(Newhead)
	}
   }
   
//Btn Search 
BtnSearch.addEventListener("click",()=>{
	
	console.log(InputSearch.value)
	let InputTxt=InputSearch.value
	if(InputTxt=="" || InputTxt== null){
		return
	}else {
		SearchPhoto(InputTxt)
		ClearTheGallery()
		InputTxt=""
	}
	SearchStatus=true;
})


function ClearTheGallery(){
	Container.innerHTML=""
}

LoadMore.addEventListener("click",()=>{
	
	console.log(n)
	
	if(SearchStatus){
		LoadMoreSearch(SearchNextPage)
	}else{
		n++
		LoadMoreImages(n)
	}
	
})

async function LoadMoreImages(page){
	let mydata = await fetch(`https://api.pexels.com/v1/curated?per_page=16&page=${page}`,{
		method: "GET",
		headers:{
			Accept: "application/json",
			Authorization: key
		}
	})
	let data =await mydata.json();
	console.log(data)
	createImage(data)
}
async function LoadMoreSearch(url){
	console.log(url)
	let mydata = await fetch(url,{
		method: "GET",
		headers:{
			Accept: "application/json",
			Authorization: key
		}
	})
	let data =await mydata.json();
	console.log(data)
	createImage(data)
	SearchNextPage=data.next_page
	
}


