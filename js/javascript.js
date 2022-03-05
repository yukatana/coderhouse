const count = parseInt(prompt("How many breeding rounds do you wish to calculate?"))
let i = 0
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

//add to history function to be linked to a button
function addToHistory()
{
    calcHistory.push(new Search(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, totalCost))
}

do{
    motherBreeds = parseInt(prompt("Enter mother's breed count:")) //link to list
    fatherBreeds = parseInt(prompt("Enter father's breed count:")) //link to list

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
    }

    // maybe parseInt() all variables?

    //to be displayed under VIS cost:
    totalVIScost = motherVIScost + fatherVIScost

    //to be displayed under PGX cost:
    totalPGXcost = motherPGXcost + fatherPGXcost

    //to be displayed in USD under total cost (needs API):
    totalCost = totalVIScost + totalPGXcost // each value to be multiplied by price fed through API
    alert(`Total cost of breed:
    ${totalVIScost} VIS
    ${totalPGXcost} PGX`)

    addToHistory() //adds every search to history automatically

    i++
}
while(count > i)

console.table(calcHistory) //displays entire calc history as an array at the end of the cycle

let sortedHistory = calcHistory
console.table(sortedHistory.sort((a,b) => a.totalCost - b.totalCost)) //logs new array in ascending totalCost order

//to be displayed under pega type (still needs writing):
let bornPegaType