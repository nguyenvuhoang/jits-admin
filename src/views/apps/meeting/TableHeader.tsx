// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'next-i18next'

// ** Icon Imports
import Icon from '@/@core/components/icon'
import Link from 'next/link'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value } = props
  const { t } = useTranslation('common')
  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        Export
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder={`${t('text-search-meeting')}`}
          onChange={e => handleFilter(e.target.value)}
        />

        <Button sx={{ mb: 2 }} variant='contained' component={Link} href="/meetings/addmeeting">
          {t('text-add-meeting')}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
