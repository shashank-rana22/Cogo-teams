import { Button } from '@cogoport/components';
import { IcMFileUploader } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import useCreateExpense from '../../hooks/useCreateExpense';
import useCreateExpenseConfig from '../../hooks/useCreateExpenseConfig';

import Details from './Details';
import styles from './styles.module.css';

interface Data {
	uploadedInvoice?: any;
	vendorName?: string;
	expenseCategory?: string;
	stakeholderEmail?: string;
	categoryName?: string;
}

interface Props {
	mailData?: Data;
	setShowModal?: (p: any) => void;
	getList?: (p: any) => void;
	getRecurringList?: (p: any) => void;
	createExpenseType?: string;
	incidentMangementId?: string;
}

function MailTemplate({
	mailData = {},
	setShowModal = () => {},
	getList = () => {},
	getRecurringList = () => {},
	createExpenseType = '',
	incidentMangementId = '',
}: Props) {
	const {
		uploadedInvoice,
		vendorName = '-',
		stakeholderEmail,
		categoryName = '-',
	} = mailData || {};

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	const { submitData, loading } = useCreateExpense({
		formData: mailData,
		setShowModal,
		getList,
		incidentMangementId,
	});
	const { createRecurring, recurringLoading } = useCreateExpenseConfig({
		mailData,
		setShowModal,
		getRecurringList,
		incidentMangementId,
	});

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

			<div className={styles.heading_subject}>Email subject</div>
			<div className={styles.subject}>
				<Details
					text={`${vendorName} | ${startCase(
						categoryName,
					)} | Expense Approval Request`}
				/>
			</div>

			<div className={styles.heading_body}>Email body</div>
			<div className={styles.subject}>
				<Details isBody mailData={mailData} />
			</div>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				{!isEmpty(uploadedInvoice) ? (
					<div className={styles.file}>
						<a
							href={uploadedInvoice}
							target="_blank"
							rel="noreferrer"
						>
							<div style={{ display: 'flex' }}>
								<div>
									<IcMFileUploader />
								</div>
								<div style={{ marginLeft: '4px' }}>
									{showOverflowingNumber(filename, 10)}
								</div>
							</div>
						</a>
					</div>
				) : null}
				<div className={styles.button}>
					<Button
						onClick={() => handleClick()}
						disabled={loading || recurringLoading}
					>
						{loading || recurringLoading
							? 'Sending...'
							: 'Send Email'}
					</Button>
				</div>
			</div>
		</div>
	);
}
export default MailTemplate;
