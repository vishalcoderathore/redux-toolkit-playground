import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import { UserType } from '../store/slices/usersSlice';
import AlbumsListItem from './AlbumsListItem';
import Skeleton from './Skeleton';
import Button from './Button';
import React from 'react';
interface AlbumListProps {
  user: UserType;
}

const AlbumList: React.FC<AlbumListProps> = ({ user }) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, _results] = useAddAlbumMutation();

  const handleAddAlbum = (): void => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error Loading Data</div>;
  } else if (data) {
    content = data.map(album => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <p className="m-2 text-base "> Displaying albums of {user.name}</p>
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumList;
