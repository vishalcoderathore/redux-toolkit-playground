import { UserType } from '../store/slices/usersSlice';
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

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-between ">
          <Button loading={isDeleting} onClick={handleClick} className="mr-3">
            <GoTrashcan />
          </Button>
          {error && <div>Error deleting user</div>}
          {user.name}
        </div>
      </div>
    </div>
  );
};

export default UsersListItem;
