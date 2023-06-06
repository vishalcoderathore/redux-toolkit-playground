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

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error loading data!</div>;
  } else {
    content = data.map(user => {
      return (
        <div key={user.id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">{user.name}</div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl ">Users</h1>
        <Button loading={isAddingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {addingUsersError && 'Error creating user'}
      </div>
      {content}
    </div>
  );
};

export default UsersList;
