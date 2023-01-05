const header = document.querySelector('#header')
const id = localStorage.getItem('id');
const  trilar = document.querySelector('.trilar')
const  infoContainer= document.querySelector('.info-container')
const nav = document.querySelector('.nav')
// const crewContainer= document.querySelector('.crew-container')
const path = ['cast','crew']
const url = `https://api.themoviedb.org/3/movie/${id}?api_key=5075fc8268166501d285344de4022916&language=en-US`
const url2 = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=5075fc8268166501d285344de4022916&language=en-US`
const url3 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5075fc8268166501d285344de4022916&language=en-US`



window.addEventListener('scroll',(()=>{
  const value = window.pageYOffset
  const nv = nav.getBoundingClientRect().height
  if (value > nv) {
      nav.classList.add('color')
  } else{
    nav.classList.remove('color')
  }

  
}))


const getinfo =(url)=>{
  fetch(url)
  .then(res => res.json())
  .then(json =>{
    
        let html = '';
        if (json.backdrop_path === null) {
          html = ` <div  class="header-cover" style="background-image: url('https://image.tmdb.org/t/p/original//${json.poster_path}');">
  
        
          <h1 class="tittle">${json.title}</h1>
          <div>
              <button class="play"><i class="fa-solid fa-play"></i> play</button>
               <button class="list">my list</button>
          </div>
          <p>${json.overview}</p> 
      </div>`
    
        } else {
          html = ` <div  class="header-cover" style="background-image: url('https://image.tmdb.org/t/p/original//${json.backdrop_path}');">
  
        
          <h1 class="tittle">${json.title}</h1>
          <div>
              <button class="play"><i class="fa-solid fa-play"></i> play</button>
               <button class="list">my list</button>
          </div>
          <p>${json.overview}</p> 
      </div>`
    
        }
       
       
       
       //  json.results[value].id
        header.innerHTML = html
       
       
  })
  
}

const getTriller=(url2)=>{
  
  fetch(url2)
  .then(res => res.json())
  .then(json =>{
      json.results.forEach((e)=>{
        if (e.name.includes('Trailer' )   ) {
              
              trilar.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${e.key}" 
              title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
              encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
          
        } 
  
        
      })
    
  })
  
  // Official Trailer
  // results
  
}


const getActor=(url3)=>{
  fetch(url3)
  .then(res => res.json())
  .then(json => {
    let html = '';
     json.cast.map((e)=>{
  
         html+= ` <div class="info-box">
         <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${e.profile_path}">
         <h5>${e.name}</h5>
         <span>${e.character}</span>
     </div>`
     })
    infoContainer.innerHTML = html
    console.log(json)
  })
  
}



getinfo(url)
getTriller(url2)
getActor(url3)