const APILINK='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e62a8a86d91ac5663514aa13ade60294&language=en-US&page=1';
const IMGPATH='https://image.tmdb.org/t/p/w1280';
const SEARCHAPI='https://api.themoviedb.org/3/search/movie?api_key=e62a8a86d91ac5663514aa13ade60294&query="';

const main=document.getElementById("section");
const form =document.getElementById("form");
const search=document.getElementById("query");
returnMovie(APILINK);
function returnMovie(url){
    fetch(url).then(res=>res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(Element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class','card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class','row');

            const div_col = document.createElement('div');
            div_col.setAttribute('class','column');

            const img = document.createElement('img');
            img.setAttribute('class','thumnail');
            img.setAttribute('id','img');
            
            const title=document.createElement('h3');
            title.setAttribute('id','title');
            const center=document.createElement('center');

            title.innerHTML=`${Element.title}`;
            img.src=IMGPATH+Element.poster_path;
            
            center.appendChild(img);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_col.appendChild(div_card);
            div_row.appendChild(div_col);

            main.appendChild(div_row);
        });
    });

}   
form.addEventListener('submit',(e)=>{
    e.preventDefault();
   main.innerHTML='';
   const searchTerm=search.value;
  if (searchTerm){
      returnMovie(SEARCHAPI + searchTerm);
      search.value="";
  }

});