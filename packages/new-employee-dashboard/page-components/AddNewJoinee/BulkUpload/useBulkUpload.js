import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const onClickViewSampleFile = () => {
	window.open(GLOBAL_CONSTANTS.sample_document_url.new_hire_bulk_upload_url, '_blank', 'noreferrer');
};

const useBulkUpload = () => {
	const [activeTab, setActiveTab] = useState('create');

	const [{ loading = false }, trigger] = useHarbourRequest({
		url    : 'bulk_upload_employee_details',
		method : 'post',
	}, { manual: true });

	const { formState: { errors }, control, handleSubmit } = useForm();

	const bulkUploadNewHire = async (val) => {
		try {
			const { finalUrl } = val?.upload_new_hire_info || {};

			const payload = {
				file_url    : finalUrl,
				action_name : activeTab,
			};

			await trigger({ data: payload });

			Toast('New Hire details is uploaded Successfully');
		} catch (error) {
			if (error?.message || error?.error?.message) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
		}
	};

	return {
		bulkUploadNewHire,
		loading,
		control,
		errors,
		onClickViewSampleFile,
		handleSubmit,
		activeTab,
		setActiveTab,
	};
};

export default useBulkUpload;
