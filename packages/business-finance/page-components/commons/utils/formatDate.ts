import { format } from '@cogoport/utils';

export  const formatDate = (date:Date,dateformat:string='dd MMM yy | hh:mm a',options:object,utcInput:boolean) => format(date, dateformat,options,utcInput);