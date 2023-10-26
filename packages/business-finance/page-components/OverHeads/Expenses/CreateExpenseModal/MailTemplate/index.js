import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMFileUploader } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import useCreateExpense from '../../hooks/useCreateExpense';
import useCreateExpenseConfig from '../../hooks/useCreateExpenseConfig';
import useGetVendorTradeParties from '../../hooks/useGetVendorTradeParties';

import Details from './Details';
import styles from './styles.module.css';

function MailTemplate({
	mailData = {},
	setShowModal = () => {},
	getList = () => {},
	getRecurringList = () => {},
	createExpenseType = '',
}) {
	const {
		uploadedInvoice,
		vendorName = '-',
		stakeholderEmail,
		categoryName = '-',
		vendorID = '',
	} = mailData || {};

	const splitArray = (uploadedInvoice || '').toString().split('/') || [];
	const filename = splitArray[splitArray.length - 1];

	const {
		vendorTradePartyDataLoading = false,
		vendorTradePartyList: { bank_details = [] } = {},
	} = useGetVendorTradeParties({ organization_id: vendorID });

	const taxNumber = bank_details?.[GLOBAL_CONSTANTS.zeroth_index]?.tax_number;

	const { submitData, loading } = useCreateExpense({
		taxNumber,
		formData: mailData,
		setShowModal,
		getList,
	});
	const { createRecurring, recurringLoading } = useCreateExpenseConfig({
		mailData,
		setShowModal,
		getRecurringList,
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
					<Details text={stakeholderEmail || 'Stakeholder'} />
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
						disabled={loading || recurringLoading || vendorTradePartyDataLoading}
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
