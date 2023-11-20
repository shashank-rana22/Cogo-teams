import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { getMonth } from '@cogoport/utils';
import React from 'react';

import useDownloadPayrollDetails from '../../../../hooks/useDownloadPayrollDetails';
import useListPayroll from '../../../../hooks/useListPayroll';
import useUpdatePayroll from '../../../../hooks/useUpdatePayroll';
import { MONTHS } from '../../../../utils/constants';

import PaymentDetails from './PaymentDetails';
import Review from './ReviewSection';
import styles from './styles.module.css';

function RunPayroll({ setProceed = () => {}, handleBack = () => {}, listId = '' }) {
	const { data } = useListPayroll({ listId });
	const { list } = data || {};
	const payroll_data = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { updatePayroll } = useUpdatePayroll({ setProceed });

	const { createDownload } = useDownloadPayrollDetails();
	const router = useRouter();

	const handleApprovePayroll = async (status) => {
		const payload = {
			status,
			payroll_id: payroll_data?.id,
		};
		await updatePayroll({ payload });
	};

	const handledownload = async () => {
		await createDownload(payroll_data?.id);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.grey_container}>
				<div className={styles.container}>
					<div className={styles.flex}>
						<IcMArrowBack width={14} height={14} onClick={handleBack} className={styles.back_btn} />
						<div className={styles.top_text_container}>
							<span className={styles.top_bold_text}>
								{MONTHS[getMonth(new Date(payroll_data.payroll_month))]}
								{' '}
								cycle
								{' '}
								{payroll_data.batch_name ? '-' : ''}
								{' '}
								{payroll_data?.batch_name}
							</span>
							<span className={styles.top_grey_text}>Pay employees quickly</span>
						</div>

					</div>
				</div>
				<Review payroll_data={payroll_data} />
				<PaymentDetails
					payroll_data={payroll_data}
					handledownload={handledownload}
				/>
			</div>
			<div className={styles.bottom_bar_container}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.btn}
					onClick={() => handleApprovePayroll('cancelled')}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="secondary"
					className={styles.btn}
					onClick={() => router.push('/payroll')}
				>
					Save and Back to Dashboard

				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={() => handleApprovePayroll('approved')}
					className={styles.btn}
				>
					Submit Payroll
				</Button>
			</div>
		</div>

	);
}

export default RunPayroll;
