import { Button } from '@cogoport/components';
import { IcMFileUploader } from '@cogoport/icons-react';

import Details from './Details';
import styles from './styles.module.css';

function MailTemplate({ nonRecurringData }) {
	const { uploadedInvoice } = nonRecurringData || {};

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
					<Details text="Stakeholder" />
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.keys}>CC :</div>
				<div className={styles.recipient_values}>
					<Details text="Arjun Dhupe, Mayur Chamaria" />
				</div>
			</div>

			<div className={styles.heading_subject}>Email subject</div>
			<div className={styles.subject}>
				<Details text="Vendor Name | Expense Category | Expense Approval Request" />
			</div>

			<div className={styles.heading_body}>Email body</div>
			<div className={styles.subject}>
				<Details isBody />
			</div>

			<div className={styles.file}>
				<a href={uploadedInvoice}>
					<IcMFileUploader />
					Uploaded File
				</a>
			</div>
			<div className={styles.button}><Button>Send</Button></div>
		</div>
	);
}
export default MailTemplate;
