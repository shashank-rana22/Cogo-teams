import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOrganizationContract = ({ organization_id, step }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'get_organization_contract',
	}, { manual: true });

	const getOrganizationContract = async () => {
		try {
			await trigger({
				params: {
					organization_id : '03f6764a-6da8-48dd-b613-f74f42d76d78',
					service_type    : 'fcl_freight',
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
		data : data?.data?.terms_details,
		id   : data?.data?.id,
		loading,
		getOrganizationContract,
	};
};
export default useGetOrganizationContract;
