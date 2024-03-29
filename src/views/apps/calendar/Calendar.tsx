// ** React Import
import { useEffect, useRef } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import interactionPlugin from '@fullcalendar/interaction'

// ** Types
import { CalendarType } from '@/types/apps/calendarTypes'

// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css'

const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    calendar: '',
    guests: [],
    location: '',
    description: '',
    icon: ''
  }
}

const Calendar = (props: CalendarType) => {
  // ** Props
  const {
    events,
    direction,
    updateEvent,
    calendarApi,
    calendarsColor,
    calendarsColorDetail,
    setCalendarApi,
    handleSelectEvent,
    handleLeftSidebarToggle,
    handleAddEventSidebarToggle,
    editTable,
    eventStartEditable
  } = props

  // ** Refs
  const calendarRef = useRef()

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi())
    }
  }, [calendarApi, setCalendarApi])

  if (events) {
    // ** calendarOptions(Props)
    const calendarOptions = {
      events: events.length ? events : [],
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        start: 'sidebarToggle, prev, next, title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      views: {
        week: {
          titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
        }
      },

      /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
      editable: editTable,

      /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
      eventResizableFromStart: true,

      /*
        Automatically scroll the scroll-containers during event drag-and-drop and date selecting
        ? Docs: https://fullcalendar.io/docs/dragScroll
      */
      dragScroll: true,

      /*
        Max number of events within a given day
        ? Docs: https://fullcalendar.io/docs/dayMaxEvents
      */
      dayMaxEvents: 5,

      /*
        Determines if day names and week names are clickable
        ? Docs: https://fullcalendar.io/docs/navLinks
      */
      navLinks: true,

      eventClassNames({ event: calendarEvent }: any) {
        // @ts-ignore
        const colorName = calendarsColorDetail[calendarEvent._def.extendedProps.status]

        return [
          // Background Color
          `bg-${colorName}`,
          `event-avatar`
        ]
      },

      eventClick({ event: clickedEvent }: any) {
        handleAddEventSidebarToggle()

        // * Only grab required field otherwise it goes in infinity loop
        // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
        // event.value = grabEventDataFromEventApi(clickedEvent)

        // isAddNewEventSidebarActive.value = true
      },

      customButtons: {
        sidebarToggle: {
          icon: 'bi bi-list',
          click() {
            handleLeftSidebarToggle()
          }
        }
      },

      dateClick(info: any) {
        const ev = { ...blankEvent }
        ev.start = info.date
        ev.end = info.date
        ev.allDay = true

        // @ts-ignore
        handleAddEventSidebarToggle()
      },

      /*
        Handle event drop (Also include dragged event)
        ? Docs: https://fullcalendar.io/docs/eventDrop
        ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
      */
      eventDrop({ event: droppedEvent }: any) {
      },

      /*
        Handle event resize
        ? Docs: https://fullcalendar.io/docs/eventResize
      */
      eventResize({ event: resizedEvent }: any) {
      },

      eventContent({ event }: any) {
        var eventAvatar = document.createElement('img');
        eventAvatar.classList.add('event-avatar');
        eventAvatar.src = event.extendedProps.icon;
        eventAvatar.width = 40
        eventAvatar.height = 40
        // Thêm các thuộc tính CSS khác cho biểu tượng avatar (ví dụ: src, alt)

        var eventTitle = document.createElement('div');
        eventTitle.classList.add('fc-title');
        var msgShow = "";
        switch (event._def.extendedProps.status) {
          case "P":
            msgShow = 'Pending - ' + event.title
            break;
          case "R":
            msgShow = "Rejected - " + event.title
            break;
          case "C":
            msgShow = "Pending - " + event.title
          case "A":
            msgShow = event.title
            break;
          default:
            event.title
            break;
        }
        eventTitle.textContent = msgShow;

        var eventContentWrapper = document.createElement('div');
        eventContentWrapper.classList.add('event-content-wrapper');
        eventContentWrapper.appendChild(eventAvatar);
        eventContentWrapper.appendChild(eventTitle);

        var eventWrapper = document.createElement('div');
        eventWrapper.classList.add('fc-content');
        eventWrapper.appendChild(eventContentWrapper);

        return { domNodes: [eventWrapper] };
      },

      ref: calendarRef,

      // Get direction from app state (store)
      direction,
      eventStartEditable: eventStartEditable
    }

    // @ts-ignore
    return <FullCalendar {...calendarOptions} />
  } else {
    return null
  }
}

export default Calendar
