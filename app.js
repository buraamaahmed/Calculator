const productsContainer = document.querySelector(".products-center")
const cartBtn = document.querySelector(".cart-btn")
const cartOverlay = document.querySelector(".cart-overlay")
const cart = document.querySelector(".cart")
const closeCartBtn = document.querySelector(".close-cart")
const cartContent = document.querySelector(".cart-content")
const cartQtyBtn = document.querySelector(".cart-items")
const clearCartBtn = document.querySelector(".clear-cart")

const ajaxResult = {
     "items": [
          {
          "sys": { "id": "1" },
          "fields": {
               "title": "queen panel bed",
               "price": 10.99,
               "image": { "fields": { "file": { "url": "./images/product-1.jpeg" } } }
          }
          },
          {
          "sys": { "id": "2" },
          "fields": {
               "title": "king panel bed",
               "price": 1012.99,
               "image": { "fields": { "file": { "url": "./images/product-2.jpeg" } } }
          }
          },
          {
          "sys": { "id": "3" },
          "fields": {
               "title": "single panel bed",
               "price": 1200.99,
               "image": { "fields": { "file": { "url": "./images/product-3.jpeg" } } }
          }
          },
          {
          "sys": { "id": "4" },
          "fields": {
               "title": "twin panel bed",
               "price": 999.99,
               "image": { "fields": { "file": { "url": "./images/product-4.jpeg" } } }
          }
          },
          {
          "sys": { "id": "5" },
          "fields": {
               "title": "fridge",
               "price": 799.99,
               "image": { "fields": { "file": { "url": "./images/product-5.jpeg" } } }
          }
          },
          {
          "sys": { "id": "6" },
          "fields": {
               "title": "dresser",
               "price": 599.99,
               "image": { "fields": { "file": { "url": "./images/product-6.jpeg" } } }
          }
          },
          {
          "sys": { "id": "7" },
          "fields": {
               "title": "couch",
               "price": 399.99,
               "image": { "fields": { "file": { "url": "./images/product-7.jpeg" } } }
          }
          },
          {
          "sys": { "id": "8" },
          "fields": {
               "title": "table",
               "price": 239.99,
               "image": { "fields": { "file": { "url": "./images/product-8.jpeg" } } }
          }
          }
     ]
};


let CART = localStorage.getItem("cartItems")
// console.log(CART)
if (CART){
     // console.log("Parsing Cart")
     CART = JSON.parse(CART)
}else{
     // console.log("Initializing Cart")
     CART=[]
     localStorage.setItem("cartItems",JSON.stringify(CART))
}
loadItems()

cartBtn.addEventListener("click",showCart)
closeCartBtn.addEventListener("click",closeCart)
clearCartBtn.addEventListener("click",clearCart)



function showCart() {
     cartOverlay.style.visibility ="visible"
     cart.style.transform = "translateX(0%)"

}
function closeCart() {
     cartOverlay.style.visibility ="hidden"
     cart.style.transform = "translateX(100%)"
}

function loadItems() {
     // console.log("loading items")
     localStorage.setItem("allProducts",JSON.stringify(ajaxResult.items))
     productsContainer.innerHTML = ""
          // console.log("SETTING ITEMS")
     for(let i=0; i<ajaxResult.items.length; i++){
          console.log(isItemInCart(ajaxResult.items[i].sys.id))
          productsContainer.innerHTML += "<article class ='products'>"+
               "<div class ='img-container'>"+
                    "<img src = '"+ ajaxResult.items[i].fields.image.fields.file.url+"' class='product-img' >"+
                    "<button class='bag-btn' data-id='"+ajaxResult.items[i].sys.id+`'><i class='fas fa-shopping-cart'></i> ${isItemInCart(ajaxResult.items[i].sys.id) ? 'In Cart':'Add To Cart'}</button>`+       
               "</div>"+
               "<h3>"+ajaxResult.items[i].fields.title+"</h3>"+
               "<h4>Ghc "+ajaxResult.items[i].fields.price+"</h4>"
          "</article>"          
     }
     // console.log("All items set")
     let addToCartBtns=[...document.querySelectorAll(".bag-btn")];
     addToCartBtns.forEach((btn)=>{
          btn.addEventListener("click",addItemToCart)
          // let clickedItemId = btn.dataset.id
          function addItemToCart() {
               let allItems =JSON.parse(localStorage.getItem("allProducts"));
               // console.log(allItems)
               let clickedItemId=this.dataset.id
               // console.log(clickedItemId)
               let clickedItem = allItems.find((item)=>item.sys.id === clickedItemId)
               // console.log(clickedItem)
               let itemInCart = CART.find((item)=>{
                    // console.log(item)
                   return  item.sys.id === clickedItemId
               })
               // console.log(itemInCart)
               if(!itemInCart){
                    // console.log("item not in cart")
                    CART.push({...clickedItem, qty:1})
                    localStorage.setItem("cartItems",JSON.stringify(CART))
                    loadItems()
                    loadCartItems()
               }                       
          }
          
          // console.log(typeof(clickedItemId))
     });
     // console.log("loading cart items")
     loadCartItems() 
}
function isItemInCart(itemID){
     console.log(CART)
     let itemInCart = CART.find((item)=>{
          return item.sys.id === itemID
     })
     return itemInCart ? true : false          
 }
function loadCartItems() {          
     cartContent.innerHTML = ""
     CART.forEach((item)=>{
          cartContent.innerHTML+=`
                                   </div>
                                        <div class="cart-item">
                                        <img src="${item?.fields?.image?.fields.file.url}" alt="">
                                        <div>
                                             <h4>${item?.fields?.title}</h4>
                                             <h5>${item?.fields?.price}</h5>
                                             <span class="remove-item" data-id="${item?.sys?.id}">Remove</span>
                                        </div>
                                   <div>
                                        <i class="fas fa-chevron-up" data-id="${item?.sys?.id}"> </i>
                                        <div class="item-amount">${item?.qty}</div>
                                        <i class="fas fa-chevron-down" data-id="${item?.sys?.id}"></i>
                                   </div>
                              </div>
                              `
     })
     let removeItemsBtns = document.querySelectorAll(".remove-item")
     removeItemsBtns.forEach((btn)=>{
          btn.addEventListener("click",removeItemFromCart)
     })
          
     let increaseQtyBtns = document.querySelectorAll(".fa-chevron-up")
     increaseQtyBtns.forEach((btn)=>{
          btn.addEventListener("click",increaseQty)
     })
     let decreaseQtyBtns = document.querySelectorAll(".fa-chevron-down")
     decreaseQtyBtns.forEach((btn)=>{
          btn.addEventListener("click",decreaseQty)
     })
     cartQtyBtn.innerText=`${qtyOfLoadCartItems()}`
}

function qtyOfLoadCartItems() {
     // let CartItems = JSON.parse(localStorage.getItem("cartItems"))
     // console.log(CartItems) 
     // REDUCE METHOD
     let qty = CART.reduce((sum,item)=>{
          console.log(sum,item)
          return sum + item.qty
     },0)
     console.log(qty)
     return qty 
}
function clearCart() {
     CART = []
     localStorage.setItem("cartItems",JSON.stringify(CART))
     loadItems()
}
function increaseQty() {
     let clickedCartItemId = this.dataset.id
     let newCart =CART.map((item)=>{
          if (item.sys.id === clickedCartItemId) {
               return{...item, qty:item.qty + 1}
               
          }else{
               return item
          }
     })
     CART = newCart
     // console.log(CART)
     localStorage.setItem("cartItems",JSON.stringify(CART))
     loadItems()
}
function decreaseQty() {
     let clickedCartItemId = this.dataset.id
     let newCart =CART.map((item)=>{
          if (item.sys.id === clickedCartItemId) {
               if (item.qty >1) {
                    return{...item, qty:item.qty - 1}    
               }else{
                    removeItemFromCart(clickedCartItemId)
               }
          }else{
               return item
          }
     })
     CART = newCart
     // console.log(CART)
     localStorage.setItem("cartItems",JSON.stringify(CART))
     loadItems()
}
function removeItemFromCart(rId=0) {    
     let removedItemId
     if (rId > 0) {
          removedItemId= rId
     }else{
          removedItemId = this.dataset.id
     }
     console.log(removedItemId)
     CART=CART.filter((item)=>item.sys.id != removedItemId )
     localStorage.setItem("cartItems",JSON.stringify(CART))
     console.log(CART)
     loadItems()
     loadCartItems()
}