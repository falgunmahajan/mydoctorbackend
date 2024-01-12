import moment from "moment";

export const getExpiry=(dateString:string)=>{
    const date= moment("01-2024","MM-YYYY").toDate();
    return {
        month:moment(date).format("M"),
        year:moment(date).format("YYYY")
    }
}