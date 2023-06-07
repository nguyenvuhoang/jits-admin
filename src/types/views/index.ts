import { ThemeColor } from '@/@core/layouts/types'

export type ProfileTabCommonType = {
    icon: string
    value?: string
    property: string
}

export type ProfileHeaderType = {
    fullName: string
    coverImg: string
    location: string
    profileImg: string
    joiningDate: string
    designation: string
    designationIcon?: string
}

export type ProfileTeamsType = ProfileTabCommonType & { color: ThemeColor }

export type ProfileTeamsTechType = {
    title: string
    avatar: string
    members: number
    chipText: string
    ChipColor: ThemeColor
}
export type ProfileConnectionsType = {
    name: string
    avatar: string
    isFriend: boolean
    connections: string
}
export type ProfileAvatarGroupType = {
    name: string
    avatar: string
}
export type ProfileChipType = {
    title: string
    color: ThemeColor
}

export type ProfileTabType = {
    teams: ProfileTeamsType[]
    about: ProfileTabCommonType[]
    contacts: ProfileTabCommonType[]
    overview: ProfileTabCommonType[]
    teamsTech: ProfileTeamsTechType[]
    connections: ProfileConnectionsType[]
}

export type TeamsTabType = {
    title: string
    avatar: string
    description: string
    extraMembers: number
    chips: ProfileChipType[]
    avatarGroup: ProfileAvatarGroupType[]
}

export type ProjectsTabType = {
    hours: string
    tasks: string
    title: string
    budget: string
    client: string
    avatar: string
    members: string
    daysLeft: number
    comments: number
    deadline: string
    startDate: string
    totalTask: number
    budgetSpent: string
    description: string
    chipColor: ThemeColor
    completedTask: number
    avatarColor?: ThemeColor
    avatarGroup: ProfileAvatarGroupType[]
}

export type ConnectionsTabType = {
    name: string
    tasks: string
    avatar: string
    projects: string
    connections: string
    designation: string
    isConnected: boolean
    chips: ProfileChipType[]
}
export type UserProfileActiveTab = ProfileTabType | TeamsTabType[] | ProjectsTabType[] | ConnectionsTabType[]


// User Profile pages
//-------------------
export type ProjectTableRowType = {
    id: number
    date: string
    name: string
    leader: string
    status: number
    avatar?: string
    avatarGroup: string[]
    avatarColor?: ThemeColor
}