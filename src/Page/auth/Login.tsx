import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';

import { PATH_AUTH } from '../../routes/paths';
import useResponsive from '../../hooks/useResponsive';

import Page from '../Page';
import Logo from '../../components/Logo';

import { LoginForm } from '../../components/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex-column',
    },
}));


const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    boxShadow:theme.shadows[10],
    borderRadius:10,
    //  minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(5, 5),
}));

// ----------------------------------------------------------------------

export default function Login({ children }) {
    // const {method} = useAuth();

    const smUp = useResponsive('up', 'sm');

    const mdUp = useResponsive('up', 'md');

    return (
        <Page title="Login">
            <RootStyle>
                <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ display: 'inline-block', fontSize: 0 }}>
                            <Logo />
                        </Box>
                    </Box>

                </Box>


                <Container  maxWidth="sm">
                    <ContentStyle>
                        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h4" gutterBottom>
                                    Sign in
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>Enter your credentials below.</Typography>
                            </Box>

                        </Stack>

                        {/* <Alert severity="info" sx={{mb: 3}}>
                            Use email : <strong>superadmin@sabil.com</strong> / password : <strong>sabil1234</strong>
                        </Alert> */}

                        <LoginForm />

                        {!smUp && (
                            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                                {/* Don’t have an account?{' '} */}
                                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                                    Get started
                                </Link>
                            </Typography>
                        )}
                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );
}
