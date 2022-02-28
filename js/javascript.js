const count = parseInt(prompt("How many breeding rounds do you wish to calculate?"))
let i = 0
const calcHistory = []
class Search{
    constructor(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, totalCost){
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

do{
    let motherBreeds = parseInt(prompt("Enter mother's breed count:")) //link to list
    let fatherBreeds = parseInt(prompt("Enter father's breed count:")) //link to list
    let motherVIScost
    let fatherVIScost
    const motherPGXcost = 30
    const fatherPGXcost = 30

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
    const totalVIScost = motherVIScost + fatherVIScost

    //to be displayed under PGX cost:
    const totalPGXcost = motherPGXcost + fatherPGXcost

    //to be displayed in USD under total cost (needs API):
    const totalCost = totalVIScost + totalPGXcost // each value to be multiplied by price fed through API
    alert(`Total cost of breed:
    ${totalVIScost} VIS
    ${totalPGXcost} PGX`)

    //object definition for search history:
    function addToHistory() //add to history function to be linked to a button
    {
        calcHistory.push(new Search(motherBreeds, motherVIScost, motherPGXcost, fatherBreeds, fatherVIScost, fatherPGXcost, totalVIScost, totalPGXcost, totalCost))
    }
    addToHistory() //adds every search to history automatically

    i++
}
while(count > i)





console.table(calcHistory) //displays whole calc history as an array at the end of the cycle

//to be displayed under pega type (still needs writing):
let bornPegaType