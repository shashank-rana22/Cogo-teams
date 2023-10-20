import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { upperCase } from '@cogoport/utils';
import React from 'react';

// import EditSalaryModel from '../EditSalaryModel';
// import useCreatePayroll from '../../../../hooks/useCreatePayroll';
import useDownloadPayrollDetails from '../../../../hooks/useDownloadPayrollDetails';
import useListPayroll from '../../../../hooks/useListPayroll';
// import Heading from '../Heading';

import SubmitPayroll from './CardSection';
import PaymentReport from './PaymentReport';
import styles from './styles.module.css';

function FinalPaymentReport(
	{
		setProceed = () => {},
		month = '', listId = '', handleSetup = () => {}, handleBack = () => {},
	},
) {
	const router = useRouter();
	const { createDownload } = useDownloadPayrollDetails();

	const { data } = useListPayroll({ listId });
	const { list } = data || {};
	const payroll_data = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};
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
								{upperCase(month)}
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
					{/* <div>
						<Button size="md" themeType="secondary" onClick={handledownload}>Download Payroll Sheet</Button>
					</div> */}
				</div>
				{/* <Heading proceed={proceed} setProceed={setProceed} handleBack={handleBack} month={month} /> */}
				<SubmitPayroll payroll_data={payroll_data} />
				<PaymentReport payroll_data={payroll_data} handledownload={handledownload} />
			</div>
			<div className={styles.bottom_bar_container}>
				{/* <span className={styles.underline_text}>Save as cohort</span> */}
				<Button
					size="md"
					themeType="secondary"
					className={styles.btn}
					onClick={() => router.push('/payroll')}
				>
					Back to Dashboard

				</Button>
				<Button
					size="md"
					themeType="primary"
					className={styles.btn}
					onClick={() => {
						setProceed(GLOBAL_CONSTANTS.zeroth_index);
						handleSetup('run_payroll');
					}}
				>
					Re-Run Payroll

				</Button>
			</div>
		</div>

	);
}

export default FinalPaymentReport;
