// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from '@/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const DoTestPage = () => {
    // ** Hooks
    const ability = useContext(AbilityContext)

    return (
        <Grid container spacing={6}>
            
        </Grid>
    )
}

DoTestPage.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default DoTestPage
