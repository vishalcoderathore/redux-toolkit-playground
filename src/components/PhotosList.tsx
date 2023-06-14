import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';
import { AlbumType } from '../store/apis/albumsApi';
import Button from './Button';
import React from 'react';

interface PhtotosListProps {
  album: AlbumType;
}

const PhotosList: React.FC<PhtotosListProps> = ({ album }) => {
  useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  console.log(addPhotoResults.isLoading);

  const handleAddPhoto = (): void => {
    addPhoto(album);
  };

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Photos In {album.title}</h3>
        <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
          + Add Photo
        </Button>
      </div>
    </div>
  );
};

export default PhotosList;
