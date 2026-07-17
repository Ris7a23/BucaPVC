/*------------------------------------------------ */

let hamburger=document.querySelector('#burger-btn');
let menu=document.querySelector('.responisve-menu');
let on=0;

//Funkcija za postavljanje pocetne animacije
const hamburger_def=()=>{
    hamburger.firstElementChild.style.transform='translateY(0) rotate(0deg)';
    hamburger.children[1].style.opacity='1';
    hamburger.lastElementChild.style.transform='translateY(0) rotate(0)';
}

hamburger.addEventListener("click",()=>{
    
    if(on===0){
        //Otvara menu
        menu.style.display='flex';
        on=1;
        /*Animacija za menu*/
        hamburger.firstElementChild.style.transform='translateY(8px) rotate(45deg)';
        hamburger.children[1].style.opacity='0';
        hamburger.lastElementChild.style.transform='translateY(-6px) rotate(-45deg)';
    }

    else{
        menu.style.display='none';
        on=0;

        /*Animacija za menu*/
       hamburger_def();//Vracanje na pocetno stanje hamburgera
    }
   
});


let links=document.querySelectorAll('.responisve-menu a');

links.forEach((link)=>{
    link.addEventListener('click',()=>{
        menu.style.display='none';

        hamburger_def();//Vracanje na pocetno stanje hamburgera
    });
});



/*Validacija forme*/
//seletovanje svih inputa
let inputs=document.querySelectorAll('input');
console.log(inputs);

//pravljneje objekta za lakse pronalezenje inputa i kasnije pisanje gresaka
let errors={
    'ime_prezime': [],
    'telefon': [],
    'email': []
}
const functionInput=(e)=>{
        let selectedInput=e.target;
        let name=selectedInput.getAttribute('name');
        let value=selectedInput.value;


        if (value.length < 4) {
            errors[name] = ['Minimum je 4 karaktera'];
        }
        else{
            //Praznimo prethodne greske
            errors[name]=[];
            switch(name){
                case 'ime_prezime':
                    let imePrezime=value.trim();
                    imePrezime=imePrezime.split(" ");
                    if(imePrezime.length<2){
                        errors[name].push('Unesi i ime i prezime')
                    }
                break;

                case 'telefon':
                    if(!/^\+3816\d{8}$/.test(value)){
                        errors[name].push('Broj telefona nije ispravan');
                    }
                break;

                case 'email':



                    if(!validateEmail(value)){
                        errors[name].push('Email nije ispravan');
                    }
                break;
            }
        }



        errorsfunc();
    }
//Prolazimo kroz sve inputove i dajemo im on change funkciju
inputs.forEach((singleInput)=>{
    singleInput.addEventListener('change',functionInput);
});


//funkcija za ispisivanje gresaka
const errorsfunc=()=>{
    //sklanjamio sve ul prvo kako se ne bi gomilali
    for(el of document.querySelectorAll('ul')){
        el.remove();
    }

    for (let key of Object.keys(errors)) {
        let input = document.querySelector(`input[name="${key}"]`);//selektujemo trenutni input
        let parent = input.parentElement; //uzimamo parentElement

        let erorrsElement = document.createElement('ul');
        parent.appendChild(erorrsElement);

        errors[key].forEach((error) => {
            let li = document.createElement('li');
            li.innerText = error;
            erorrsElement.appendChild(li);
        });
    }
};


const validateEmail= email =>{
    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        return true;  
    }
    return false;

};

/*Validacija za textarea */
let txtarea=document.querySelector('textarea');

const functionTextarea=()=>{
    let brisanje;
    let value=txtarea.value;
    console.log(value);
    if(value.length<5){
        
        //selektovanje parentatextaree
        let parent=txtarea.parentElement;
        //SKLANJAMO VISAK LI
        brisanje=parent.querySelector('ul');
        if(brisanje){
            brisanje.remove();
        }

        let ul = document.createElement('ul');
        parent.appendChild(ul);

        
        //kreiranje li
        let li=document.createElement('li');
        ul.appendChild(li);

        li.innerText='Minimum je 4 karaktera';
    }

    else{
        let parent=txtarea.parentElement;
        let ul=parent.querySelector('ul');
        if(ul){
            ul.remove();
        }
        
    }
}
txtarea.addEventListener('change',functionTextarea);

let submit_btn=document.querySelector('#submit-btn');

submit_btn.addEventListener('click',(e)=>{
    e.preventDefault();
});