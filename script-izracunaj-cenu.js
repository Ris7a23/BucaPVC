let allTotal=0;





//KALKULATOR

const cene = {
    "PROZOR":[120, 25],
    "VRATA": [100, 20],
    "ROLETNA":[60, 20],
    "KOMARNIK":[45, 10]
};

//Seletovanje grid kartica

let proizvodi_kartice=document.querySelectorAll('.grid-selection .grid-selection-card');
console.log(proizvodi_kartice);

let proizvod;

//Petljom na sve kartice dodajemo eventListenera za click 
// i uzimamo stvar koju kupujemo
proizvodi_kartice.forEach((proizvod_kartica)=>{
    proizvod_kartica.addEventListener('click',()=>{
        //Menjanje boje za selktovanu karticu
        //postavljamo sve na podrazumevanu boju pa onda mnejamo samo boju ove izabrane kartice
        grid_kartice_boja();

        //menjanje boje izabrane kartice
        proizvod_kartica.style.color='#F4F2EC';
        proizvod_kartica.style.backgroundColor='#0A0E27';

        proizvod=proizvod_kartica.querySelector('h5').innerText;
        console.log(`Izabrao si ${proizvod}`);

        kalkulator_funkcija();
    });
});

//Funkcija za vracenje boja na pocetno
const grid_kartice_boja=()=>{
    proizvodi_kartice.forEach((proizvod_kartica)=>{
        proizvod_kartica.style.color='#0A0E27';
        proizvod_kartica.style.backgroundColor='#F4F2EC';
    });
}

//automatsko racunanje u toku kucanja
let visina=document.querySelector('#visina');
let sirina=document.querySelector('#sirina');
let boja=document.querySelector('select');

boja.addEventListener('input',()=>{
    kalkulator_funkcija();//pozivamo funkciju kako bismo je 'updejtovali'
});

visina.addEventListener('input',()=>{
    kalkulator_funkcija();
});

sirina.addEventListener('input',()=>{
    kalkulator_funkcija();
});



let cena;
let select_boja;
const kalkulator_funkcija=()=>{
        //Provera da li je korisnik izabrao proizvod
        
        if(!proizvod){
            alert("Izaberite proizvod!");
            return;
        }

        //Rad sa input elementima tj uzimanje njihovog value

        let input_visina=visina.value;
        let input_sirina=sirina.value;

        //Pretvaranje stringa koji smo dobili iz inputa
        //u int

        input_visina=parseInt(input_visina);
        input_sirina=parseInt(input_sirina);

        
        //Selektovanje i uzimanje vrednosti iz selecta
        select_boja=boja.value;
    



        //Provera koji je proizvod
        let karakteristike=cene[proizvod];
        let cenam2=karakteristike[0];
    
        let povrsina=(input_visina*input_sirina)/1000000;

        

        
        if(povrsina<1){
        povrsina=1
        }

        if(select_boja==='antracit'){
            cenam2+=cenam2*0.35;
        }

        if(select_boja==='hrast'){
            cenam2+=cenam2*0.20;
        }
   
        cena=povrsina*cenam2;
        cena=cena*kolicina;
        
        if(da_ne===1){
            let montaza_cena=karakteristike[1]*kolicina;

            cena=cena+montaza_cena;
        }

     
    
        
    cena=cena.toFixed(2);
    let cena_p=document.querySelector('#cena-proizvod');
    cena_p.innerText=`Cena za ovaj proizvod je:${cena} €`;
};

//seletovanje dugmeta sa ili bez montaze
let dugme_montaza=document.querySelector('.button-div');
let da_ne=0;

dugme_montaza.addEventListener('click',()=>{
    if(!proizvod){
        alert('Izaberi proizvod');
        return;
    }

    if(da_ne===0){
        da_ne=1;
        dugme_montaza.className='button-div_da';
    }
    else{
        da_ne=0;
        dugme_montaza.className='button-div';
    }

    kalkulator_funkcija();
});


//Kolicina

//seletovanje

let kolicina_div=document.querySelector('.amount');
let kolicina=kolicina_div.innerText;

kolicina=parseInt(kolicina);

let minus=kolicina_div.previousElementSibling;
let plus=kolicina_div.nextElementSibling;

plus.addEventListener('click', ()=>{
    if(kolicina<20){
        kolicina++;
        kolicina_div.innerText=`${kolicina}`;
    }

    kalkulator_funkcija();
});

minus.addEventListener('click', ()=>{
    if(kolicina>1){
        kolicina--;
        kolicina_div.innerText=`${kolicina}`;
    }

    kalkulator_funkcija();
});


/*--------------------------------------------------------------------------------*/
//Funkcja dodaj u korpu


let allTotal_p=document.querySelector('#totalPrice');
allTotal_p.innerText=allTotal;

let addToCart_btn=document.querySelector('#addToCart');

addToCart_btn.addEventListener("click", ()=>{
    

    if(!proizvod){
        alert('Izaberi proizvod');
        return;
    }

    let purchased_area=document.querySelector('.list-items');
    purchased_area.style.justifyContent='flex-start';
    purchased_area.style.border='none';
    //sklanjamo p
    
    let p1=purchased_area.querySelector('p');
    p1.innerText='';
   

    let item=document.createElement('div');
    item.className='item';
    purchased_area.appendChild(item);

    let ugradnja;
    if(da_ne===0){
        ugradnja='bez ugradnje';
    }
    else{
        ugradnja='sa ugradnjom'
    }

    
    item.innerHTML=`<div><h4 class='proizvod-boja-kolicina'>${proizvod}--${select_boja}--${kolicina}X</h4><p class='visna-sirina-montaza'>${visina.value}-${sirina.value}---${ugradnja}</p></div> <div class='item-div-cart-price'><p class='price-item'>${cena}€</p><h2 class='x-btn'>X</h2></div>`;

    
    cena=parseFloat(cena);
    allTotal=allTotal+cena;
    allTotal=parseFloat(allTotal);

    allTotal=parseFloat(allTotal.toFixed(2));
    allTotal_p.innerText=`${allTotal}`;
    
    


    let x_btn=item.querySelector('.x-btn');
    x_btn.addEventListener('click',()=>{
        item.remove();
        let cena=item.querySelector('.price-item').innerText;
        cena=parseFloat(cena);
        allTotal-=cena;
        allTotal=parseFloat(allTotal.toFixed(2));
        allTotal_p.innerText=`${allTotal}`;

        let items=purchased_area.querySelectorAll('.item');

        if(items.length===0){
            purchased_area.style.border='1px solid #B8924A';
            p1.innerText='Niste dodali nijedan proizvod';
            purchased_area.style.justifyContent='center';
        }
    })
       
    
});




