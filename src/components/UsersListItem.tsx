import { UserType } from '../store/slices/usersSlice';
import ExpandablePannel from './ExpandablePannel';
import { useThunk } from '../hooks/useThunk';
import { GoTrashcan } from 'react-icons/go';
import { removeUser } from '../store';
import Button from './Button';
import React from 'react';

interface UsersListItemProps {
  user: UserType;
}

const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
  const [doRemoveUser, isDeleting, error] = useThunk(removeUser, user);

  const handleClick = (): void => {
    doRemoveUser();
  };

  const header = (
    <>
      <Button loading={isDeleting} onClick={handleClick} className="mr-3">
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user</div>}
      {user.name}
    </>
  );

  return <ExpandablePannel header={header}>CONTENT</ExpandablePannel>;
};

export default UsersListItem;