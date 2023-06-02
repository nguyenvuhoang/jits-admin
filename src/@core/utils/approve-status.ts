export const ApproveStatus = (status:string) =>{
    switch(status) {
        case "A": return 'Approve'
        case "P": return 'Pending'
        default: return 'Approve'
    }
}