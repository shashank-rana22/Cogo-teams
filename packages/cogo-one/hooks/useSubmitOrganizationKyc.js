import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import useUpdateOmnichannelNewDocument from './useUpdateOmnichannelNewDocument';

const useSubmitOrganizationKyc = ({
	paramsData = {},
	fileType = '',
	setSelectedDocumentType = () => {},
}) => {
	const {
		orgId = '', documentsList = () => {},
		singleItem = {}, setSingleItem = () => {},
		setShowModal = () => {},
	} = paramsData || {};

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
		fileType,
		setSelectedDocumentType,
	});

	const submitOrganizationKyc = async (data) => {
		const {
			utility_bill_document_url = {}, country_id = '', preferred_languages = [],
			registration_number = '',
		} = data || {};

		let finalUrl;
		if (typeof utility_bill_document_url === 'object') {
			finalUrl = utility_bill_document_url?.finalUrl || '';
		} else {
			finalUrl = utility_bill_document_url || '';
		}

		try {
			await trigger({
				data: {
					country_id,
					preferred_languages,
					registration_number,
					utility_bill_document_url : finalUrl,
					id                        : orgId,
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
