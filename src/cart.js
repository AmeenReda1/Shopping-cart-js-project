let basket=JSON.parse(localStorage.getItem("data")) ||[]
let label=document.getElementById("label")
let ShoppingCart=document.getElementById("shopping-cart");

let calculation=()=>{
    let cartIcon=document.getElementById("cartAmount")
    //reduce here take the fisrt and the second and plus the togerther
    // and the last parameter 0 to strat count from 0
    cartIcon.innerHTML=
    basket.map(element=>element.item).reduce((x,y)=>x+y,0);
}
calculation();

let generateCartItem=()=>{
    if(basket.length !==0){
        return (ShoppingCart.innerHTML=basket.map((x)=>{
            let{id,item}=x;
            currentItem=shopItemsData.find(element=>element.id==id) || []
        
            return `
                <div class="cart-item">
                    <img width="100" src="${currentItem.img}">
                    <di class="details">
                        <div class="title-price-x">
                            <h4>
                                <p>${currentItem.name}</p>
                                <p class="cart-item-price">$${currentItem.price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>

                        </div>
                        <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${ item==undefined ? 0 : item}  
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                        
                        
                        <h3  id="total-item-price" class="total-item-price"> $${item*currentItem.price}</h3>
                    
                        </div>
                </div>
            `
        }).join(""));

    }
    else{
        ShoppingCart.innerHTML=``;
        label.innerHTML=`
        <h2>Cart is Empty</h2>
        <a href="index.html"><button class="homeBtn">Back To Home</button></a>
        `
        console.log("hello")
    }
}
generateCartItem();
let increment=(id)=>{
    let search=basket.find(x=>  x.id == id)
    if(search===undefined){
        basket.push({
            id:id,
            item:1
        })
    }
    else{
        search.item+=1
    }
    localStorage.setItem("data",JSON.stringify(basket))
    generateCartItem()
    update(id);
}
let decrement=(id)=>{
    let search=basket.find(x=>  x.id == id)
    if(search===undefined)return;

    else if(search.item==0)return;
    else
        search.item -=1

    basket=basket.filter(x=>x.item !==0)
    generateCartItem()
    localStorage.setItem("data",JSON.stringify(basket))
    update(id)
    calculation();
}
let update=(id)=>{
    calculation();
    totalAmount();
    let search=basket.find((x)=>x.id==id);
    if(search){
        document.getElementById(id).innerHTML=search.item ;
    }
    
}

calculation()

let removeItem=(id)=>{
    basket=basket.filter(x=>x.id !==id)
    localStorage.setItem("data",JSON.stringify(basket))
    generateCartItem()
    calculation()
    totalAmount()
}

let clearCart=()=>{
    basket=[];
    generateCartItem()
    localStorage.setItem("data",JSON.stringify(basket));
    calculation()
}

let totalAmount=()=>{
   if(basket.length !==0){
    let amount=basket.map((x)=>{
    let  element=shopItemsData.find(item=>item.id==x.id)||[]
     return x.item* element.price   
    })
    label.innerHTML=
    `
    <h2>Total Bill : $ ${amount.reduce((x,y)=>x+y,0)}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()"class="removeAll">Clear Cart</button>
    `
    
    
   }
   else return
}
totalAmount()