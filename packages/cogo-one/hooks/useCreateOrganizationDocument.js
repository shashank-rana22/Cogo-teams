import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import useUpdateOmnichannelNewDocument from './useUpdateOmnichannelNewDocument';

const useCreateOrganizationDocument = ({ paramsData = {}, fileType = '', setSelectedDocumentType = () => {} }) => {
	const {
		orgId = '', documentsList = () => {},
		singleItem = {}, setSingleItem = () => {},
		setShowModal = () => {},
	} = paramsData || {};

	const [{ loading: panLoading }, trigger] = useRequest({
		url    : '/create_organization_document',
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

	const createPanDocument = async (data) => {
		const {
			utility_bill_document_url = {}, registration_number = '',
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
					image_url     : finalUrl,
					name          : 'PanDocument',
					document_type : 'pan',
					source        : 'onboarding',
					data          : {
						identity_number: registration_number,
					},
					organization_id: orgId,
				},
			});
			updateNewDocument({ data });
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		createPanDocument,
		panLoading,
	};
};

export default useCreateOrganizationDocument;
