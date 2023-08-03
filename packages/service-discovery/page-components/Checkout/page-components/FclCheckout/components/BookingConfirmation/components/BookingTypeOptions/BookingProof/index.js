import { cl, Toast } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

const ONE = 1;

function BookingProof({
	detail = {},
	updateCheckout = () => {},
	updateLoading = false,
	length = 0,
}) {
	const { booking_proof = '' } = detail;

	const [file, setFile] = useState('');

	const handleBookingProof = useCallback(
		async (val) => {
			try {
				const payload = {
					booking_proof : val,
					id            : detail.id,
				};

				updateCheckout({
					values: payload,
				});
			} catch (error) {
				if (error?.response) {
					Toast.error(getApiErrorString(error?.response?.data));
				}
			}
		},
		[detail.id, updateCheckout],
	);

	useEffect(() => {
		if (
			(typeof file === 'object' ? !isEmpty(file?.finalUrl) : file)
			&& (file?.finalUrl || file) !== booking_proof
		) {
			handleBookingProof(file?.finalUrl || file);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	return (
		<div className={`${styles.wrapper} ${length > ONE && styles.multiple}`}>
			<div className={styles.header_text}>Booking Proof</div>

			<div className={cl`${styles.container} ${file && styles.uploaded}`}>
				<FileUploader
					onChange={(value) => setFile(value?.finalUrl || value)}
					onlyURLOnChange
					value={file}
					drag
					defaultValues={booking_proof}
					themeType="secondary"
					uploadIcon={<IcMCloudUpload style={{ height: 30, width: 30 }} />}
					accept={`image/*,.pdf,.eml,.doc,.docx,application/msword,application/vn
					d.openxmlformats-officedocument.wordprocessingml.document`}
					dropareaProps={{ heading: 'Upload Document', subHeading: 'image, pdf, docx, csv' }}
					uploadType="aws"
					height={50}
					disabled={updateLoading}
					id="checkout_booking_proof"
				/>
			</div>
		</div>
	);
}

export default BookingProof;
