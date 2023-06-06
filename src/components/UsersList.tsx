import { fetchUsers, addUser, RootState } from '../store';
import { ReactElement, useEffect } from 'react';
import { useThunk } from '../hooks/useThunk';
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';
import Button from './Button';

const UsersList = (): ReactElement => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers, undefined);
  const [doAddUser, isAddingUser, addingUsersError] = useThunk(addUser, undefined);

  const { data } = useSelector((state: RootState) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = (): void => {
    doAddUser();
  };

  if (isLoadingUsers) {
    return <Skeleton times={1} className="h-10 w-full" />;
  }

  if (loadingUsersError) {
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
        {isAddingUser ? 'Creating User ...' : <Button onClick={handleUserAdd}>+ Add User</Button>}
        {addingUsersError && 'Error creating user'}
      </div>
      {renderedUsers}
    </div>
  );
};

export default UsersList;
