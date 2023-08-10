import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useState, useCallback } from 'react';

const useListOrganizationPocs = ({ id, mobileNumberList = [] }) => {
	const [page, setPage] = useState(1);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_organization_pocs',
		method : 'GET',
	});

	const getData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						filters: {
							organization_id : id,
							mobile_number   : mobileNumberList,
							poc_type        : 'truck_driver',
						},
						page,
						page_limit: 200,
					},
				});
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, id, page, mobileNumberList]);

	useEffect(() => {
		if (id) {
			getData();
		}
	}, [getData, id]);

	return {
		loading,
		data,
		getData,
		setPage,
	};
};

export default useListOrganizationPocs;
