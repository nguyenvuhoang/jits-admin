import React, { useState } from 'react'
import CalendarWrapper from '@/@core/styles/libs/fullcalendar'
import { useSettings } from '@/@core/hooks/useSettings'
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import Calendar from '@/views/apps/calendar/Calendar'
import { CalendarColors } from '@/types/apps/calendarTypes'

type Props = {}

// ** CalendarColors
const calendarsColor: CalendarColors = {
    Personal: 'error',
    Business: 'primary',
    Family: 'warning',
    Holiday: 'success',
    ETC: 'info'
}

const CalendarEmployee = (props: Props) => {

    // ** Hooks
    const { settings } = useSettings()

    const { skin, direction } = settings

    const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const store = {
        events: [
            {
                id: 1,
                url: '',
                title: 'DangNV Off',
                start: new Date(),
                end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                allDay: true,
                extendedProps: {
                    calendar: 'Personal',
                    icon: 'https://api.jits.com.vn:4001/employee/image/cover/dangnv.png'
                }
            },
            {
                id: 2,
                url: '',
                title: 'HoangNV Off',
                start: new Date(),
                end: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                allDay: true,
                extendedProps: {
                    calendar: 'Business',
                    icon: 'https://api.jits.com.vn:4001/employee/image/cover/hoangnv.png',
                }
            },
            {
                id: 3,
                url: '',
                title: 'DungVT Ngay 2',
                start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) ,
                end: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
                allDay: true,
                extendedProps: {
                    calendar: 'Personal',
                    icon: 'https://api.jits.com.vn:4001/employee/image/cover/dangnv.png'
                }
            },
            {
                id: 4,
                url: '',
                title: 'EangNV Off Ngay 2',
                start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) ,
                end: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
                allDay: true,
                extendedProps: {
                    calendar: 'Personal',
                    icon: 'https://api.jits.com.vn:4001/employee/image/cover/dangnv.png'
                }
            },
        ],
        selectedEvent: null,
        selectedCalendars: ['']
    }

    const updateEvent = () => {

    }

    const handleSelectEvent = () => {

    }


    const handleAddEventSidebarToggle = () => { }

    const [calendarApi, setCalendarApi] = useState<null | any>(null)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)

    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

    return (
        <CalendarWrapper
            className='app-calendar'
            sx={{
                marginTop: 5,
                boxShadow: skin === 'bordered' ? 0 : 6,
                ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
            }}
        >
            <Box
                sx={{
                    px: 5,
                    pt: 5,
                    flexGrow: 1,
                    borderRadius: 1,
                    boxShadow: 'none',
                    backgroundColor: 'background.paper',
                    ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
                }}

            >
                <Calendar
                    store={store}
                    direction={direction}
                    updateEvent={() => updateEvent()}
                    calendarApi={calendarApi}
                    calendarsColor={calendarsColor}
                    setCalendarApi={setCalendarApi}
                    handleSelectEvent={handleSelectEvent}
                    handleLeftSidebarToggle={handleLeftSidebarToggle}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                />
            </Box>

        </CalendarWrapper>
    )
}

export default CalendarEmployee