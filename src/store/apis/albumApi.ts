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
  tagTypes: ['Album'],
  endpoints(builder) {
    return {
      addAlbum: builder.mutation<AlbumType, UserType>({
        invalidatesTags: (_result, _error, user) => [{ type: 'Album', id: user.id }],
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
        providesTags: (_result, _error, user) => [{ type: 'Album', id: user.id }],
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
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
