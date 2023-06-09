import React from 'react'
import CalendarWrapper from '@/@core/styles/libs/fullcalendar'
import { useSettings } from '@/@core/hooks/useSettings'
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import Calendar from '@/views/apps/calendar/Calendar'

type Props = {}

const CalendarEmployee = (props: Props) => {

    // ** Hooks
    const { settings } = useSettings()

    const { skin, direction } = settings

    const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    

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
                {/* <Calendar
                    store={store}
                    dispatch={dispatch}
                    direction={direction}
                    updateEvent={updateEvent}
                    calendarApi={calendarApi}
                    calendarsColor={calendarsColor}
                    setCalendarApi={setCalendarApi}
                    handleSelectEvent={handleSelectEvent}
                    handleLeftSidebarToggle={handleLeftSidebarToggle}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                /> */}
            </Box>

        </CalendarWrapper>
    )
}

export default CalendarEmployee