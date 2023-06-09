interface DayOff {
    fromdt: Date | undefined,
    todt: Date | undefined,
    session: string[]
}

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
    totaldayoff: number
    replacepersion?: string
    formality: string
    dayoff: DayOff[]
}

export interface SubmitApplicationLeaveInputs {
    employeecd: string
    fullname: string
    email: string
    departmentcd: string
    reason: string
    totaldayoff: number
    replacepersion?: string
    formality: string
    dayoff: DayOff[]
}
export interface ListOfApplicationSearchInputs {
    fullname?: string
    status?: string
    employeecd?: string
}
