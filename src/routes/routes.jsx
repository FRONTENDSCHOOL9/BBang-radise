import Layout from '@components/layout';
import ErrorPage from '@pages/ErrorPage';
import Admin from '@pages/admin/Admin';
import { ClassAdd, ClassDetail, ClassEdit, ClassList, ClassQnAList } from '@pages/class';
import ClassOrder from '@pages/class/ClassOrder';
import MainPage from '@pages/home/MainPage';
import Login from '@pages/login/Login';
import { MyPage, MyPageEdit } from '@pages/mypage';
import { RecipeAdd, RecipeDetail, RecipeEdit, RecipeList } from '@pages/recipe';
import ReplyList from '@pages/recipe/ReplyList';
import { SignUp, SignUpWelcome } from '@pages/signup';
import { PrivateRoute } from '@routes/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'class',
        element: <ClassList />,
      },
      {
        path: 'class/:_id',
        element: <ClassDetail />,
      },
      {
        path: 'class/add',
        element: (
          <PrivateRoute>
            <ClassAdd />
          </PrivateRoute>
        ),
      },
      {
        path: 'class/:_id/edit',
        element: (
          <PrivateRoute>
            <ClassEdit />
          </PrivateRoute>
        ),
      },
      {
        path: 'class/:_id/order',
        element: (
          <PrivateRoute>
            <ClassOrder />
          </PrivateRoute>
        ),
      },
      {
        path: 'class/qna',
        element: <ClassQnAList />,
      },
      {
        path: 'recipe',
        element: <RecipeList />,
      },
      {
        path: 'recipe/:_id',
        element: <RecipeDetail />,
        children: [
          {
            index: true,
            element: <ReplyList />,
          },
        ],
      },
      {
        path: 'recipe/add',
        element: (
          <PrivateRoute>
            <RecipeAdd />
          </PrivateRoute>
        ),
      },
      {
        path: 'recipe/:_id/edit',
        element: (
          <PrivateRoute>
            <RecipeEdit />
          </PrivateRoute>
        ),
      },
      {
        path: 'mypage/:_id',
        element: (
          <PrivateRoute>
            <MyPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'mypage/:_id/edit',
        element: (
          <PrivateRoute>
            <MyPageEdit />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signup-alert',
        element: <SignUpWelcome />,
      },
      {
        path: 'admin',
        element: (
          <PrivateRoute requiredRole="admin">
            <Admin />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
