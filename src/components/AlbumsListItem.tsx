import { AlbumType, useRemoveAlbumMutation } from '../store/apis/albumApi';
import ExpandablePannel from './ExpandablePannel';
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import React from 'react';

interface AlbumsListItemProps {
  album: AlbumType;
}

const AlbumsListItem: React.FC<AlbumsListItemProps> = ({ album }) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = (): void => {
    removeAlbum(album);
  };

  const header = (
    <>
      <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveAlbum}>
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );
  return <ExpandablePannel header={header}>List of photos in the album</ExpandablePannel>;
};

export default AlbumsListItem;
