import { PhotoType, useRemovePhotoMutation } from '../store/apis/photosApi';
import { GoTrash } from 'react-icons/go';
interface PhotosListItemProps {
  photo: PhotoType;
}

const PhotosListItem: React.FC<PhotosListItemProps> = ({ photo }) => {
  const [removePhoto, _results] = useRemovePhotoMutation();
  const handleRemovePhoto = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
    if (
      event.type === 'click' ||
      (event.type === 'keydown' && (event as React.KeyboardEvent<HTMLDivElement>).key === 'Enter')
    ) {
      removePhoto(photo);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleRemovePhoto}
      onKeyDown={handleRemovePhoto}
      className="relative m-2 cursor-pointer">
      <img src={photo.url} alt="random pic" className="h-20 w-20" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrash className="text-3xl" />
      </div>
    </div>
  );
};

export default PhotosListItem;
