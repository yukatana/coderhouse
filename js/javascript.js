//index page functions:

function calcinit(){
    loadDOM()
    loadButtons()
    getPrices()
}

function calculateBtnFunction(){
    calculate()
    loadDOM()
}

function addToHistoryBtnFunction(){
    addToHistory()
}

//declaration of necessarily global variables:

let calcHistory = JSON.parse(localStorage.getItem("calcHistory")) || []
let motherBreeds
let fatherBreeds
let motherVIScost
let fatherVIScost
let totalVIScost
let totalPGXcost
let totalCost
const motherPGXcost = 30
const fatherPGXcost = 30
let motherKind
let fatherKind
let bornPegaKind

//class for constructing search history objects to be unshifted into the array:

class Search{
    constructor(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, totalCost){
        this.calcDate = new Date //adds current date to every calculation. however, the Date object is destroyed by JSON
        this.motherBreeds = motherBreeds
        this.motherVIScost = motherVIScost
        this.motherPGXcost = motherPGXcost
        this.fatherBreeds = fatherBreeds
        this.fatherVIScost = fatherVIScost
        this.fatherPGXcost = fatherPGXcost
        this.totalVIScost = totalVIScost
        this.totalPGXcost = totalPGXcost
        this.totalCost = totalCost //total USD cost of a breeding round
    }
}

function calculate(){
    //Cost calculation:
    let motherBreedSelect = document.getElementById("motherBreedSelect")
    motherBreeds = parseInt(motherBreedSelect.value)
    let fatherBreedSelect = document.getElementById("fatherBreedSelect")
    fatherBreeds = parseInt(fatherBreedSelect.value)

    switch(motherBreeds)
    {
        case 0: motherVIScost=2000
        break;
        case 1: motherVIScost=4000
        break;
        case 2: motherVIScost=6000
        break;
        case 3: motherVIScost=10000
        break;
        case 4: motherVIScost=16000
        break;
        case 5: motherVIScost=26000
        break;
        case 6: motherVIScost=42000
        break;
        default: motherVIScost = "Invalid breed count"
    }
    switch(fatherBreeds)
    {
        case 0: fatherVIScost=2000
        break;
        case 1: fatherVIScost=4000
        break;
        case 2: fatherVIScost=6000
        break;
        case 3: fatherVIScost=10000
        break;
        case 4: fatherVIScost=16000
        break;
        case 5: fatherVIScost=26000
        break;
        case 6: fatherVIScost=42000
        break;
        default: fatherVIScost = "Invalid breed count"
    }

    //to be displayed under VIS cost:
    !isNaN(motherVIScost) && !isNaN(fatherVIScost) ? totalVIScost = motherVIScost + fatherVIScost : totalVIScost = "Invalid breed count."

    //to be displayed under PGX cost:
    totalPGXcost = motherPGXcost + fatherPGXcost

    //to be displayed in USD under total cost:
    !isNaN(motherVIScost) && !isNaN(fatherVIScost) && !isNaN(PGXprice) && !isNaN(VISprice) ? totalCost = (totalVIScost*VISprice) + (totalPGXcost*PGXprice) : totalCost = "Invalid calculation" 

    //calculation validation:
    isNaN(motherVIScost) || isNaN(fatherVIScost) ? Toastify({
        text: "Invalid calculation!",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {background: "#c9356c"},
        offset: {y: 40}
      }).showToast() :
      Toastify({
        text: "Calculation successful",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {background: "#c9356c"},
        offset: {y: 40}
      }).showToast();

    // Kind calculation:
    let motherKindSelect = document.getElementById("motherKindSelect")
    motherKind = motherKindSelect.value
    let fatherKindSelect = document.getElementById("fatherKindSelect")
    fatherKind = fatherKindSelect.value

    if((fatherKind != "Select pega kind") && motherKind != "Select pega kind") {
        switch (motherKind) {
            case "Hoz": if (fatherKind === "Hoz") {
                bornPegaKind = "Hoz"
            }
            else {
                bornPegaKind = fatherKind
            }
            break;
            case "Campona": if (fatherKind === "Hoz" || fatherKind === "Campona") {
                bornPegaKind = "Campona"
            }
            else {
                bornPegaKind = fatherKind
            }
            break;
            case "Klin": if (fatherKind === "Hoz" || fatherKind === "Campona" || fatherKind === "Klin") {
                bornPegaKind = "Klin"
            }
            else {
                bornPegaKind = fatherKind
            }
            break;
            case "Zan": bornPegaKind = "Zan"
            break;
        }
    }
    else {
        bornPegaKind = "Please, select parent pega kinds."
    }
}


//Add to history button:

function addToHistory() //uses JSON in order to save calcHistory to localStorage
{
    const messageContainer = document.getElementById("messageContainer")
    messageContainer.innerHTML = ""

    if (!isNaN(totalCost))
    {
        calcHistory.unshift(new Search(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, parseFloat(totalCost.toFixed(2))))
        localStorage.setItem("calcHistory", JSON.stringify(calcHistory))

        Toastify({
            text: "Save successful!",
            duration: 2000,
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
            style: {background: "#c9356c"},
            offset: {y: 40}
          }).showToast();
    }
    else
    {
        Toastify({
            text: "You cannot save an invalid breed count!",
            duration: 2000,
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
            style: {background: "#c9356c"},
            offset: {y: 40}
          }).showToast();
    }
}


//Calculation DOM display:

function loadDOM()
{
    if (motherBreeds !== undefined || fatherBreeds !== undefined)
    {  
        const PGXCostTile = document.getElementById("PGXCostTile")
        PGXCostTile.innerText =`${motherPGXcost} | ${fatherPGXcost}`

        const VISCostTile = document.getElementById("VISCostTile")
        VISCostTile.innerText =`${motherVIScost} | ${fatherVIScost}`
        
        const VIScostUSD = (motherVIScost+fatherVIScost)*VISprice
        const PGXcostUSD = (motherPGXcost+fatherPGXcost)*PGXprice

        const totalCostTile = document.getElementById("totalCostTile")
        totalCostTile.innerText =`${totalCost.toFixed(2)} USD
        (${VIScostUSD.toFixed(2)} USD of VIS
        ${PGXcostUSD.toFixed(2)} USD of PGX)`

        const pegaKindTile = document.getElementById("pegaKindTile")
        pegaKindTile.innerText = `${bornPegaKind}`
    }
    else //this is the inital DOM load
    {
        const PGXCostTile = document.getElementById("PGXCostTile")
        PGXCostTile.innerText =`${motherPGXcost} | ${fatherPGXcost}`

        const VISCostTile = document.getElementById("VISCostTile")
        VISCostTile.innerText =`0`

        const TotalCostTile = document.getElementById("totalCostTile")
        TotalCostTile.innerHTML =`0<br><br><br>`

        const pegaKindTile = document.getElementById("pegaKindTile")
        pegaKindTile.innerText = `-`
    }
}

//Button events:

let calculateBtn
let addToHistoryBtn

function loadButtons(){
    calculateBtn = document.getElementById("calculateBtn")
    addToHistoryBtn = document.getElementById("addToHistoryBtn")

    calculateBtn.onclick = () => {calculateBtnFunction()}
    addToHistoryBtn.onclick = () => {addToHistoryBtnFunction()}
}

//History page functions:

function historyinit() {
    createTable()
    getPrices()
}

function createTable() {
    const tableContainer = document.getElementById("calcHistoryTable")
    const table = document.createElement("table")
    table.className = "table"
    table.innerHTML =
    `<thead>
      <tr>
        <th>Date</th>
        <th>Mother breeds</th>
        <th>Mother VIS cost</th>
        <th>Father breeds</th>
        <th>Father VIS cost</th>
        <th>PGX cost</th>
        <th>Total cost</th>
      </tr>
     </thead>`
    tableContainer.append(table)

    if (calcHistory.length > 0) {
        calcHistory.forEach((el) => {
        row = table.insertRow()
        row.insertCell().innerHTML =`${el?.calcDate.substr(0, 10)} ${el?.calcDate.substr(11,5)}`
        row.insertCell().innerHTML =`${el?.motherBreeds}`
        row.insertCell().innerHTML =`${el?.motherVIScost}`
        row.insertCell().innerHTML =`${el?.fatherBreeds}`
        row.insertCell().innerHTML =`${el?.fatherVIScost}`
        row.insertCell().innerHTML =`${el?.totalPGXcost}`
        row.insertCell().innerHTML =`${el?.totalCost} USD`})

        const deleteHistoryButtonContainer = document.createElement("div")
            deleteHistoryButtonContainer.className ="text-center"

        const deleteHistoryButton = document.createElement("button")
            deleteHistoryButton.className = "btn btn-outline-secondary"
            deleteHistoryButton.type = "button"
            deleteHistoryButton.innerText = "Delete history"

        deleteHistoryButton.onclick = () => deleteHistoryButtonFunction()
        tableContainer.appendChild(deleteHistoryButtonContainer)
        deleteHistoryButtonContainer.appendChild(deleteHistoryButton)  
    }
    else{
        let emptyHistoryMessage = document.createElement("p")
        emptyHistoryMessage.innerHTML = "<h3 class='text-center'> Nothing to see here... Yet!</h3>"
        tableContainer.appendChild(emptyHistoryMessage)
    }
}

//Delete history button:

function deleteHistoryButtonFunction() {
    Swal.fire({
        title: "Are you sure you want to delete your search history?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            calcHistory = []
            localStorage.clear()
            const tableContainer = document.getElementById("calcHistoryTable")
            tableContainer.innerHTML = ""
            createTable() //loads empty history table message

            Swal.fire({
                title: "Your history has been deleted!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            })
        }
    })

}

//About page functions:

function aboutinit() {
    getPrices()
}



//deprecated functions:

function filterByDate() //logs new array containing desired search date. must be called manually. not implemented due to lack of practical use
{
    let filterQuery = prompt("Enter calculation date to be filtered (i.e.: Jan 01):")
    calcHistory.forEach(el => el.calcDate = el?.calcDate.toString())
    const filterResult = calcHistory.filter((el) => el?.calcDate.includes(filterQuery))
    console.table(filterResult)
}