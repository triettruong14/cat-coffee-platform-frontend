import { Navigate, Route } from 'react-router-dom';
import { selectSignInStatus } from '../redux';
import { useAppSelector } from '../redux/hooks';

export const Protected = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) => {
  const isLoggedIn = useAppSelector(selectSignInStatus);

  if (!isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>;
};
