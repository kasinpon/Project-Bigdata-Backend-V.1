import {getConnection,getMongoRepository} from "typeorm";
import {Dataset_Student} from "../entity/Dataset_Student";
import {Dataset_Company} from "../entity/Dataset_Company";

let universityInfo = {
    getdatainuniversirt : async (university_name,year) => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find( {university_name: university_name, year: year});
            return userRepository
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getAmountOfAllyearInUniversirt : async (university_name) => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find( {university_name: university_name});
            let allyear = []
            for (let i =0;i<userRepository.length;i++){
                allyear.push(JSON.parse(userRepository[i].year))
            }
            let year = []
            let amount = Array(4).fill(0)
            for (let i = 0;i<allyear.length;i++){
                if (year.indexOf(allyear[i]) == -1 ){
                    year.push(allyear[i])
                }
            }
            for (let i = 0;i<userRepository.length;i++){
                for (let j= 0;j<year.length;j++){
                    if (year[j] == allyear[i]){
                        amount[j] = amount[j]+(+userRepository[i].amount)
                    }
                }
            }
            return amount
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getAllyearInUniversirt : async (university_name) => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find( {university_name: university_name});
            let allyear = []
            for (let i =0;i<userRepository.length;i++){
                allyear.push(JSON.parse(userRepository[i].year))
            }
            let year = []
            for (let i = 0;i<allyear.length;i++){
                if (year.indexOf(allyear[i]) == -1 ){
                    year.push(allyear[i])
                }
            }
            return year
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getDataFacultyInYear : async (year,faculty) => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find( {year: year, faculty: faculty});
           return userRepository
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getAllAmount_AllUniversity : async () => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find();
            let allyear = []
            for (let i =0;i<userRepository.length;i++){
                allyear.push(JSON.parse(userRepository[i].year))
            }
            let year = []
            let amount = Array(4).fill(0)
            for (let i = 0;i<allyear.length;i++){
                if (year.indexOf(allyear[i]) == -1 ){
                    year.push(allyear[i])
                }
            }
            for (let i = 0;i<userRepository.length;i++){
                for (let j= 0;j<year.length;j++){
                    if (year[j] == allyear[i]){
                        amount[j] = amount[j]+(+userRepository[i].amount)
                    }
                }
            }
            return amount
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getYear : async () => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find();
            let allyear = []
            for (let i =0;i<userRepository.length;i++){
                allyear.push(JSON.parse(userRepository[i].year))
            }
            let year = []
            for (let i = 0;i<allyear.length;i++){
                if (year.indexOf(allyear[i]) == -1 ){
                    year.push(allyear[i])
                }
            }
            return year
        } catch (err) {
            console.log(err)
            return false
        }
    },
    // getEndAmountInYear : async (year) => {
    //     try {
    //         const result = await getConnection()
    //             .createQueryBuilder()
    //             .select("sum(dataset.amount)","sum")
    //             .from(Dataset, "dataset")
    //             .where("dataset.year = :year " , {year:year})
    //             .groupBy("dataset.faculty")
    //             .execute()
    //         return JSON.parse(JSON.stringify(result))
    //     } catch (err) {
    //         console.log(err)
    //         return false
    //     }
    // },
    getEndAmountInYear : async (year) => {
        try {
            let years = year
            let yr = years.toString()
            const userRepository = await getMongoRepository(Dataset_Student).find({year:yr});
            let allyear = []
            for (let i =0;i<userRepository.length;i++){
                allyear.push(JSON.parse(userRepository[i].year))
            }
            let faculty = []
            for (let i = 0;i<userRepository.length;i++){
                if (faculty.indexOf(userRepository[i].faculty) == -1 ){
                    faculty.push(userRepository[i].faculty)
                }
            }
            let amount = Array(faculty.length).fill(0)
            for (let i = 0;i<userRepository.length;i++){
                for (let j= 0;j<faculty.length;j++){
                    if (faculty[j] == userRepository[i].faculty){
                        amount[j] = amount[j]+(+userRepository[i].amount)
                    }
            }
            }
            return amount
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getEndFacultyInYear : async (year) => {
        try {
            let years = year
            let yr = years.toString()
            const userRepository = await getMongoRepository(Dataset_Student).find({year:yr});
            let faculty = []
            for (let i = 0;i<userRepository.length;i++){
                if (faculty.indexOf(userRepository[i].faculty) == -1 ){
                    faculty.push(userRepository[i].faculty)
                }
            }
            return faculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getFaculty : async () => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find();
            let allfaculty = []
            for (let i =0;i<userRepository.length;i++){
                allfaculty.push(userRepository[i].faculty)
            }
            let faculty = []
            for (let i = 0;i<allfaculty.length;i++){
                if (faculty.indexOf(allfaculty[i]) == -1 ){
                    faculty.push(allfaculty[i])
                }
            }
            return faculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getUniversityNames : async () => {
        try {
            const userRepository = await getMongoRepository(Dataset_Student).find();
            let all_university_name = []
            for (let i =0;i<userRepository.length;i++){
                all_university_name.push(userRepository[i].university_name)
            }
            let university = []
            for (let i = 0;i<all_university_name.length;i++){
                if (university.indexOf(all_university_name[i]) == -1 ){
                    university.push(all_university_name[i])
                }
            }
            return university
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getYear_Company : async () => {
        try {
            const userRepository = await getMongoRepository(Dataset_Company).find();
            let allyear = []
            for (let i =0;i<userRepository.length;i++){
                allyear.push(JSON.parse(userRepository[i].year))
            }
            let year = []
            for (let i = 0;i<allyear.length;i++){
                if (year.indexOf(allyear[i]) == -1 ){
                    year.push(allyear[i])
                }
            }
            return year
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getMostFaculty_Company : async (years) => {
        try {
            let result_faculty = []
            let result_amount = []
            for (let i =0;i<years.length;i++) {
                let year = years[i].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                let faculty = []
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(faculty.length).fill(0)
                for (let x = 0; x < faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+(+facultys[y].amount)
                        }
                    }
                }
                let maxvalue = Math.max(...amount)
                for (let k =0;k<amount.length;k++){
                    if (maxvalue == amount[k]){
                        console.log(years[i])
                        result_faculty.push(faculty[k] + "(" + years[i] + ")")
                        result_amount.push(amount[k])
                    }
                }
            }
            return result_faculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getMostAmount_Company : async (years) => {
        try {
            let result_faculty = []
            let result_amount = []
            for (let i =0;i<years.length;i++) {
                let year = years[i].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                let faculty = []
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(faculty.length).fill(0)
                for (let x = 0; x < faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+(+facultys[y].amount)
                        }
                    }
                }
                let maxvalue = Math.max(...amount)
                for (let k =0;k<amount.length;k++){
                    if (maxvalue == amount[k]){
                        result_faculty.push(faculty[k])
                        result_amount.push(amount[k])
                    }
                }
            }
            return result_amount
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getLowestFaculty_Company : async (years) => {
        try {
            let result_faculty = []
            let result_amount = []
            for (let i =0;i<years.length;i++) {
                let year = years[i].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                let faculty = []
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(faculty.length).fill(1)
                for (let x = 0; x < faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+(+facultys[y].amount)
                        }
                    }
                }
                let maxvalue = Math.min(...amount)
                for (let k =0;k<amount.length;k++){
                    if (maxvalue == amount[k]){
                        result_faculty.push(faculty[k] + "(" + years[i] + ")")
                        result_amount.push(amount[k])
                    }
                }
            }
            return result_faculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getLowestAmount_Company : async (years) => {
        try {
            let result_faculty = []
            let result_amount = []
            for (let i =0;i<years.length;i++) {
                let year = years[i].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                let faculty = []
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(faculty.length).fill(1)
                for (let x = 0; x < faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+(+facultys[y].amount)
                        }
                    }
                }
                let maxvalue = Math.min(...amount)
                for (let k =0;k<amount.length;k++){
                    if (maxvalue == amount[k]){
                        result_faculty.push(faculty[k])
                        result_amount.push(amount[k])
                    }
                }
            }
            return result_amount
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getMostFaculty : async (years) => {
        try {
            let result_faculty
            let result_amount
                let year = years[years.length-1].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                let faculty = []
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(faculty.length).fill(1)
                for (let x = 0; x < faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+1
                        }
                    }
                }
                let maxvalue = Math.max(...amount)
                for (let k =0;k<amount.length;k++){
                    if (maxvalue == amount[k]){
                        result_faculty = faculty[k]
                        result_amount = amount[k]
                    }
                }
            return result_faculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getPredictFaculty_Company : async (years) => {
        try {
            let result_faculty = []
            let result_amount = []
            for (let i =0;i<years.length;i++) {
                let year = years[i].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                let faculty = []
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(faculty.length).fill(1)
                for (let x = 0; x < faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+1
                        }
                    }
                }
                let maxvalue = Math.max(...amount)
                for (let k =0;k<amount.length;k++){
                    if (maxvalue == amount[k]){
                        result_faculty.push(faculty[k])
                        result_amount.push(amount[k])
                    }
                }
            }
            let lastfaculty
            let Predict = []
            for (let s = 0; s < result_faculty.length; s++) {
                if (Predict.indexOf(result_faculty[s]) == -1) {
                    Predict.push(result_faculty[s])
                }
            }
            let sumPredict =  Array(Predict.length).fill(1)
            for (let x = 0; x < Predict.length; x++) {
                for (let y = 0;y<result_faculty.length;y++) {
                    if (Predict[x] == result_faculty[y].faculty){
                        sumPredict[x] = sumPredict[x]+1
                    }
                }
            }
            let maxvalue = Math.max(...sumPredict)
            for (let k =0;k<sumPredict.length;k++){
                if (maxvalue == sumPredict[k]){
                    lastfaculty = Predict[k]
                }
            }
            return lastfaculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getFaculty_Company : async (years) => {
        try {
            let result_faculty = []
            let result_amount = []
                let year = years.toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                let faculty = []
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(faculty.length).fill(0)
                for (let x = 0; x < faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+(+facultys[y].amount)
                        }
                    }
                }
            return faculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getAmount_Company : async (years) => {
        try {
            let year = years.toString()
            const facultys = await getMongoRepository(Dataset_Company).find({year: year})
            let faculty = []
            for (let j = 0; j < facultys.length; j++) {
                if (faculty.indexOf(facultys[j].faculty) == -1) {
                    faculty.push(facultys[j].faculty)
                }
            }
            let amount = Array(faculty.length).fill(1)
            for (let x = 0; x < faculty.length; x++) {
                for (let y = 0;y<facultys.length;y++) {
                    if (faculty[x] == facultys[y].faculty){
                        amount[x] = amount[x]+(+facultys[y].amount)
                    }
                }
            }
            return amount
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getNameFaculty_Company : async (years) => {
        try {
            let faculty = []
            for (let i =0;i<years.length;i++) {
                let year = years[i].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                for (let j = 0; j < facultys.length; j++) {
                    if (faculty.indexOf(facultys[j].faculty) == -1) {
                        faculty.push(facultys[j].faculty)
                    }
                }
            }
            return faculty
        } catch (err) {
            console.log(err)
            return false
        }
    },
    getPercent_Graduate : async (years) => {
        try {
            let result_faculty = []
            let result_amount = []
            let sum = 0
            for (let i =0;i<years.length;i++) {
                let year = years[i].toString()
                const facultys = await getMongoRepository(Dataset_Company).find({year: year})
                for (let j = 0; j < facultys.length; j++) {
                    if (result_faculty.indexOf(facultys[j].faculty) == -1) {
                        result_faculty.push(facultys[j].faculty)
                    }
                }
                let amount = Array(result_faculty.length).fill(1)
                for (let x = 0; x < result_faculty.length; x++) {
                    for (let y = 0;y<facultys.length;y++) {
                        if (result_faculty[x] == facultys[y].faculty){
                            amount[x] = amount[x]+1
                            sum = sum+1
                        }
                    }
                }
                result_amount.push(amount)
            }
            console.log(sum)
            console.log(result_faculty)
            console.log(result_amount)
            // return result_amount
        } catch (err) {
            console.log(err)
            return false
        }
    },

}


export default universityInfo