const header = document.querySelector('#header')
const originalsContainer = document.querySelector('#originals')
const upcomingContainer = document.querySelector('#upcoming')
const trendingContainer = document.querySelector('#trending')
const topratedContainer = document.querySelector('#toprated')
const comedyContainer = document.querySelector('#comedy')
const nav = document.querySelector('.nav')
const originals = ['discover','tv',]
const upcoming = ['movie','upcoming',]
const  trending = ['movie','popular']
const toprated = ['movie','top_rated']
const comedy = ['action','movie/list']

const path = [0,1]


window.addEventListener('scroll',(()=>{
  const value = window.pageYOffset
  const nv = nav.getBoundingClientRect().height
  if (value > nv) {
      nav.classList.add('color')
  } else{
    nav.classList.remove('color')
  }

  
}))

window.onload =()=>{
   fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=5075fc8268166501d285344de4022916')
   .then(res => res.json())
   .then(json =>{
         let html = '';
        let value = Math.round(Math.random() * 19)
         html =` <div  class="header-cover" style="background-image: url('https://image.tmdb.org/t/p/original//${json.results[value].backdrop_path}');">

         
         <h1 class="tittle">${json.results[value].title}</h1>
         <div>
             <button class="play"><i class="fa-solid fa-play"></i> play</button>
              <button class="list">my list</button>
         </div>
         <p>${json.results[value].overview}</p> 
     </div>`
  
        
        //  json.results[value].id
         header.innerHTML = html
        
        
   })



   
const display =(url,domelement,path)=>{
  fetch(`https://api.themoviedb.org/3/${url[0]}/${url[1]}?api_key=5075fc8268166501d285344de4022916`)
  .then(res=>res.json())
  .then(json=>{  
    console.log(json)
      let html =''
        json.results.map((item)=>{    
           let dan = [`${item.poster_path}`,`${item.backdrop_path}`]
            html+=`<a href="page.html" ><img  class='image' data-id=${item.id} src="https://image.tmdb.org/t/p/original/${dan[`${path}`]}"/></a>`
        })
       
      
       domelement.innerHTML = html
       const image = document.querySelectorAll('.image');
        image.forEach((e)=>{
          e.addEventListener('click',(item)=>{
            const value = item.target.dataset.id
          localStorage.setItem('id',`${value}`)
      })
        })
       
       
   })
}


display(originals,originalsContainer,path[0])
display(upcoming,upcomingContainer,path[0])
display(trending,trendingContainer,path[1])
display(toprated,topratedContainer,path[1])



}

fetch('https://api.themoviedb.org/3/movie/76600/credits?api_key=5075fc8268166501d285344de4022916&language=en-US')
.then(res => res.json())
.then(json => console.log(json))


