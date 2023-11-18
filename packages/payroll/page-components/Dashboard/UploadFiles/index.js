import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import useBulkUploadPayloadData from '../../../hooks/useBulkUploadPayrollData';

import styles from './styles.module.css';
import FileUploader from './UploadComponent';

const FILESLABEL = [
	{ name: 'Byod Template', value: 'byod_template' },
	{ name: 'Expense Management Template', value: 'expense_management_template' },
	{ name: 'Irregular Payments Template', value: 'irregular_payments_template' },
	{ name: 'CTC Template', value: 'ctc_current_template' },
	{ name: 'Declaration Template', value: 'declaration_template' },
	{ name: 'Monthly Payroll Template', value: 'monthly_payroll_template' },
];

function UploadFiles() {
	const { control, handleSubmit } = useForm();
	const [filearray, setFileArray] = useState({});
	const { uploadBulkPayrollData } = useBulkUploadPayloadData();

	const onSubmit = (values) => {
		console.log('filearray', filearray);
		uploadBulkPayrollData({ payload: values });
	};
	return (
		<div className={styles.main_container}>
			<div className={styles.grey_container}>

				{FILESLABEL.map((item) => (
					<div key={item.name} className={styles.upload_div}>
						<span className={styles.name}>
							{item.name}
							{' '}
							:
						</span>
						<FileUploader
							control={control}
							filearray={filearray}
							setFileArray={setFileArray}
							name={item.name}
							value={item.value}
						/>
					</div>
				))}
				<div className={styles.btns_div}>
					<Button
						size="md"
						themeType="primary"
						className={styles.btn}
						onClick={handleSubmit(onSubmit)}
					>
						Primary

					</Button>
				</div>

			</div>

		</div>
	);
}

export default UploadFiles;
