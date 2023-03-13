import { Button } from '@cogoport/components';
import { IcMFileUploader } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import useCreateExpense from '../../hooks/useCreateExpense';

import Details from './Details';
import styles from './styles.module.css';

function MailTemplate({ nonRecurringData, setNonRecurringData }) {
	const { uploadedInvoice, vendorName = '-', expenseCategory = '-' } = nonRecurringData || {};
	const { submitData } = useCreateExpense(nonRecurringData);

	const handleSubmit = () => {
		submitData();
	};
	const { stakeholderEmail } = nonRecurringData;

	return (
		<div className={styles.container}>

			<div className={styles.heading}>Email recipients</div>
			<div className={styles.section}>
				<div className={styles.keys}>From :</div>
				<div className={styles.recipient_values}>
					<Details text="Cogoport Finance Team" />
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.keys}>To :</div>
				<div className={styles.recipient_values}>
					<Details text={stakeholderEmail || 'N/A'} />
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.keys}>CC :</div>
				<div className={styles.recipient_values}>
					<Details text="e.g.Arjun Dhupe, Mayur Chamaria" />
				</div>
			</div>

			<div className={styles.heading_subject}>Email subject</div>
			<div className={styles.subject}>
				<Details text={`${vendorName} | ${startCase(expenseCategory)} | Expense Approval Request`} />
			</div>

			<div className={styles.heading_body}>Email body</div>
			<div className={styles.subject}>
				<Details
					isBody
					nonRecurringData={nonRecurringData}
					setNonRecurringData={setNonRecurringData}
				/>
			</div>

			{uploadedInvoice && (
				<div className={styles.file}>
					<a href={uploadedInvoice} target="_blank" rel="noreferrer">
						<IcMFileUploader />
						Uploaded File
					</a>
				</div>
			)}
			<div className={styles.button}><Button onClick={handleSubmit}>Send</Button></div>
		</div>
	);
}
export default MailTemplate;
