import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useUpdateEmployeeDocuments = ({ getEmployeeDetails }) => {
	const [showRejectPopover, setShowRejectPopover] = useState(null);
	const [inputValue, setInputValue] = useState('');

	const [{ loading = false }, trigger] = useHarbourRequest({
		url    : '/update_employee_document',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeDocument = async ({ data }) => {
		const payload = {
			documents: [{ ...data }],
		};

		try {
			await trigger({
				data: payload,
			});
			getEmployeeDetails();
			setShowRejectPopover(null);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	const onClickApproveButton = (id) => {
		const payload = {
			id, status: 'approved',
		};
		updateEmployeeDocument({ data: payload });
	};

	const onClickSubmitButton = () => {
		const payload = {
			id: showRejectPopover, status: 'rejected', rejection_reason: inputValue,
		};
		updateEmployeeDocument({ data: payload });
	};

	return {
		onClickApproveButton,
		showRejectPopover,
		setShowRejectPopover,
		onClickSubmitButton,
		inputValue,
		setInputValue,
		loading,
	};
};

export default useUpdateEmployeeDocuments;
