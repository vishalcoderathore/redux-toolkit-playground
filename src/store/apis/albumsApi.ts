import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserType } from '../slices/usersSlice';
import { faker } from '@faker-js/faker';
import config from '../../../config';

// Define the album type
export interface AlbumType {
  id: number;
  title: string;
  userId: number;
}

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl,
  }),
  tagTypes: ['Album', 'UsersAlbums'],
  endpoints(builder) {
    return {
      addAlbum: builder.mutation<AlbumType, UserType>({
        invalidatesTags: (_result, _error, user) => [{ type: 'UsersAlbums', id: user.id }],
        query: (user: UserType) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query<AlbumType[], UserType>({
        providesTags: (result, _error, user) => {
          if (!result) {
            return []; // or return [{ type: 'Album', id: 'LIST' }];
          }
          const tags: Array<{ type: 'Album' | 'UsersAlbums'; id: number }> = result.map(album => {
            // Explicitly define the type of the tags array
            return { type: 'Album', id: album.id };
          });
          tags.push({ type: 'UsersAlbums', id: user.id });
          return tags;
        },
        query: (user: UserType) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),

      removeAlbum: builder.mutation<void, AlbumType>({
        invalidatesTags: (_result, _error, album) => [{ type: 'Album', id: album.id }],
        query: (album: AlbumType) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } = albumsApi;
export { albumsApi };
