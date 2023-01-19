import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { AuthorityListToolbar } from '../components/authorities/authorities-list-toolbar';
import Authorities from '../components/authorities/authorities-list-results';


const Page = () => (
  <>
    <Head>
      <title>
        Authorities | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
       <AuthorityListToolbar/>
        <Box sx={{ pt: 3 }}>
       
      <Authorities/>
      
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 3
          }}
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
