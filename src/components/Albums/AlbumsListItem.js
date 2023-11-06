import React from 'react';
import { GoTrash } from 'react-icons/go';
import ExpandablePanel from '../UI/ExpandablePanel';
import Button from '../UI/Button';
import PhotosList from '../Photos/PhotosList';
import { useRemoveAlbumMutation } from '../../apis/slices/albumsApiSlice';

function AlbumsListItem({ title, id }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => {
    removeAlbum(id);
  };

  return <ExpandablePanel header={<>
        <Button
            onClick={handleRemoveAlbum}
            loading={results.isLoading}
            className="mr-3"
        >
            <GoTrash/>
        </Button>
        {title}
    </>}>
        <PhotosList id={id}/>
    </ExpandablePanel>;
}

export default AlbumsListItem;
