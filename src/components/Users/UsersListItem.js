import React, { Fragment } from 'react';
import { GoTrash } from 'react-icons/go';
import { useRemoveUserMutation } from '../../apis/slices/usersApiSlice';
import Button from '../UI/Button';
import ExpandablePanel from '../UI/ExpandablePanel';
import AlbumsList from '../Albums/AlbumsList';

function UserListItems({ name, id }) {
  const [removeUser, results] = useRemoveUserMutation();

  const handleClick = () => {
    removeUser(id);
  };

  return <Fragment key={id}>
        <ExpandablePanel
            header={<>
                <Button loading={results.isLoading} onClick={handleClick}> <GoTrash/></Button>
                <div className="flex p-2 justify-between items-center cursor-pointer">{name}</div>
            </>}>
            <AlbumsList id={id}/>
        </ExpandablePanel>
    </Fragment>;
}

export default UserListItems;
