import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useSubmitOrganizationKyc = ({ orgId = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/submit_organization_kyc',
		method : 'post',
	}, { manual: true });

	const {
		profile :{ user: { id = '' } },
	} = useSelector((state) => state);

	const submitOrganizationKyc = async (data) => {
		try {
			await trigger({
				params: {
					...data,
					performed_by_id   : id,
					performed_by_type : 'agent',
					id                : orgId,
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	};

	return {
		submitOrganizationKyc,
		loading,
	};
};

export default useSubmitOrganizationKyc;
