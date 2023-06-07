import { UserType } from '../store/slices/usersSlice';
import React from 'react';

interface AlbumListProps {
  user: UserType;
}

const AlbumList: React.FC<AlbumListProps> = ({ user }) => {
  return <div>Displaying albums of {user.name}</div>;
};

export default AlbumList;
