import React, { useState, useEffect, useRef } from 'react';
import { Col, Row } from "antd";
import { DashboardTotalCountCard } from '../components/Dashboard/total-count-card';
import { Card, CardContent, CardHeader, Grid, IconButton, InputAdornment, TextField, useTheme } from '@mui/material';

import { useSelector } from 'react-redux';

const Dashboard = () => {
  const theme = useTheme()
  const renderTotalCountCard = (resource, isLoading, totalCount) => (
    <Col xs={24} sm={24} xl={7} className='  mb-10  text-center '>
      <DashboardTotalCountCard
        resource={resource}
        isLoading={isLoading}
        totalCount={totalCount} data={undefined}        // data={data.map((entry, index) => ({
      //   index: String(index + 1), // Assuming index starts from 1
      //   value: resource == "User" ? entry.total : entry.count, // Assuming userCount property in each entry represents the number of new users
      // }))}
      />
    </Col>


  );


  const selectedFirewall = useSelector((state) => state?.firewalls.selectedFirewall);

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
          <Grid item xs={12} lg={6} key={data.label}>
            <Card sx={{ height: 400, borderRadius: 'xl', boxShadow: 'lg' }}>
              <CardHeader title={data?.label} />
              <CardContent sx={{ height: '100%', mb: 2 }}>
                <iframe src={data?.value} title={data?.label} width="100%" height="90%" frameBorder="0"></iframe>
              </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
