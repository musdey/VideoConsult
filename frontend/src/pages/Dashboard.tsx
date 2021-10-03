import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import Budget from '../components/dashboard/Budget';
import LatestOrders from '../components/dashboard/LatestOrders';
import LatestProducts from '../components/dashboard/LatestProducts';
import Sales from '../components/dashboard/Sales';
import TasksProgress from '../components/dashboard/TasksProgress';
import TotalCustomers from '../components/dashboard/TotalCustomers';
import TotalProfit from '../components/dashboard/TotalProfit';
import TrafficByDevice from '../components/dashboard/TrafficByDevice';
import Lobby from '../components/Lobby';
import { User } from './../types/user'
import NewWindow from 'react-new-window'
import JitsiMeetComponent from '../components/JitsiMeetComponent';



const data: User[] = [
    {
        username: "Musti",
        firstName: "Mustafa",
        lastName: "Cicek",
        active: true,
        lobbyEntered: "1633283123578"
    },
    {
        firstName: "Matthias",
        lastName: "Malemedie",
        active: false,
        lobbyEntered: "1633283123578"
    },
    {
        firstName: "Stefanie",
        lastName: "Steffenson",
        active: false,
        lobbyEntered: "1633283123578"
    },
]


const Dashboard: React.FunctionComponent = () => {

    const [windowPop, setWindowPop] = React.useState(false)

    const handleOnClick = () => {
        console.log(windowPop)
        setWindowPop(!windowPop)
    }

    const Demo = () => (
        <NewWindow center="parent" onUnload={() => setWindowPop(false)}>
            <h1>Hi 👋</h1>
            <div id="jitter"></div>

        </NewWindow>
    )

    return (

        <>
            <Helmet>
                <title>Dashboard | Material Kit</title>
            </Helmet>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    {windowPop ?
                        <JitsiMeetComponent></JitsiMeetComponent>
                        :

                        <Box
                            padding="50px"
                            minHeight='95%'

                        >
                            <Container maxWidth={false}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        lg={3}
                                        sm={6}
                                        xl={3}
                                        xs={12}
                                    >
                                        <Budget />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        sm={6}
                                        xl={3}
                                        xs={12}
                                    >
                                        <TotalCustomers />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        sm={6}
                                        xl={3}
                                        xs={12}
                                    >
                                        <TasksProgress />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        sm={6}
                                        xl={3}
                                        xs={12}
                                    >
                                        <TotalProfit sx={{ height: '100%' }} />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={12}
                                        xl={9}
                                        xs={12}
                                    >
                                        <Sales />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={4}
                                        md={6}
                                        xl={3}
                                        xs={12}
                                    >
                                        <TrafficByDevice sx={{ height: '100%' }} />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={4}
                                        md={6}
                                        xl={3}
                                        xs={12}
                                    >
                                        <LatestProducts sx={{ height: '100%' }} />
                                    </Grid>
                                    <Grid
                                        item
                                        lg={8}
                                        md={12}
                                        xl={9}
                                        xs={12}
                                    >
                                        <LatestOrders />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>}
                </Grid>

                <Grid item xs={3}>
                    <Lobby userInLobby={data} clickHandler={handleOnClick}></Lobby>
                </Grid>
            </Grid>
        </>
    )
}


export default Dashboard;