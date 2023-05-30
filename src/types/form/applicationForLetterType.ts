export interface ApplicationLeaveInputs {
    employeecd: string
    fullname: string
    email: string
    departmentcd: string
    position: string
    leader: string
    manager: string
    dateoff: string
    typeoff: string
    reason: string
    fromdt: Date | undefined
    todt: Date | undefined
    totaldayoff: number
    session: string[]
    replacepersion?: string
    formality: string

}