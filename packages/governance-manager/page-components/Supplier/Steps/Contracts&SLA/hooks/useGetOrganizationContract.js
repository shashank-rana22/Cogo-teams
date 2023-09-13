import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOrganizationContract = ({ organization_id, step, service_type }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'get_organization_service_contract',
	}, { manual: true });

	const getOrganizationContract = async () => {
		try {
			await trigger({
				params: {
					organization_id,
					service_type,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (organization_id) { getOrganizationContract(); }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [step]);

	return {
		data : data?.data?.term_details,
		id   : data?.data?.id,
		loading,
		getOrganizationContract,
	};
};
export default useGetOrganizationContract;
