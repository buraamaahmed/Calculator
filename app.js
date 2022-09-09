const inputField = document.querySelector(".screen input");
const numberBtn = document.querySelectorAll(".number");
const operationBtn = document.querySelectorAll(".operation-btn");
const equalBtn = document.querySelector(".equal-btn");
const clearBtn = document.querySelector(".clear-btn");
const signals ={
     operation_clicked:false,
     operation:"",
     stored_value:""
}
for (let i = 0; i < numberBtn.length; i++){
     numberBtn[i].addEventListener('click', insert_number)
}
for (let i = 0; i < operationBtn.length; i++){
     operationBtn[i].addEventListener('click', apply_operation)
}

clearBtn.addEventListener('click',clear_screen)
equalBtn.addEventListener('click',perform_maths)

function insert_number(e) {
     let value = e.target.innerText
     if (signals.operation_clicked) {
          inputField.value =''
          signals.operation_clicked = false
     }
     let currentValue = inputField.value
     if (value === '0' && currentValue === "0") {
          return
     }
     inputField.value = currentValue + value
}
function clear_screen() {
     inputField.value = ""
}
function apply_operation(e) {
     signals.operation = e.target.innerText
     signals.operation_clicked = true
     signals.stored_value = inputField.value
}
function perform_maths() {
     let value1 = parseInt(signals.stored_value)
     let value2 = parseInt(inputField.value)
     if (signals.operation ===  '+') {
          let results = value1 + value2
          inputField.value = results
     }
     if (signals.operation ===  '-') {
          let results = value1 - value2
          inputField.value = results
     }
     if (signals.operation ===  '/') {
          if (value2 === 0) {
               alert('you cannot divide by zero')
               return
          }
          let results = value1 / value2
          inputField.value = results
     }
     if (signals.operation ===  'X') {
          let results = value1 * value2
          inputField.value = results
     }
}