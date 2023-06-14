import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { AlbumType } from './albumsApi';
import config from '../../../config';

export interface PhotoType {
  id: number;
  title: string;
  albumId: number;
}

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query<PhotoType[], AlbumType>({
        query: (album: AlbumType) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          };
        },
      }),
      addPhoto: builder.mutation<PhotoType, AlbumType>({
        query: (album: AlbumType) => {
          return {
            url: '/photos',
            body: {
              albumId: album.id,
              url: faker.image.urlLoremFlickr({ width: 150, height: 150 }),
            },
            method: 'POST',
          };
        },
      }),
      removePhoto: builder.mutation<void, PhotoType>({
        query: (photo: PhotoType) => {
          return {
            method: 'DELETE',
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi };
