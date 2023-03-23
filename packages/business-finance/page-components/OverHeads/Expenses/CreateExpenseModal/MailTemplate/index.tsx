import { Button } from '@cogoport/components';
import { IcMFileUploader } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

// import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import useCreateExpense from '../../hooks/useCreateExpense';
import useCreateExpenseConfig from '../../hooks/useCreateExpenseConfig';

import Details from './Details';
import styles from './styles.module.css';

interface Data {
	uploadedInvoice?:any,
	vendorName?:string,
	expenseCategory?:string,
	stakeholderEmail?:string,
}

interface Props {
	mailData?:Data,
	setMailData?:any,
	setShowModal?:boolean,
	getList?:(p:any)=>void,
	getRecurringList?:(p:any)=>void,
	createExpenseType?:string,
}

function MailTemplate({ mailData, setMailData, setShowModal, getList, getRecurringList, createExpenseType }:Props) {
	const { uploadedInvoice, vendorName = '-', expenseCategory = '-', stakeholderEmail } = mailData || {};

	// const splitArray = (String(uploadedInvoice) || '').split('/') || [];
	// const filename = splitArray[splitArray.length - 1];

	const { submitData, loading } = useCreateExpense({
		formData: mailData,
		setShowModal,
		getList,
	});
	const { createRecurring, recurringLoading } = useCreateExpenseConfig({ mailData, setShowModal, getRecurringList });

	const handleClick = () => {
		if (createExpenseType === 'recurring') {
			createRecurring();
		} else if (createExpenseType === 'nonRecurring') {
			submitData();
		}
	};

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
			{/* <div className={styles.section}>
				<div className={styles.keys}>CC :</div>
				<div className={styles.recipient_values}>
					<Details text="e.g.Arjun Dhupe, Mayur Chamaria" />
				</div>
			</div> */}

			<div className={styles.heading_subject}>Email subject</div>
			<div className={styles.subject}>
				<Details text={`${vendorName} | ${startCase(expenseCategory)} | Expense Approval Request`} />
			</div>

			<div className={styles.heading_body}>Email body</div>
			<div className={styles.subject}>
				<Details
					isBody
					mailData={mailData}
					setMailData={setMailData}
				/>
			</div>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				{uploadedInvoice?.length > 0 && (
					<div className={styles.file}>
						<a href={uploadedInvoice} target="_blank" rel="noreferrer">
							<IcMFileUploader />
							{/* {showOverflowingNumber(filename, 10)} */}
							Uploaded file
						</a>
					</div>
				)}
				<div className={styles.button}>
					<Button onClick={() => handleClick()} disabled={loading || recurringLoading}>
						{loading || recurringLoading ? 'Sending...' : 'Send Email'}
					</Button>
				</div>
			</div>
		</div>
	);
}
export default MailTemplate;
