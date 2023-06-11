import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserType } from '../slices/usersSlice';
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
  endpoints(builder) {
    return {
      fetchAlbums: builder.query<AlbumType[], UserType>({
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

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
