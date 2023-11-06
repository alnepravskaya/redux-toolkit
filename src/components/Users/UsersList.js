import React from 'react';
import {
  useFetchUsersQuery,
  useAddUserMutation,
} from '../../apis/slices/usersApiSlice';
import Skeleton from '../UI/Skeleton';
import Button from '../UI/Button';
import UserListItems from './UsersListItem';

function UsersList() {
  const { data, isFetching, error } = useFetchUsersQuery();
  const [addUser, results] = useAddUserMutation();

  const handleUserAdd = () => {
    addUser();
  };

  return <div>
        <div className="flex flex-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button onClick={handleUserAdd} loading={results.isLoading}>+ Add User</Button>
        </div>

        {isFetching
          ? (<Skeleton times={6} className="h-10 w-full"/>)
          : (<div>{error
            ? <div>Error</div>
            : <div>{data.map(({ name, id }) => <UserListItems name={name} id={id} key={id}/>)}</div>
            }</div>)
        }
    </div>;
}

export default UsersList;
