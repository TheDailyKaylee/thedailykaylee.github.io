
function login() {
var username = document.getElementById('username').value;
var password =  document.getElementById('password').value;
if ((username=='Klee'&& password=='wordsaremagic')||(username=='Mlee' && password=='magicmom')||(username=='Llee'&& password=='deftdad')||(username=='Dlaney'&& password=='hazelunicorn')||(username=='guest'&& password=='writing1')||(username=='jyen'&& password=='humanities102')||(username=='bwhipp'&& password=='humanities64')){
window.location.href='index.html';
}
} 
var likeCount = 0;

function like() {
    var likes = document.getElementById('likes');
    likeCount += 1;
    likes.innerHTML = 'Likes: ' + likeCount;
}

