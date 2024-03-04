import { Navigate, Route } from 'react-router-dom';
import { AccountRole } from '../domain/models';
import { selectSignInStatus, selectUser } from '../redux';
import { useAppSelector } from '../redux/hooks';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const Protected = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) => {
  const isLoggedIn = useAppSelector(selectSignInStatus);
  const user = useAppSelector(selectUser);
  console.log('isLoggedIn', isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  } else if (user?.roleId === AccountRole.STAFF) {
    return <>{children}</>;
  }

  return <>{children}</>;
};
