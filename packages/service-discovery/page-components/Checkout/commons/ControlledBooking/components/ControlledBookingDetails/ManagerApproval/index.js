import { Toast } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

function ManagerApproval({
	refetchCheckout = () => {},
	manager_approval_proof = '',
	checkout_approvals = [],
}) {
	const [file, setFile] = useState('');

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/send_checkout_for_approval',
			method : 'POST',
		},
		{ manual: true },
	);

	const handleBookingProof = useCallback(
		async (val) => {
			try {
				const payload = {
					id                     : checkout_approvals?.[GLOBAL_CONSTANTS.zeroth_index]?.id,
					booking_status         : 'pending',
					manager_approval_proof : val,
				};

				await trigger({
					data: payload,
				});

				await refetchCheckout();
			} catch (error) {
				if (error?.response) {
					Toast.error(getApiErrorString(error?.response?.data));
				}
			}
		},
		[checkout_approvals, refetchCheckout, trigger],
	);

	useEffect(() => {
		if (
			(typeof file === 'object' ? !isEmpty(file?.finalUrl) : file)
			&& (file?.finalUrl || file) !== manager_approval_proof
		) {
			handleBookingProof(file?.finalUrl || file);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	return (
		<>
			<div className={styles.title}>Upload Manager&apos;s Approval Proof</div>

			<FileUploader
				name="manager_approval_proof"
				value={file}
				defaultValues={manager_approval_proof}
				onChange={(value) => setFile(value?.finalUrl || value)}
				disabled={loading}
				style={{ width: '50%' }}
			/>
		</>
	);
}

export default ManagerApproval;
