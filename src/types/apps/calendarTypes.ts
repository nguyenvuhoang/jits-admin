// ** Types
import { Dispatch } from 'redux'

// ** Theme Type Import
import { ThemeColor } from '@/@core/layouts/types'

export type CalendarFiltersType = 'Personal' | 'Business' | 'Family' | 'Holiday' | 'ETC'

export type EventDateType = Date | null | undefined

export type CalendarColors = {
  ETC: ThemeColor
  Family: ThemeColor
  Holiday: ThemeColor
  Personal: ThemeColor
  Business: ThemeColor
}

export type EventType = {
  id: number
  url: string
  title: string
  allDay: boolean
  end: Date | string
  start: Date | string
  status: string
  extendedProps: {
    location?: string
    calendar?: string
    description?: string
    guests?: string[] | string | undefined
    icon?: string
  }
  
}

export type AddEventType = {
  url: string
  title: string
  display: string
  allDay: boolean
  end: Date | string
  start: Date | string
  status: string
  extendedProps: {
    calendar: string
    description: string | undefined
    guests: string[] | string | undefined
  }
}

export type EventStateType = {
  status: string
  url: string
  title: string
  allDay: boolean
  guests: string[]
  description: string
  endDate: Date | string
  startDate: Date | string
  calendar: CalendarFiltersType | string
}

export type CalendarStoreType = {
  events: EventType[] | undefined
}

export type CalendarType = {
  calendarApi: any
  events: EventType[] | undefined
  direction: 'ltr' | 'rtl'
  calendarsColor: CalendarColors
  setCalendarApi: (val: any) => void
  handleLeftSidebarToggle: () => void
  updateEvent: (event: EventType) => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: EventType) => void
  editTable: boolean
  eventStartEditable: boolean
}

export type SidebarLeftType = {
  mdAbove: boolean
  dispatch: Dispatch<any>
  leftSidebarWidth: number
  leftSidebarOpen: boolean
  store: CalendarStoreType
  calendarsColor: CalendarColors
  handleLeftSidebarToggle: () => void
  handleAddEventSidebarToggle: () => void
  handleAllCalendars: (val: boolean) => void
  handleSelectEvent: (event: null | EventType) => void
  handleCalendarsUpdate: (val: CalendarFiltersType) => void
}

export type AddEventSidebarType = {
  calendarApi: any
  drawerWidth: number
  dispatch: Dispatch<any>
  store: CalendarStoreType
  addEventSidebarOpen: boolean
  deleteEvent: (id: number) => void
  addEvent: (event: AddEventType) => void
  updateEvent: (event: EventType) => void
  handleAddEventSidebarToggle: () => void
  handleSelectEvent: (event: null | EventType) => void
}
