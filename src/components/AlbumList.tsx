import { UserType } from '../store/slices/usersSlice';
import { useFetchAlbumsQuery } from '../store';
import React from 'react';

interface AlbumListProps {
  user: UserType;
}

const AlbumList: React.FC<AlbumListProps> = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  console.log(data, error, isLoading);
  return <div>Displaying albums of {user.name}</div>;
};

export default AlbumList;
