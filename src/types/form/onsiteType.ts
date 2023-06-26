interface ObjectOnsite {
    id: string
    item: string
    quantity: number
    unit: number
    amount: number
}

interface ObjectAdvance {
    currency: string
    amount: number
    exchangereate: number
    description: string

}

export interface OnsiteInputs {
    employeecd: string
    fullname: string
    email: string
    departmentcd: string
    onsiteplace: string
    otherplace: string
    fromdt: Date | undefined
    todt: Date | undefined
    purpose: string
    otherpurpose: string | undefined | null
    project: string | undefined | null
    support1:string
    support2: string | undefined | null
    support3: string | undefined | null
    routeback: string
    routego: string
    proposal1: boolean
    proposal2: boolean
    proposal3: boolean
    note: string
    airport1: string
    airport2: string
    airport3: string
    airport4: string
    onsitefee: ObjectOnsite | undefined
    hotelfee: ObjectOnsite | undefined
    transport: ObjectOnsite | undefined
    customerfee: ObjectOnsite | undefined
    other: ObjectOnsite | undefined
    advance: ObjectAdvance | undefined
}
