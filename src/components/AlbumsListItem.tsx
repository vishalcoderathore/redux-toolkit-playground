import { AlbumType, useRemoveAlbumMutation } from '../store/apis/albumsApi';
import ExpandablePannel from './ExpandablePannel';
import { GoTrash } from 'react-icons/go';
import PhotosList from './PhotosList';
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
        <GoTrash />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePannel header={header}>
      <PhotosList album={album} />
    </ExpandablePannel>
  );
};

export default AlbumsListItem;
