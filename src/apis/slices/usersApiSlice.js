import { faker } from '@faker-js/faker';
import {
  ADD_USER,
  DELETE, GET, POST, USER, USERS_PATH,
} from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchUsers: builder.query({
        providesTags: (result) => {
          const tags = result.map((album) => ({ type: USER, id: album.id }));
          tags.push(ADD_USER);
          return tags;
        },
        query: () => ({
          url: USERS_PATH,
          method: GET,
        }),
      }),
      addUser: builder.mutation({
        invalidatesTags: [ADD_USER],
        query: () => ({
          url: USERS_PATH,
          method: POST,
          body: {
            name: faker.name.fullName(),
          },
        }),
      }),
      removeUser: builder.mutation({
        invalidatesTags: (result, error, id) => [{ type: USER, id }],
        query: (id) => ({
          url: `${USERS_PATH}/${id}`,
          method: DELETE,
        }),
      }),
    }),
    overrideExisting: false,
  });

export const {
  useFetchUsersQuery,
  useAddUserMutation,
  useRemoveUserMutation,
} = usersApiSlice;
