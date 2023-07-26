import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useMemo } from 'react';

const MINIMUM_ARRAY_LENGTH = 0;

const useGetRatingCycle = (setRatingCycle) => {
	const [{ data, loading }] = useHarbourRequest({
		url    : '/get_rating_cycles',
		method : 'GET',
	}, { manual: false });

	const formattedDate = (item) => formatDate({
		date       : item,
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		formatType : 'date',
	});

	const ratingOptions = useMemo(() => data?.map((val) => ({
		label : `${formattedDate(val.start_date)} - ${formattedDate(val.end_date)}`,
		value : `${val.start_date}_${val.end_date}`,
	})), [data]);

	useEffect(() => {
		if ((ratingOptions || []).length > MINIMUM_ARRAY_LENGTH) {
			const [firstItem] = ratingOptions;
			setRatingCycle(firstItem.value);
		}
	}, [ratingOptions, setRatingCycle]);

	return { data, loading, ratingOptions };
};

export default useGetRatingCycle;
