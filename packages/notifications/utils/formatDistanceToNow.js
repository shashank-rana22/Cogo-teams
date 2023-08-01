import { formatDistanceToNow as nativeFormatDistanceToNow } from 'date-fns';

import date from './date';

const formatDistanceToNow = (inputDate, options) => nativeFormatDistanceToNow(date(inputDate), options);

export default formatDistanceToNow;
