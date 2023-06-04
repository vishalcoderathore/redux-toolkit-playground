import { AppDispatch, fetchUsers, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, useEffect } from 'react';

const UsersList = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, error } = useSelector((state: RootState) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data!</div>;
  }

  return <div>{data.length}</div>;
};

export default UsersList;
