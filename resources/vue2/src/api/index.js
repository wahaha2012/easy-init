import Request from 'axios';
import * as Api from './config';

export const getTitle = params => Request.get(Api.getTitle, { params });

export default {};
