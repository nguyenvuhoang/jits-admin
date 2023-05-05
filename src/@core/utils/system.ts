export const Status = (status:string) =>{
    switch(status) {
        case "A": return 'Active'
        case "P": return 'Pending'
        case "B": return 'Block'
        case "C": return 'Closed'
        default: return 'Active'
    }
}