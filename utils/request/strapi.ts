import axios from 'axios';
import { parseCookies } from 'nookies';

import type { NextPageContext } from 'next';
import type { AxiosRequestHeaders } from 'axios';

const strapi = axios.create({
  baseURL: 'https://penn-pal-backend.herokuapp.com/api',
  timeout: 1000,
});

export const createHeaders = (
  context: NextPageContext
): AxiosRequestHeaders => ({
  Authorization: `Bearer ${parseCookies(context).jwt}`,
});

export default strapi;
