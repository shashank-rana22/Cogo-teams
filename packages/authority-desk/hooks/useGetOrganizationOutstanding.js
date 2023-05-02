import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetOrganizationOutstanding = () => {
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
						bookingPartyId : '02b01244-7a40-4186-a294-f5fa8ecdfbff',
						page           : 1,
						pageSize       : 10,
					},
				});
			} catch (err) {
				Toast.error(err?.message);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		getOrgList();
	}, [getOrgList]);

	return {
		data,
		loading,
	};
};

export default useGetOrganizationOutstanding;
