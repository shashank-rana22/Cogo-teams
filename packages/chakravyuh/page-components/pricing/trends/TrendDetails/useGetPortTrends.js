import { useRequest } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useEffect, useState } from 'react';

const useGetPortTrends = ({ trend }) => {
	const [page, setPage] = useState(1);
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_fcl_freight_rate_estimation_trends',
		method : 'GET',
		params : {
			filters: {
				object_id: trend?.id,
			},
			page,
			page_limit: 20,
		},

	}, { manual: true });

	const getData = async () => {
		await trigger();
	};

	const average = {
		id    : 'Average',
		color : 'hsl(5, 70%, 50%)',
		data  : [],
	};

	const upper = {
		id    : 'Upper Lmt.',
		color : 'hsl(188, 70%, 50%)',
		data  : [],
	};

	const lower = {
		id    : 'Lower Lmt.',
		color : 'hsl(127, 70%, 50%)',
		data  : [],
	};

	const dev = {
		id    : 'Std. Dev.',
		color : 'hsl(330, 70%, 50%)',
		data  : [],
	};

	const actual = {
		id    : 'New Price',
		color : 'rgb(205, 247, 212)',
		data  : [],
	};

	const listOld = data?.list || [];

	const total_pages = data?.total;

	const list = [];

	for (let i = listOld.length - 1; i >= 0;) {
		list.push(listOld[i]);
		i -= 1;
	}

	list.forEach((item) => {
		average.data.push({
			// x : i,
			x : `${format(item.created_at, 'dd MMM hh:mm')}`,
			y : item?.tf?.average,
		});
		upper.data.push({
			// x : i,
			x : `${format(item.created_at, 'dd MMM hh:mm')}`,
			y : item?.tf?.upper_limit,
		});
		lower.data.push({
			// x : i,
			x : `${format(item.created_at, 'dd MMM hh:mm')}`,
			y : item?.tf?.lower_limit,
		});
		dev.data.push({
			// x : i,
			x : `${format(item.created_at, 'dd MMM hh:mm')}`,
			y : item?.tf?.stand_dev,
		});
		actual.data.push({
			// x : i,
			x : `${format(item.created_at, 'dd MMM hh:mm')}`,
			y : item?.actual_line_item?.price || -1,
		});
	});

	const trendData = [
		upper,
		average,
		lower,
		dev,
		actual,
	];

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trend?.id, page]);
	return {
		loading,
		trendData,
		setPage,
		list,
		page,
		total_pages,
	};
};

export default useGetPortTrends;
