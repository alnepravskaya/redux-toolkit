import React from 'react';
import { GoTrash } from 'react-icons/go';
import { useRemovePhotosMutation } from '../../apis/slices/photosApiSlice';

function PhotosListItem({ photo }) {
  const [removePhoto] = useRemovePhotosMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo.id);
  };

  return <div className="relative m-2 cursor-pointer" onClick={handleRemovePhoto}>
        <img src={photo.url} className="h-20 w-20" alt="random pic"/>
        <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
            <GoTrash className="text-3xl"/>
        </div>
    </div>;
}

export default PhotosListItem;
