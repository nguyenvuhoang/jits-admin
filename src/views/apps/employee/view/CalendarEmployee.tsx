import React, { useState } from 'react'
import CalendarWrapper from '@/@core/styles/libs/fullcalendar'
import { useSettings } from '@/@core/hooks/useSettings'
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import Calendar from '@/views/apps/calendar/Calendar'
import { CalendarColors, CalendarColorsDetail } from '@/types/apps/calendarTypes'
import { FetchEventApplicationForLeave } from '@/data/employee'

type Props = {}

// ** CalendarColors
const calendarsColor: CalendarColors = {
    Personal: 'success',
    Business: 'primary',
    Family: 'warning',
    Holiday: 'success',
    ETC: 'info'
}

const calendarsColorDetail: CalendarColorsDetail = {
    A: 'success',
    P: 'warning',
    R: 'error',
    C: 'info'
}



const CalendarEmployee = (props: Props) => {

    // ** Hooks
    const { settings } = useSettings()

    const { skin, direction } = settings

    const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const { event } = FetchEventApplicationForLeave()

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
                {event &&
                    <Calendar
                        events={event}
                        direction={direction}
                        updateEvent={() => updateEvent()}
                        calendarApi={calendarApi}
                        calendarsColor={calendarsColor}
                        calendarsColorDetail={calendarsColorDetail}
                        setCalendarApi={setCalendarApi}
                        handleSelectEvent={handleSelectEvent}
                        handleLeftSidebarToggle={handleLeftSidebarToggle}
                        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                        editTable={false}
                        eventStartEditable={false}
                    />
                }
            </Box>

        </CalendarWrapper>
    )
}

export default CalendarEmployee