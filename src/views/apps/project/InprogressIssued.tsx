import Icon from '@/@core/components/icon'
import { InProgress, Opened, ProjectDetail } from '@/context/types'
import { Avatar, Box, Card, CardContent, CardHeader, Grid, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'



type Props = {
    projectdetail: ProjectDetail | undefined
}

const InprogressIssued = ({ projectdetail }: Props) => {
    return (

        <Card>
            <CardHeader title='In progress' subheader={`${projectdetail?.total_issue_inprogress} issues`} />
            <CardContent>
                <Box
                    sx={{
                        overflowY: 'auto',
                        maxHeight: 700,
                        paddingRight: 2,
                        '&::-webkit-scrollbar': {
                            width: '10px', // Độ rộng của thanh cuộn
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888', // Màu sắc của con trỏ thanh cuộn
                            borderRadius: '10px', // Bo tròn cho con trỏ
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555', // Màu sắc khi hover con trỏ
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1', // Màu sắc của nền thanh cuộn
                            borderRadius: '10px', // Bo tròn cho nền
                        }
                    }}
                >                {projectdetail?.issue.inprogress.map((issuedetail: InProgress, index: number) => (
                    <Box
                        key={issuedetail.id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: index !== projectdetail?.issue.closed.length - 1 ? 7 : undefined
                        }}
                    >
                        <Tooltip title={issuedetail.author.name}>
                            <Avatar
                                src={issuedetail.author.avatarUrl}
                                variant='rounded'
                                sx={{
                                    mr: 3,
                                    width: 38,
                                    height: 38
                                }}
                            />
                        </Tooltip>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box sx={{
                                mr: 2,
                                display: 'flex',
                                mb: 0.4,
                                flexDirection: 'column',
                                transition: '.4s all',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                    borderRadius: 2,
                                    padding: 2,
                                    transform: {
                                        translateY: -10
                                    }
                                }
                            }}>
                                <Link href={issuedetail.webUrl} target='_blank'>
                                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                                        {issuedetail.title}
                                    </Typography>
                                </Link>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& svg': { mr: 1.5, color: 'text.secondary', verticalAlign: 'middle' }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            '& svg': { mr: 1.5, color: 'text.secondary', verticalAlign: 'middle' }
                                        }}
                                    >
                                        <Icon fontSize='1rem' icon='ic:baseline-list' />
                                        <Typography variant='caption'>{issuedetail.id}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginLeft: 2,
                                            '& svg': { mr: 1.5, color: 'text.secondary', verticalAlign: 'middle' }
                                        }}
                                    >
                                        <Icon fontSize='1rem' icon='mdi:calendar-blank-outline' />
                                        <Typography variant='caption'>{issuedetail.create_at}</Typography>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                ))}
                </Box >
            </CardContent>
        </Card>

    )
}

export default InprogressIssued