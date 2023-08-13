
const intro = document.getElementsByClassName("intro")[0];

const posts = document.getElementsByClassName("posts")[0];

window.addEventListener("click", ()=>{
    posts.style.display = 'block';
    intro.style.display = 'none';
});


function main(){
    posts.style.display = 'block';
    intro.style.display = 'none';
}

    // Get the textarea element
var textarea = document.getElementById("content");

    // Get the text from the textarea
var text = textarea.value;
    
    // Replace periods with line breaks
text = text.replace(/\r\n/g, "<br>");
    
    // Update the textarea with the new text
textarea.value = text;





