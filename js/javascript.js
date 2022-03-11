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

const calcHistory = []
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
        this.calcDate = new Date() //adds current date to every calculation
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
        default: alert("Please enter a valid breed count.")
        motherVIScost = "Invalid breed count"
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
        default: alert("Please enter a valid breed count.")
        fatherVIScost = "Invalid breed count"
    }

    //to be displayed under VIS cost:
    if (!isNaN(motherVIScost) || !isNaN(fatherVIScost))
    {
        totalVIScost = motherVIScost + fatherVIScost
    }
    else
    {
        totalVIScost = "Invalid breed count."
    }

    //to be displayed under PGX cost:
    totalPGXcost = motherPGXcost + fatherPGXcost

    //to be displayed in USD under total cost (needs API):
    if (!isNaN(motherVIScost) && !isNaN(fatherVIScost))
    {
        totalCost = totalVIScost + totalPGXcost // each value to be multiplied by price fed through API
    }
    else
    {
        totalCost = "Invalid calculation"
    }

    // Kind calculation:
    let motherKindSelect = document.getElementById("motherKindSelect")
    motherKind = motherKindSelect.value
    let fatherKindSelect = document.getElementById("fatherKindSelect")
    fatherKind = fatherKindSelect.value

    if(fatherKind != "Select pega kind" && motherKind != "Select pega kind") {
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
        bornPegaKind = "-"
        alert("Please select parent pega kinds.")
    }
}

function addToHistory() //will use JSON in order to save calcHistory to localStorage
{
    if (!isNaN(totalCost))
    {
        calcHistory.push(new Search(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, totalCost))
        alert("Save successful!")
    }
    else
    {
        alert("You cannot save an invalid breed count.")
    }
    
}


//DOM:

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
    else //this is the inital DOM load, since motherBreeds and fatherBreeds won't return undefined but rather NaN upon calculation
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







console.table(calcHistory) //displays entire calc history as an array at the end of the cycle

let sortedHistory = calcHistory
console.table(sortedHistory.sort((a,b) => a.totalCost - b.totalCost)) //logs new array in ascending totalCost order

function filterByDate() //logs new array containing desired search date. must be called manually
{
    let filterQuery = prompt("Enter calculation date to be filtered (i.e.: Jan 01):")
    calcHistory.forEach(el => el.calcDate = el.calcDate.toString())
    const filterResult = calcHistory.filter((el) => el.calcDate.includes(filterQuery))
    console.table(filterResult)
}

function sumAll() //logs sum of all calculations from calcHistory, considering totalCost
{
    return calcHistory.reduce((acc, el) => acc + el.totalCost, 0)
}

//to be displayed under pega kind (still needs writing):
