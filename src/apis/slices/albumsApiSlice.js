import { faker } from '@faker-js/faker';
import {
  ALBUM, ALBUM_PHOTOS, ALBUMS_PATH, DELETE, GET, POST, USER_ALBUMS,
} from '../constants';
import { apiSlice } from './apiSlice';

export const albumsApiSlice = apiSlice
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchAlbums: builder.query({
        providesTags: (result, error, id) => {
          const tags = result.map((album) => ({ type: ALBUM, id: album.id }));
          tags.push({ type: USER_ALBUMS, id });
          return tags;
        },
        query: (id) => ({
          url: ALBUMS_PATH,
          params: {
            userId: id,
          },
          method: GET,
        }),
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, id) => [{ type: USER_ALBUMS, id }],
        query: (id) => ({
          url: ALBUMS_PATH,
          method: POST,
          body: {
            userId: id,
            title: faker.commerce.productName(),
          },
        }),
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, id) => [
          { type: ALBUM, id },
          { type: ALBUM_PHOTOS, id },
        ],
        query: (id) => ({
          url: `${ALBUMS_PATH}/${id}`,
          method: DELETE,
        }),
      }),
      overrideExisting: false,
    }),
  });

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApiSlice;
