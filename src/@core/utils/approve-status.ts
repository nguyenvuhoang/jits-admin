export const ApproveStatus = (status:string) =>{
    switch(status) {
        case "A": return 'Approve'
        case "P": return 'Pending'
        case "R": return 'Rejected'
        default: return 'Approve'
    }
}