import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetOrganizationOutstanding = ({ item = {} }) => {
	const [
		{ data, loading },
		trigger,
	] = useRequest(
		{
			url    : 'get_organization_outstanding',
			method : 'GET',
		},
		{ manual: true, autoCancel: false },
	);

	const getOrgList = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {
						bookingPartyIds : [item?.importer_exporter_id],
						page            : 1,
						pageSize        : 10,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [trigger, item?.importer_exporter_id]);

	useEffect(() => {
		getOrgList();
	}, [getOrgList]);

	return {
		data,
		loading,
	};
};

export default useGetOrganizationOutstanding;
