


const array=['home','world','politics','magazine','technology','science','health','sports','arts','fashion','food','travel'];


let data_format=(k)=>{
   
    let d=document.createElement('h6')
    d.setAttribute('class','card-title')
    let date_pub=k.substring(8,10);
    let mon=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
    let month=parseInt(k.substring(5,7))
    d.innerHTML=mon[month-1]+' '+date_pub;
    return d;
}
let section=(k)=>{
    let d=document.createElement('h4')
    d.setAttribute('class','card-title text-uppercase');
    d.innerHTML=k;
    return d;
}
let title=(k)=>{
    let d=document.createElement('h6')
    d.setAttribute('class','card-title text-capitalize fit-content');
    d.innerHTML=k;
    return d;
}

let img=(k)=>{
   
    let d=document.createElement('img')
     d.setAttribute('src',`${k}`);
    d.setAttribute('alt','image not found')
   
    d.setAttribute('class','img-thumbnail')

    return d;
}
let url=(k)=>{
    
    let d=document.createElement('a')
 
        d.setAttribute('href',`${k}`)
        d.setAttribute('class','nav-link')

    d.setAttribute('target','_blank')
    d.innerHTML='Continue Reading';
    d.style.display='inline'
    return d;

}
let createDomElement=(k,cls,id='')=>{
    let j=document.createElement(k)
    j.setAttribute('class',cls)
    j.setAttribute('id',id)
    return j
}

async function fetchData(category){

    const url = category 
    const response = await fetch(url);
    const data = await response.json();
    return data;

}
let formatdate=()=>{
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let d=new Date();
  const day=days[d.getDate()%7-2]
  const mon=monthNames[d.getDate()%12+1]

  const date=d.getDate()
  const year=d.getFullYear();
  return `${day},${mon},${date},${year}`
}

let createLink=(k)=>{
    let j=createDomElement('li','nav-item')
    let m=createDomElement('a','nav-link text-uppercase',k)
    m.innerHTML=k
    j.append(m)
    return j;

}


let top1=createDomElement('div','container mt-2')
let toprow=createDomElement('div','row')
let toprowdiv=createDomElement('div','col-12 col-lg-2 text-center font-weight-bold dateClass')
let toprowdivp=createDomElement('p','')
toprowdivp.innerHTML=formatdate();

let toprowhead=createDomElement('div','col-12 col-lg-8 text-center')
let toprowheadp=createDomElement('div','pageTitle')
toprowheadp.innerHTML='The New York Times'

toprowhead.append(toprowheadp)

toprowdiv.append(toprowdivp)
toprow.append(toprowdiv,toprowhead)
top1.append(toprow)
document.body.append(top1)

let nav=createDomElement('div','container')
let navrow=createDomElement('div','row')
let navrowdiv=createDomElement('div','col-12')
let navrowdivnav=createDomElement('nav','navbar navbar-expand-lg navbar-light bg-light')

let navrowdivnavbut=createDomElement('button','navbar-toggler')
navrowdivnavbut.setAttribute('type','button')
navrowdivnavbut.setAttribute('data-bs-toggle','collapse')
navrowdivnavbut.setAttribute('data-bs-target','#navbarNav')
navrowdivnavbut.setAttribute('aria-controls','navbarNav')
navrowdivnavbut.setAttribute('aria-expanded','false')
let span=createDomElement('span','navbar-toggler-icon')
navrowdivnavbut.append(span)
let navrowdivnava=createDomElement('a','navbar-brand navBrandClass m-auto')
navrowdivnava.innerHTML='The New York Times'

let navbar=createDomElement('div','navbar-collapse collapse','navbarNav')
let navbarul=createDomElement('ul','navbar-nav')
let li1=createLink('home')
let li2=createLink('world')
let li3=createLink('politics')
let li4=createLink('magazine')
let li5=createLink('technology')
let li6=createLink('science')
let li7=createLink('health')
let li8=createLink('sports')
let li9=createLink('arts')
let li10=createLink('fashion')
let li11=createLink('food')
let li12=createLink('travel')

navbarul.append(li1,li2,li3,li4,li5,li6,li7,li8,li9,li10,li11,li12)
navbar.append(navbarul)
navrowdivnav.append(navrowdivnavbut,navrowdivnava,navbar)
navrowdiv.append(navrowdivnav)
navrow.append(navrowdiv)
nav.append(navrow)
document.body.append(nav)

var m=''
var count=0;
for(let i=0;i<array.length;i++){
    document.getElementById(array[i]).addEventListener('click',function(){
        
        if(!document.getElementById(`contain${array[i]}`)){
        count+=1;m=array[i]
        
      
  main_body(m)
        }else{
            let jam=document.querySelectorAll('.k')
                console.log(jam)
                if(jam.length>0){
                    jam.forEach(element => {
                        
                      document.getElementById(element.id).style.display='none'  
                    });
                }
            document.getElementById(`contain${array[i]}`).style.display='block'
        }
    })
}
   let main_body=(k='home')=>{
    let v=fetchData('https://api.nytimes.com/svc/topstories/v2/'+k+'.json?api-key=nsTBEG6Qu2eE80GAD91nwYACKKYO9GNX')
           
            .then(data=>{
                let jam=document.querySelectorAll('.k')
              
                if(jam.length>0){
                    jam.forEach(element => {
                        
                      document.getElementById(element.id).style.display='none'  
                    });
                }

                let master_div=createDomElement('div','k',`contain${k}`)
                data.results.map((m)=>{
                    let contain=createDomElement('div','container')
                    let column=createDomElement('div','col-12')
                let card=createDomElement('div','card mt-3')
                let cardRow=createDomElement('div','row')
                let column1=createDomElement('div','col-md-8 col-12')
                 let container=createDomElement('div','card-body');
                 
                let data_format1=data_format(m['published_date'])
                let title1=title(m['title'])
                let url1=url(m['url'])
                let img1='';
                
                if(m['multimedia']!=null){
                    if(m['multimedia'].length>1){
                img1=img(m['multimedia'][0]['url'])}
                else{
                    img1=img(m['multimedia']['url'])
                }}
                let abstract1=title(m['abstract'])
                
                let section1=section(m['section'])
         
                container.append(section1,title1,data_format1,abstract1,url1);
                column1.append(container)
                let column2=createDomElement('div','col-md-4 col-12')
                column2.append(img1);
                cardRow.append(column1,column2)
                card.append(cardRow)
                column.append(card)
                contain.append(column)
                master_div.append(contain);
           
                })
               
                document.body.append(master_div)
})
   }

   if(count==0){
       main_body()
   }
   

