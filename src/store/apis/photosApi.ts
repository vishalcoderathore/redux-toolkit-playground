import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { AlbumType } from './albumsApi';
import config from '../../../config';

export interface PhotoType {
  id: number;
  url: string;
  albumId: number;
}

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
  }),
  tagTypes: ['AlbumPhoto', 'Photo'],
  endpoints(builder) {
    return {
      fetchPhotos: builder.query<PhotoType[], AlbumType>({
        providesTags: (result, _error, album) => {
          if (!result) {
            return []; // or return [{ type: 'Album', id: 'LIST' }];
          }
          const tags: Array<{ type: 'AlbumPhoto' | 'Photo'; id: number }> = result.map(photo => {
            // Explicitly define the type of the tags array
            return { type: 'Photo', id: photo.id };
          });
          tags.push({ type: 'AlbumPhoto', id: album.id });
          return tags;
        },
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
        invalidatesTags: (_result, _error, album) => [{ type: 'AlbumPhoto', id: album.id }],
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
        invalidatesTags: (_result, _error, photo) => [{ type: 'Photo', id: photo.id }],
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
