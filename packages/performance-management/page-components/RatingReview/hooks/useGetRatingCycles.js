import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useGetRatingCycles = () => {
	const [selectCycle, setSelectCycle] = useState('');
	const { user = {} }	 = useSelector((state) => state?.profile || {});

	const [{ data, loading }] = useHarbourRequest({
		url    : '/get_rating_cycles',
		method : 'GET',
		params : {
			user_id: user?.id,
		},
	}, { manual: false });

	const ratingCycleOptions = (data || []).map((element) => {
		const { start_date, end_date } = element;
		return {
			value : element,
			label : `${start_date} to ${end_date}`,
		};
	});

	useEffect(() => {
		setSelectCycle(ratingCycleOptions?.[0]?.value);
	}, [ratingCycleOptions]);

	return {
		ratingCycleOptions,
		selectCycle,
		setSelectCycle,
		loading,
	};
};

export default useGetRatingCycles;
