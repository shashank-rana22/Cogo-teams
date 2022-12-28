import { format } from '@cogoport/utils';

const formatDate = (date:Date,dateformat:string='dd MMM yy | hh:mm a') => format(date, dateformat);