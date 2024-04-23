import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen.tsx';
import { PATH_AFTER_LOGIN } from '../config.ts';
 import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard.tsx';
 import RoledGuard from '../guards/RoleGuard';

const Loadable = (Component) => (props) => {

  const { pathname } = useLocation();

  return (

    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {

  const allRoutes = [
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
           <GuestGuard>
            <Login />
             </GuestGuard>
          ),
        },
        {
          path: 'dashboard',
          element: (
            <GuestGuard>
            <Dashboard />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
      ],
    },



    // // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <RoledGuard>
          <AuthGuard>
        <DashboardLayout />
       </AuthGuard>
      </RoledGuard> 
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'analysis', element: <Dashboard /> },

      ],
    },

    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Dashboard />, index: true }, //todo uncomment when ready
        { element: <Navigate to='/auth/login' replace />, index: true },

      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]

  // genarate all router paths
  const resources = [];
  const push = (pathStr: any) => {
    const path = `/${pathStr.replace(/^\/+/g, '')}`
    resources.push({
      name: path,
      alias: path,// `${path.split("/")?.[1] ?? ""}-${path.split("/")?.[2] ?? ""}`,
      type: "ui",
    });
  }
  // eslint-disable-next-line array-callback-return
  allRoutes.map(routeA => {
    // eslint-disable-next-line no-unused-expressions,array-callback-return
    routeA?.children && routeA.children.map(routeB => {
      // eslint-disable-next-line no-unused-expressions,array-callback-return
      !routeB?.children ? routeB?.path && push((`${routeA?.path}/${routeB?.path}`).replace("*", "")) : routeB?.children.map(routeC => {
        const path = `${routeA?.path}/${routeB?.path}/${routeC.path}`;
        // eslint-disable-next-line no-unused-expressions
        routeC.path && push(path);
      })
    })
  })
  // post paths to resources api
  try {
    //  addManyResources(resources).then((result) => result);
  } catch (error) {
    console.error("addManyResources error---", error);
  }

  console.log("resources---", resources)
  return useRoutes(allRoutes);
}

const Dashboard = Loadable(lazy(() => import('../Page/Dashboard.tsx')));
const DashboardLayout = Loadable(lazy(() => import('../layouts/dashboard/index.tsx')));
const Login = Loadable(lazy(() => import('../Page/auth/Login.tsx')));

