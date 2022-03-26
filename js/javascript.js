function init(){
    loadDOM()
    loadButtons()
}

function calculateBtnFunction(){
    calculate()
    loadDOM()
}

function addToHistoryBtnFunction(){
    addToHistory()
}

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

//class for constructing search history objects to go into the array
class Search{
    constructor(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, totalCost){
        this.calcDate = new Date //adds current date to every calculation
        this.motherBreeds = motherBreeds
        this.motherVIScost = motherVIScost
        this.motherPGXcost = motherPGXcost
        this.fatherBreeds = fatherBreeds
        this.fatherVIScost = fatherVIScost
        this.fatherPGXcost = fatherPGXcost
        this.totalVIScost = totalVIScost
        this.totalPGXcost = totalPGXcost
        this.totalCost = totalCost // won't return USD value until API implementation
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

    //to be displayed in USD under total cost (needs API):
    !isNaN(motherVIScost) && !isNaN(fatherVIScost) ? totalCost = totalVIScost + totalPGXcost : totalCost = "Invalid calculation" 

    //in case of invalid calculation:
    isNaN(motherVIScost) || isNaN(fatherVIScost) ? Toastify({
        text: "Invalid calculation!",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {background: "#c9356c"},
        offset: {y: 65}
      }).showToast() :
      Toastify({
        text: "Calculation successful",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {background: "#c9356c"},
        offset: {y: 65}
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
function addToHistory() //will use JSON in order to save calcHistory to localStorage
{
    const messageContainer = document.getElementById("messageContainer")
    messageContainer.innerHTML = ""

    if (!isNaN(totalCost))
    {
        calcHistory.push(new Search(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, totalCost))
        localStorage.setItem("calcHistory", JSON.stringify(calcHistory))

        Toastify({
            text: "Save successful!",
            duration: 2000,
            gravity: "bottom",
            position: "center",
            stopOnFocus: true,
            style: {background: "#c9356c"},
            offset: {y: 65}
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
            offset: {y: 65}
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

        const totalCostTile = document.getElementById("totalCostTile")
        totalCostTile.innerText =`${totalCost}`

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
        TotalCostTile.innerText =`0`

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

//History page:
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
        row.insertCell().innerHTML =`${el?.totalCost}`})

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






console.table(calcHistory) //displays entire calc history as an array at the end of the cycle

let sortedHistory = calcHistory
console.table(sortedHistory.sort((a,b) => a.totalCost - b.totalCost)) //logs new array in ascending totalCost order

function filterByDate() //logs new array containing desired search date. must be called manually
{
    let filterQuery = prompt("Enter calculation date to be filtered (i.e.: Jan 01):")
    calcHistory.forEach(el => el.calcDate = el?.calcDate.toString())
    const filterResult = calcHistory.filter((el) => el?.calcDate.includes(filterQuery))
    console.table(filterResult)
}

function sumAll() //logs sum of all calculations from calcHistory, considering totalCost
{
    return calcHistory.reduce((acc, el) => acc + el?.totalCost, 0)
}