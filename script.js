const form=document.querySelector("form")
const result=document.querySelector(".result")



form.addEventListener('submit',(e)=>{
  e.preventDefault();
  getwordinfo(form.elements[0].value);
})


const getwordinfo= async (word)=>{
    try{
        result.innerHTML="Fetching data...."
    const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data= await response.json();
    let defination=data[0].meanings[0].definitions[0];
    result.innerHTML=
       `<h2><strong>Word:</strong>${data[0].word}</h2
       <p class="partofspeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meaning:</strong>${defination.definition===undefined ?"Not found":defination.definition}</p>
     <p><strong>Example:</strong>${defination.example===undefined?"Not found":defination.example}</p>
     <p><strong>Antonyms:</strong></p>`;
     if(defination.antonyms.length===0){
        result.innerHTML+=`<span>Not found</span>`
     }
     //fetching antonyms
     else{
     for(let i=0;i<defination.antonyms.length;i++){
        result.innerHTML+=`<li>${defination.antonyms[i]}</li>`;
     }
    }
    //adding read more button
    result.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
    
    
}
    catch(error){
        result.innerHTML=`<p>Sorry The World Could not be found</p>`
    }
}