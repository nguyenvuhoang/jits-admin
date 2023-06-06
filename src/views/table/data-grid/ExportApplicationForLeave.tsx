// ** React Imports
import { useTranslation } from 'next-i18next'
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import { Breakpoint, styled } from '@mui/material/styles'
import { saveAs } from 'file-saver';

// ** Icon Imports
import Icon from '@/@core/components/icon'

interface Props {
  value: string
  clearSearch: () => void
  onChange: (e: ChangeEvent) => void
}


const Form = styled('form')({
  margin: 'auto',
  display: 'flex',
  width: 'fit-content',
  flexDirection: 'column'
})

const ExportApplicationForLeave = (props: Props) => {

  const { t } = useTranslation('common')

  // ** States
  const [open, setOpen] = useState<boolean>(false)
  const [fullWidth, setFullWidth] = useState<boolean>(true)
  const [maxWidth, setMaxWidth] = useState<Breakpoint>('sm')

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleMaxWidthChange = (event: SelectChangeEvent) => {
    setMaxWidth(event.target.value as Breakpoint)
  }

  const handleFullWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullWidth(event.target.checked)
  }


  const handleDownloadFile = () => {
    const fileUrl = 'https://docs.google.com/spreadsheets/d/1mbc62RnYl7ExZT-C_mh-57j1Z8Gf0CpR/edit?usp=sharing&ouid=103010102130550920408&rtpof=true&sd=true'
    saveAs(fileUrl, 'ten-file-tai-ve.xls');
  }

  return (
    <>
      <Box
        sx={{
          gap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: theme => theme.spacing(2, 5, 4, 5)
        }}
      >

        <Button onClick={handleClickOpen} variant='contained' endIcon={<Icon icon='mdi:download' />}>
          {t('text-export-application-leave')}
        </Button>


        <TextField
          size='small'
          value={props.value}
          onChange={props.onChange}
          placeholder='Search…'
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon icon='mdi:magnify' fontSize={20} />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            )
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />

      </Box>

      <Dialog
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>{t('text-export-month')}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>
            {t('text-please-choose-a-month-for-report')}
          </DialogContentText>
          <Form noValidate>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor='max-width'>{t('text-month')}</InputLabel>
              <Select
                label='maxWidth'
                value={maxWidth}
                onChange={handleMaxWidthChange}
                inputProps={{
                  name: 'max-width',
                  id: 'max-width'
                }}
              >
                <MenuItem value={false as any}>{t('text-please-choose-a-month-for-report')}</MenuItem>
                <MenuItem value='01'>{t('January')}</MenuItem>
                <MenuItem value='02'>{t('February')}</MenuItem>
                <MenuItem value='03'>{t('March')}</MenuItem>
                <MenuItem value='04'>{t('April')}</MenuItem>
                <MenuItem value='05'>{t('May')}</MenuItem>
                <MenuItem value='06'>{t('June')}</MenuItem>
                <MenuItem value='07'>{t('July')}</MenuItem>
                <MenuItem value='08'>{t('August')}</MenuItem>
                <MenuItem value='09'>{t('September')}</MenuItem>
                <MenuItem value='10'>{t('October')}</MenuItem>
                <MenuItem value='11'>{t('November')}</MenuItem>
                <MenuItem value='12'>{t('December')}</MenuItem>

              </Select>
            </FormControl>
            <FormControlLabel
              label='Full width'
              sx={{ mt: 2, mb: 5 }}
              control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}
            />
            <Button onClick={() => handleDownloadFile()} variant='contained' endIcon={<Icon icon='mdi:download' />}>
              {t('text-export-application-leave')}
            </Button>
          </Form>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExportApplicationForLeave
