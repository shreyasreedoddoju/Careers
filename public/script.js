const cards = document.querySelectorAll(".card");
const btns = document.querySelectorAll(".btns");
const slider = document.getElementById("slider");

for(i = 0; i < btns.length; i++){

    btns[i].addEventListener("click",(e)=>{
        
        e.preventDefault();
        const filter = e.target.dataset.filter;
        //console.log(filter);

        cards.forEach((products)=>{
            if(filter == ""){
                products.style.display="block";
            } else {
                if(products.classList.contains(filter)){
                    products.style.display="block";
                } else {
                    products.style.display="none";
                }
            }
        })

       
    })


}
