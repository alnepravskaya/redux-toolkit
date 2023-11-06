import React from 'react';
import { useAddAlbumMutation, useFetchAlbumsQuery } from '../../apis/slices/albumsApiSlice';
import Skeleton from '../UI/Skeleton';
import Button from '../UI/Button';
import AlbumsListItem from './AlbumsListItem';

function AlbumsList({ id }) {
  const { data, isFetching } = useFetchAlbumsQuery(id);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(id);
  };

  return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Albums</h3>
            <Button onClick={handleAddAlbum} loading={results.isLoading}>Add Album</Button>
        </div>

        {isFetching
          ? <Skeleton className="h-10 w-full"/>
          : data.map(({ id: albumId, title }) => <AlbumsListItem
                title={title}
                id={albumId}
                key={albumId}
            />)
        }
    </div>;
}

export default AlbumsList;
