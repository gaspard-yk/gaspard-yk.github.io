let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
tg.expand(); //расширяем на все окно
tg.MainButton.text = "Купить"; //изменяем текст кнопки
tg.MainButton.textColor = "#F55353"; //изменяем цвет текста кнопки
tg.MainButton.show()
Telegram.WebApp.onEvent('mainButtonClicked', function(){
   if(Object.keys(cart).length==0){
      return;
   }
   let sumprice=0;
   let cartstring="";
   for(let id in cart){
      sumprice = sumprice+cart[id]['count']*cart[id]['cost'];
      cartstring=cartstring+"\n name "+ cart[id]['name']+" count "+cart[id]['count']+ " cost "+cart[id]['cost'];
     }
   tg.sendData("sum = "+sumprice + "\n"+ cartstring);  //при клике на основную кнопку отправляем данные в строковом виде}
});

//let usercard = document.getElementById("usercard"); //получаем блок usercard 
//let profName = document.createElement('p'); //создаем параграф
//profName.innerText = `${tg.initDataUnsafe.user.first_name}
//${tg.initDataUnsafe.user.last_name}
//${tg.initDataUnsafe.user.username} (${tg.initDataUnsafe.user.language_code})`;
//выдем имя, "фамилию", через тире username и код языка
//usercard.appendChild(profName); //добавляем 
//let userid = document.createElement('p'); //создаем еще параграф 
//userid.innerText = `${tg.initDataUnsafe.user.id}`; //показываем user_id
//usercard.appendChild(userid); //добавляем 


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
let mycart ={};
document.onclick = event=>{
   if(event.target.classList.contains('plus')){
      plusFunction(event.target.dataset.id);
   }
   if(event.target.classList.contains('minus')){
      minusFunction(event.target.dataset.id);
   }
   if(event.target.classList.contains('show')){
     showCartFunction(cart);
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
   var qty_el = document.getElementById(id); var qty = qty_el.value; if( !isNaN( qty )) qty_el.value++;return false;
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
   var qty_el = document.getElementById(id); var qty = qty_el.value; if( !isNaN( qty )) qty_el.value--;return false;
}


// удаление товара
const deleteFunctiom=id=>{
   delete cart[id];
   var qty_el = document.getElementById(id); var qty = qty_el.value; if( !isNaN( qty )) qty_el.value=0;return false;
}


const renderCart =()=>{
   console.log(cart);
}


//вывести содержимое корзины 
const showCartFunction=cart=>{
   if(Object.keys(cart).length==0){
      return;
   }
   else{
     let sumprice=0;
     let cartstring="";
     for(let id in cart){
      sumprice = sumprice+cart[id]['count']*cart[id]['cost'];
      cartstring=cartstring+"\n name "+ cart[id]['name']+" count "+cart[id]['count']+ " cost "+cart[id]['cost'];
     }
    alert("sum = "+sumprice + "\n"+ cartstring);
   }
}


