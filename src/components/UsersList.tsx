import { AppDispatch, fetchUsers, addUser, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { ReactElement, useEffect } from 'react';
import Skeleton from './Skeleton';
import Button from './Button';

const UsersList = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, error } = useSelector((state: RootState) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserAdd = (): void => {
    dispatch(addUser());
  };

  if (isLoading) {
    return <Skeleton times={1} className="h-10 w-full" />;
  }

  if (error) {
    return <div>Error loading data!</div>;
  }

  const renderedUsers = data.map(user => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">{user.name}</div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl ">Users</h1>
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
};

export default UsersList;
