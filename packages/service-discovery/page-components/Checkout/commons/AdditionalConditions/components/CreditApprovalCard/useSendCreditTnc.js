import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useSendCreditTnc = ({ detail }) => {
	const [showModal, setShowModal] = useState(false);

	const onClose = () => {
		setShowModal(false);
	};

	const {
		importer_exporter_id,
		importer_exporter_poc,
		importer_exporter_poc_id,
	} = detail || {};

	const { email, name } = importer_exporter_poc || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/send_credit_terms_and_condition',
		method : 'POST',
	}, { manual: true });

	const onSubmit = async () => {
		try {
			await trigger({
				data: {
					organization_id     : importer_exporter_id,
					organization_poc_id : importer_exporter_poc_id,
				},
			});

			setShowModal(true);
		} catch (err) {
			if (err.response) {
				Toast.error(getApiErrorString(err.response?.data));
			}
		}
	};

	return {
		email,
		name,
		showModal,
		onClose,
		loading,
		onSubmit,
	};
};

export default useSendCreditTnc;
