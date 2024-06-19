const searchInput = document.querySelector("#searchInput")
const searchButton = document.querySelector("#searchButton")
const baba = [] 
searchButton.addEventListener("click", async () => {
    try {
        const newCountriesArray = await getCountriesApi(searchInput.value.toLowerCase())
        baba.push(newCountriesArray)
        initCountries(newCountriesArray)
        countryTableUI(newCountriesArray)
        regionTableUI(newCountriesArray)
    } catch (error) {
        console.log(error)
    }
})

const allBtn = document.querySelector("#getAllButton")

allBtn.addEventListener("click", async () => {
    try {
        const allCountries = await getAllCountriesApi()
        initCountries(allCountries)
        countryTableUI(allCountries)
        regionTableUI(allCountries)
    } catch (error) {
        console.log(error)
    }
})


async function getCountriesApi(countryName) {
    try {
        const result = await fetch(`https://restcountries.com/v3.1/name/` + countryName, {
            method: "GET",
        })
        const data = await result.json()
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
    }
}

async function getAllCountriesApi() {
    try{
        const result = await fetch(`https://restcountries.com/v3.1/all`, {
            method: "GET",
        })
        const data = await result.json()
        console.log(data)
        return data
    } catch (error){
        console.log(error)
    }
}

function initCountries(countryArray) {
    try{
        const totalCountries = countryArray.length
        console.log(totalCountries)
    
        const totalCountriesH2 = document.querySelector("#totalCountrie")
        totalCountriesH2.innerHTML = `Total contries: ${totalCountries}`
    
        let total = 0
        countryArray.forEach(cc => {
            total = total + Number(cc.population)
            return total
        });
        const totalPop = document.querySelector("#totalCounriesPopulation")
        totalPop.innerHTML = `Total Country Population: ${total}`
    
        const avg = total / countryArray.length
        const avgH2 = document.querySelector("#averagePopulation")
        avgH2.innerHTML = `Avrage Country Population: ${avg}`
    
        return totalCountries
    } catch (error) {
        console.log(error)
    }
}

function countryTableUI(countryArray) {
    try{
        const tableBody = document.querySelector("#countryTable")
        tableBody.innerHTML = ""
        countryArray.forEach(cc => {
            const countryRow = document.createElement("tr")
        
            const countryName = document.createElement("td")
            countryName.innerHTML = cc.name.common
        
            const countryPop = document.createElement("td")
            countryPop.innerHTML = cc.population

            const countryCurrencies = document.createElement("td")
            cc.currencies.forEach
        
            // const countryCurrencies = document.createElement("td")
            // cc.currencies.forEach(currency => {
            //     const currencySpan = document.createElement("span")
            //     currencySpan.textContent = `${currency.name} (${currency.symbol}) `
            //     countryCurrencies.appendChild(currencySpan)
            // })
        
            countryRow.appendChild(countryName)
            countryRow.appendChild(countryPop)
            countryRow.appendChild(countryCurrencies)
        
            tableBody.appendChild(countryRow)
        })
    } catch(error){
        console.log(error)
    }
    }

function regionTableUI(countryArray) {
    try{
        const regionTable = document.querySelector("#regionTable")
        regionTable.innerHTML = ""
        const regionAgg = countryArray.reduce((region, current) => {
            if (current.region) {
                if (region[current.region]) {
                    region[current.region].count++
                } else {
                    region[current.region] = {
                        count: 1
                    }
                }
            }
            return region
        }, {})
    
        Object.keys(regionAgg).forEach(region => {
            const regionRow = document.createElement("tr")
    
            const regionName = document.createElement("td")
            regionName.innerHTML = region
    
            const regionCount = document.createElement("td")
            regionCount.innerHTML = regionAgg[region].count
    
            regionRow.appendChild(regionName)
            regionRow.appendChild(regionCount)
    
    
            regionTable.appendChild(regionRow)
        })
    } catch (error){
        console.log(error)
    }
}
