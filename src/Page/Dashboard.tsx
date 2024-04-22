import React, { useState, useEffect, useRef } from 'react';
import { Col, Row } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { format } from 'date-fns';
import Chart from 'react-apexcharts';

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme CSS fil
import api from '../services/api';
import { DashboardTotalCountCard } from '../components/Dashboard/total-count-card';
import { PieChart, Pie } from 'recharts';

import { addDays } from 'date-fns'
import DateRangeIcon from '@mui/icons-material/DateRange';
import { CardContent, CardHeader, Grid, IconButton, InputAdornment, TextField, useTheme } from '@mui/material';
import { Box, Card, FormControl, InputLabel, MenuItem, Select, Gried, Typography } from '@mui/material';
import LanguagePieChart from '../components/Dashboard/LanguagePieChart';
import { useSelector } from 'react-redux';
const CustomTooltip = ({ label, payload }) => {
  const total = payload.reduce((acc, curr) => acc + (curr.value || 0), 0);

  return (
    <div className="bg-white border border-gray-300 p-2">
      <p className="font-semibold">Date: {label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
      <p className="font-semibold">Total: {total}</p>
    </div>
  );
};
const Dashboard = () => {
  const theme = useTheme()

  // const COLORSd:any = ['#0088FE', '#00C49F', '#FFBB28', '#FFFFFF'];
  const renderTotalCountCard = (resource, isLoading, totalCount) => (

    <Col xs={24} sm={24} xl={7} className='  mb-10  text-center '>

      <DashboardTotalCountCard
        resource={resource}
        isLoading={isLoading}
        totalCount={totalCount}
        // data={data.map((entry, index) => ({
        //   index: String(index + 1), // Assuming index starts from 1
        //   value: resource == "User" ? entry.total : entry.count, // Assuming userCount property in each entry represents the number of new users
        // }))}
      />
    </Col>


  );

  const [activeIndex, setActiveIndex] = useState(null); // Track the active index

  const handleClick = (data, index) => {
    setActiveIndex(index === activeIndex ? null : index); // Set the active index or null if clicked again
  };

  const selectedFirewall = useSelector((state) => state.firewalls.selectedFirewall);
  const COLORS = ['#8884d8', 'rgba(53, 162, 235, 0.5)', '#FFBB28', '#FF8042'];
  return (
    <div className="pb-6 mb-6   ">
      <div className="flex flex-wrap ">
        <div className="w-full my-2 rounded-xl space-y-5  ">
          <Row gutter={[32, 32]} className="space-x-2 item-center justify-center">
            {renderTotalCountCard("User", false, 23)}
            {renderTotalCountCard("Order", false, 24,)}
            {renderTotalCountCard("Cancel", false, 467)}

          </Row>
        </div>
      </div>
      <Grid container spacing={2} >
  {selectedFirewall?.kibanaURL?.map((data) => (
    <Grid  item xs={12} lg={6} key={data.label}>
     
      <Card sx={{ height:400, borderRadius: 'xl', boxShadow: 'lg' }}>
        <CardHeader title={data?.label} />
        <CardContent sx={{  height: '100%', mb:2}}>
        {/* <Box sx={{  height: '100%', display: 'flex', justifyContent: 'center' }}> */}
              <iframe src={data?.value} title={data?.label} width="100%" height="90%" frameBorder="0"></iframe>
            {/* </Box> */}
        </CardContent>
      </Card>
      
    </Grid>
  ))}
</Grid>


    </div>
  );
};

export default Dashboard;
