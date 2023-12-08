export interface profileAttributes{
    position: string;
    hospital:hospitalAttribute
    consultationFee:number,
}
interface hospitalAttribute{
    Id:string;
    hospitalName:string
}