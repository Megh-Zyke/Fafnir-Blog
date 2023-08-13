var com = document.getElementById("comment");
var comwin = document.getElementsByClassName("comments")[0];


const close = document.getElementsByClassName("close")[0];

com.addEventListener("click", ()=>{
   comwin.style.display = 'block';
});



close.addEventListener("click", ()=>{
    document.getElementsByClassName("comments")[0].style.display = 'none';
});


var count = 0;

const like = document.getElementById("like");

like.addEventListener("click", ()=>{
    count++;
    if(count%2 == 0){
    like.style.color = "red";}
    else{
        like.style.color = "black";
    }
});




