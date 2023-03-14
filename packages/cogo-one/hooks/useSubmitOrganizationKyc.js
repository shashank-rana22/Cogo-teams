import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import useUpdateOmnichannelNewDocument from './useUpdateOmnichannelNewDocument';

const useSubmitOrganizationKyc = ({
	orgId = '', documentsList = () => {},
	singleItem = {}, setSingleItem = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/submit_organization_kyc',
		method : 'post',
	}, { manual: true });

	const { updatelNewDocument = () => {} } = useUpdateOmnichannelNewDocument({
		documentsList,
		singleItem,
		setSingleItem,
	});

	const {
		profile :{ user: { id = '' } },
	} = useSelector((state) => state);

	const submitOrganizationKyc = async (data) => {
		console.log('data:', data);

		try {
			await trigger({
				data: {
					...data,
					performed_by_id   : id,
					performed_by_type : 'agent',
					id                : orgId,
				},
			});
			updatelNewDocument({ data });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		submitOrganizationKyc,
		loading,
	};
};

export default useSubmitOrganizationKyc;
