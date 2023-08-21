import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationDueDiligence({ organization_id }) {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization_due_diligence',
	}, { manual: true });

	const getOrganizationDueDiligence = async () => {
		try {
			await trigger({
				params: {
					organization_id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getOrganizationDueDiligence();
		// put a id check
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(data);
	return {
		data,
		loading,
		getOrganizationDueDiligence,
	};
}

export default useGetOrganizationDueDiligence;
