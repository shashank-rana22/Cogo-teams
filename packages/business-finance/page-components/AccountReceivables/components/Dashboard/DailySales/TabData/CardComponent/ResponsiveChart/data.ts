import { format } from '@cogoport/utils';

const BarData = (subActiveTab: string, data?: object) => (data ? data[subActiveTab] : [{}]).map((item) => (
	{
		date: format(
			item?.duration,
			'dd MMM ',
			{},
			false,
		),
		Amount : item?.amount,
		Count  : item?.count,
	}));

export default BarData;
