import * as React from "react";
import { Card, CardContent, CardHeader } from '@mui/material';
import { useMemo } from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

import Calculator from './component/Calculator'

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const Dashboard = () => {
    const { defaultDate } = useMemo(() => ({
        defaultDate: new Date(2015, 3, 13)
    }), [])

    return (
        <>
            {/* <Calendar
                defaultDate={defaultDate}
                localizer={localizer}
            /> */}
            <Card>
                <CardHeader title="夾錢計數機" />
                <CardContent>
                夾錢機制，搞手只求打個和

八日前報名（M） ＝ Total/(M+R) - 20*R/M
放飛機照扣數

其後Rock in (R) ＝ Total/(M+R) +20

例子一：
場錢240
提早報名傻鳩 10人，每人夾3蚊
遲報名/walk in撚屌 6人，每人夾35蚊
                <Calculator/>
                    {/* Lorem ipsum sic dolor amet... */}
                </CardContent>

            </Card>


        </>)



};

export default Dashboard;