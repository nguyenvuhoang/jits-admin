import { ThemeColor } from "../layouts/types"

interface ColorsType {
    [key: string]: ThemeColor
}
export const statusColors: ColorsType = {
    A: 'success',
    P: 'warning',
    B: 'error'
}