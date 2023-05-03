import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListRepository = () => {
	const [{ data = {}, loading }, trigger] = useRequest('/list_service_ops_repository', { manual: true });

	const listRepository = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
					// filters: {
					// 	id: airportIds,
					// },

					},
				});
			} catch (err) {
				console.log(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		listRepository();
	}, [listRepository]);

	return { data, listRepository, loading };
};

export default useListRepository;
