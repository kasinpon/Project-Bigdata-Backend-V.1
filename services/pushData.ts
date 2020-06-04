let pushData = {
    faculty: (result) => {
        let facultys = []
        for (let i = 0; i < result.length; i++) {
            if (result[i].faculty != ""){
                facultys.push(result[i].faculty)
            }
        }
        return facultys
    },
    amount: (result) => {
        let amounts = []
        for (let i = 0; i < result.length; i++) {
            amounts.push(result[i].amount)
        }
        return amounts
    },
    year: (result) => {
        let years = []
        for (let i = 0; i < result.length; i++) {
            if (result[i] != ""){
                years.push(result[i])
            }
        }
        return years
    },
    sumamount: (result) => {
        let amounts = []
        for (let i = 0; i < result.length; i++) {
            if (result[i].sum != 0){
                amounts.push(result[i].sum)
            }
        }
        return amounts
    },
    university_name: (result) => {
        let amounts = []
        for (let i = 0; i < result.length; i++) {
            if (result[i].university_name != "") {
                amounts.push(result[i].university_name)
            }
        }
        return amounts
    },
    sumendamount: (result) => {
        let amounts = []
        for (let i = 0; i < result.length; i++) {
                amounts.push(Math.round(result[i].sum * 0.75))
        }
        return amounts
    },
    endyear: (result) => {
        let years = []
        let num = 0
        for (let i = 0; i < result.length; i++) {
            if (result[i].dataset_year != "") {
                num = eval(result[i])
                years.push(num + 4)
            }
        }
        return years
    },
}

export default pushData