import { faker } from '@faker-js/faker';
import {
  ALBUM_PHOTOS, DELETE, GET, PHOTO, PHOTOS_PATH, POST,
} from '../constants';
import { apiSlice } from './apiSlice';

export const photosApiSlice = apiSlice
  .injectEndpoints({
    endpoints: (builder) => ({
      fetchPhotos: builder.query({
        providesTags: (result, error, id) => {
          const tags = result.map((photo) => ({ type: PHOTO, id: photo.id }));
          tags.push({ type: ALBUM_PHOTOS, id });
          return tags;
        },
        query: (id) => ({
          url: PHOTOS_PATH,
          params: {
            albumId: id,
          },
          method: GET,
        }),
      }),
      addPhotos: builder.mutation({
        invalidatesTags: (result, error, id) => [{ type: ALBUM_PHOTOS, id }],
        query: (id) => ({
          url: PHOTOS_PATH,
          method: POST,
          body: {
            albumId: id,
            url: faker.image.abstract(150, 150, true),
          },
        }),
      }),
      removePhotos: builder.mutation({
        invalidatesTags: (result, error, id) => [{ type: PHOTO, id }],
        query: (photoId) => ({
          url: `${PHOTOS_PATH}/${photoId}`,
          method: DELETE,
        }),
      }),
      overrideExisting: false,
    }),
  });

export const {
  useFetchPhotosQuery,
  useAddPhotosMutation,
  useRemovePhotosMutation,
} = photosApiSlice;
