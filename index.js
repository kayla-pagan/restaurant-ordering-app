import { menuArray } from '/data.js'
const modal = document.getElementById('modal')
const checkoutBtn = document.getElementById('checkout-btn')
const payBtn = document.getElementById('pay-btn')
let totalPrice = 0

document.addEventListener('click', function(e){
    
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove,e)
    }
    else if(e.target.id === 'checkout-btn'){
        displayModal()
    }
    else if(e.target.id === 'pay-btn'){
        submitPayment(e)        
    }
    else if(e.target.id === 'close-btn'){
        closeModal()
    }
})





function handleAddClick(foodId){
    const targetFoodObj = menuArray.filter( (menuItem) => {
        return menuItem.id == foodId
    } )[0]
    
    renderOrder(targetFoodObj)
}

function hideCart(){
    if(document.getElementById('items-and-total').childElementCount < 1){
        document.getElementById('checkout').classList.add("d-none")
    }
}

function handleRemoveClick(foodId,clicked){
    const targetFoodObj = menuArray.filter( (menuItem) => {
        return menuItem.id == foodId
    } )[0]
    renderSubtractTotal(targetFoodObj)
    clicked.target.closest('#order-item').remove()
    hideCart()
}

function renderOrder(orderItem){
    document.getElementById('checkout').classList.remove("d-none")
    document.getElementById('items-and-total').innerHTML += `
         <div id="order-item" class="flex align-center justify-between w-100">
            <div class="flex align-center">
                <h2>${orderItem.name}</h2>
                <button data-remove="${orderItem.id}" class="remove-btn">remove</button>
            </div>
            <div class="price">
                <h2>$${orderItem.price}</h2>
            </div>
         </div>
         `
    renderAddTotal(orderItem)
}

function renderAddTotal(orderItem){
    totalPrice += orderItem.price
    document.getElementById('total').textContent = `\$${totalPrice}`
}

function renderSubtractTotal(targetFoodObj){
    totalPrice -= targetFoodObj.price
    document.getElementById('total').textContent = `\$${totalPrice}`
}

function displayModal(){
    modal.classList.remove("d-none")
    modal.style.display = 'block' 
}

function closeModal(){
    modal.style.display = 'none'
}

function submitPayment(e){
    e.preventDefault()
    
    setTimeout(function(){
       modal.innerHTML = `
       <div class="submit">
            <i id="close-btn" class="fa-duotone fa-x" style="--fa-secondary-opacity: 0.4;"></i>
            <div class="flex justify-center align-center gap-1">
                <h2>Thank you!</h2>
                <img src="./images/green-heart.png">
            </div>
            <img src="./images/making-your-salad.gif">
            <h2>We'll notify you when your order is ready</h2>
       </div>` 
    }, 600)
}

function getMenuHtml(){
    let menuHtml = ``
    
    menuArray.forEach(function(menuItem){
        
        menuHtml += 
        `
            <div class="flex flex-column justify-between align-center bb-grey gap-1 py-2">
                <div class="item-info flex align-center gap-2">
                    <img src="${menuItem.image}">
                    <div>
                        <h2>${menuItem.name}</h2>
                        <p class="fc-light-grey">${menuItem.ingredients}</p>
                        <p>$${menuItem.price}</p> 
                    </div>
                </div>
                <button data-add="${menuItem.id}" class"flex justify-center align-center">
                    <i data-add="${menuItem.id}" class="fa-solid fa-plus"></i>
                </button>
            </div>
        `
    })
    return menuHtml
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHtml()
}

renderMenu()


    

