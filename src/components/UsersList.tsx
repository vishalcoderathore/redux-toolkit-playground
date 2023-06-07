import { fetchUsers, addUser, RootState } from '../store';
import { ReactElement, useEffect } from 'react';
import { useThunk } from '../hooks/useThunk';
import UsersListItem from './UsersListItem';
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

  // Initialize a variable to hold the content we want to display.
  let content;

  // If the users are still being loaded (isLoadingUsers is true),
  // we want to show a loading state. In this case, it's a skeleton component.
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  }

  // If there was an error while loading the users (loadingUsersError is true),
  // we want to display an error message.
  else if (loadingUsersError) {
    content = <div>Error loading data!</div>;
  }

  // If the users have been successfully loaded (i.e., isLoadingUsers is false and
  // loadingUsersError is also false), we map over the data and display a list
  // of user items.
  else {
    content = data.map(user => {
      // Each UsersListItem is given a unique key (user.id) for React to keep track
      // of the individual components, and the user data is passed as a prop.
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  const userCount =
    data.length < 1 ? 'No Users, we need more!' : data.length === 1 ? '1 User found' : `${data.length} Users found`;

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl ">{userCount}</h1>
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
