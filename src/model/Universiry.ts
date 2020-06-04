import {getConnection,getMongoRepository} from "typeorm";
import {Dataset_Student} from "../entity/Dataset_Student";

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
}

export default universityInfo