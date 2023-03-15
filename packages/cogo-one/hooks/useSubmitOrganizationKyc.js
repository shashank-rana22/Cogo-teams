import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import useUpdateOmnichannelNewDocument from './useUpdateOmnichannelNewDocument';

const useSubmitOrganizationKyc = ({
	orgId = '', documentsList = () => {},
	singleItem = {}, setSingleItem = () => {},
	setShowModal = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/submit_organization_kyc',
		method : 'post',
	}, { manual: true });

	const { updateNewDocument = () => {} } = useUpdateOmnichannelNewDocument({
		documentsList,
		singleItem,
		setSingleItem,
		setShowModal,
		type: 'update_file',
	});

	const submitOrganizationKyc = async (data) => {
		try {
			await trigger({
				data: {
					...data,
					id: orgId,
				},
			});
			updateNewDocument({ data });
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
