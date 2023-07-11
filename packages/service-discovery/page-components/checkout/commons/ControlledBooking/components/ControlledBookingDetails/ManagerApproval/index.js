import { Toast } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ManagerApproval({
	refetchCheckout = () => {},
	manager_approval_proof,
	checkout_approvals,
}) {
	const [file, setFile] = useState(manager_approval_proof);

	const [{ loading }, trigger] = useRequest({
		url    : '/send_checkout_for_approval',
		method : 'POST',
	}, { manual: true });

	const handleBookingProof = async (val) => {
		setFile(val);
		try {
			const payload = {
				id                     : checkout_approvals?.[0]?.id,
				booking_status         : 'pending',
				manager_approval_proof : val?.url || '',
			};

			await trigger({
				data: payload,
			});
			refetchCheckout();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return (
		<>
			<div className={styles.title}>Upload Manager&apos;s Approval Proof</div>

			<FileUploader
				name="manager_approval_proof"
				value={file}
				drag
				height={50}
				accept="image/*,.pdf,.eml,.doc,.docx,"
				maxSize="10485760"
				uploadType="aws"
				uploadIcon="ic-upload"
				onChange={handleBookingProof}
				disabled={loading}
				style={{ width: '50%' }}
			/>
		</>
	);
}

export default ManagerApproval;
