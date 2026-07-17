
/*GALLERY show more and hide btn */
let seeMore=document.querySelector('#seeMore');
let newImgs=document.querySelectorAll('.gallery .display-none');

seeMore.addEventListener('click',()=>{
    if(seeMore.innerText==='Vidi vise'){
        newImgs.forEach((newImg)=>{
            newImg.style.display='block';
        });
        seeMore.innerText='Sakrij';
    }
    else{
        newImgs.forEach((newImg)=>{
            newImg.style.display='none';
        });
        seeMore.innerText='Vidi vise';
    }
});

    
//------------------------------------------------------

