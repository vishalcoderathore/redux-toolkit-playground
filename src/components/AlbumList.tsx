import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store';
import { UserType } from '../store/slices/usersSlice';
import ExpandablePannel from './ExpandablePannel';
import Skeleton from './Skeleton';
import Button from './Button';
import React from 'react';

interface AlbumListProps {
  user: UserType;
}

const AlbumList: React.FC<AlbumListProps> = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = (): void => {
    addAlbum(user);
    console.log(results);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error Loading Data</div>;
  } else if (data) {
    content = data.map(album => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePannel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePannel>
      );
    });
  }

  return (
    <div>
      <div>
        Displaying albums of {user.name}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumList;
