import { Button } from '@cogoport/components';
import { IcMFileUploader } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import useAddExpense from '../../hooks/useAddExpense';

import Details from './Details';
import styles from './styles.module.css';

interface Data {
	uploadedInvoice?: any;
	vendorName?: string;
	expenseCategory?: string;
	stakeholderEmail?: string;
	vendorData?: any;
}

interface Props {
	expenseData?: Data;
	setShowModal?: (p: any) => void;
	getList?: (p: any) => void;
	rowData?: any;
	incidentApprovalManagementId?: string;
}

function MailTemplate({
	expenseData,
	setShowModal,
	getList,
	rowData,
	incidentApprovalManagementId,
}: Props) {
	const { uploadedInvoice, vendorData, stakeholderEmail } = expenseData || {};
	const { categoryName } = rowData || {};
	const { business_name: vendorName } = vendorData || {};

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	const { submitData, loading } = useAddExpense({
		expenseData,
		setShowModal,
		getList,
		rowData,
		incidentApprovalManagementId,
	});

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
					text={`${vendorName || '-'} | ${startCase(
						categoryName || '',
					)} | Expense Approval Request`}
				/>
			</div>

			<div className={styles.heading_body}>Email body</div>
			<div className={styles.subject}>
				<Details
					isBody
					mailData={expenseData}
					vendorName={vendorName}
					category={categoryName}
				/>
			</div>

			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				{!isEmpty(uploadedInvoice) && (
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
				)}
				<div className={styles.button}>
					<Button onClick={() => submitData()} disabled={loading}>
						{loading ? 'Sending...' : 'Send Email'}
					</Button>
				</div>
			</div>
		</div>
	);
}
export default MailTemplate;
