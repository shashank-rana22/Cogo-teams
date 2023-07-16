import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const START_PAGE = 1;

const useGetAirIndiaAwbNumbers = (activeTab = 'air_india_awb', status = 'completed') => {
	const [page, setPage] = useState(START_PAGE);
	const [finalList, setFinalList] = useState([]);

	const [{ data = {}, loading }, trigger] = useRequest('/list_air_india_awb_numbers', { manual: true });

	const getAirIndiaAwbNumbersList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							status,
						},

						page,
					},
				});
			} catch (err) {
				console.error(err);
			}
		})();
	}, [page, status, trigger]);

	useEffect(() => {
		setFinalList([]);
		setPage(START_PAGE);
	}, [activeTab]);

	useEffect(() => {
		setFinalList([]);
		setPage(START_PAGE);
	}, [status]);

	useEffect(() => {
		getAirIndiaAwbNumbersList();
	}, [page, status, getAirIndiaAwbNumbersList]);

	return {
		loading,
		setPage,
		page,
		data,
		getAirIndiaAwbNumbersList,
		finalList,
		setFinalList,
	};
};

export default useGetAirIndiaAwbNumbers;
