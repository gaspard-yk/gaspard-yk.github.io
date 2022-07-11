let range ={
'id0001':{
   "name":"cup",
   "count":0,
   "cost":200,
},
'id0002':{
   "name":"tea",
   "count":0,
   "cost":50,
},
};

let cart ={ };
let mycart ={
};
document.onclick = event=>{
   if(event.target.classList.contains('plus')){
      plusFunction(event.target.dataset.id);
   }
   if(event.target.classList.contains('minus')){
      minusFunction(event.target.dataset.id);
   }
   if(event.target.classList.contains('buy')){
     buyFunction(cart);
   }
}

// увеличение количества товара
const plusFunction=id=>{
   if((id in cart) === false){
      cart[id] = range[id];
      cart[id]['count']=1;
   }
   else{
      cart[id]['count']++;
   }
   renderCart();
}
// уменьшение количества товара
const minusFunction=id=>{
   if ((id in cart) === false){
      return true;
   }
   else if (cart[id]['count']-1==0){
         deleteFunctiom(id);
         return true;
      }
   
   cart[id]['count']--;
   renderCart();
}
// удаление товара
const deleteFunctiom=id=>{
   delete cart[id];
   renderCart();
}

const renderCart =()=>{
   console.log(cart);
}
//!не доделана
const buyFunction=cart=>{
   if(Object.keys(cart).length==0){
      return;
   }
   else{
     let sumprice=0;
     for(let id in cart){
      sumprice = sumprice+cart[id]['count']*cart[id]['cost'];
     }
     console.log(sumprice);
   }
}


