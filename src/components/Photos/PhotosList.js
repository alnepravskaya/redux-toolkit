import React from 'react';
import PhotosListItem from './PhotosListItem';
import Button from '../UI/Button';
import Skeleton from '../UI/Skeleton';
import { useAddPhotosMutation, useFetchPhotosQuery } from '../../apis/slices/photosApiSlice';

function PhotosList({ id }) {
  const { data, isFetching, error } = useFetchPhotosQuery(id);
  const [addPhoto] = useAddPhotosMutation();

  const handleAddPhoto = () => {
    addPhoto(id);
  };

  return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Photos</h3>
            <Button
                loading={addPhoto.isLoading}
                onClick={handleAddPhoto}
            >+Add Photo</Button>
        </div>
        {isFetching
          ? <Skeleton className="h-8 w-8" times={4}/>
          : error ? <div>Error</div> : <div className="mx-8 flex flex-row flex-wrap"> {data.map((photo) => (
                <PhotosListItem key={photo.id} photo={photo}/>))}
            </div>
        }
    </div>;
}

export default PhotosList;
