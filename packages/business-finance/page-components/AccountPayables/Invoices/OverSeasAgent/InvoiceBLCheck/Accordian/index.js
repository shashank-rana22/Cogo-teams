import { Button } from '@cogoport/components';
import { IcMArrowRotateUp, IcMArrowRotateDown, IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import React from 'react';

import useApprovalRejectionDoc from '../../../hooks/useApprovalRejectionDoc';
import useGetDocument from '../../../hooks/useGetDocuments';
import Documents from '../Documents';

import styles from './styles.module.css';

function Accordian({
	setIsOpen = () => {},
	isOpen = false,
	itemData = {},
	showCheckInvoices = {},
	setShowCheckInvoices = () => {},
}) {
	const {
		invoiceNumber = '',
		sid = '',
		billId = '',
		serviceType = '',
		documentUrl = '',
		id = '',
		payrunBillStatus = '',
	} = itemData || {};

	const {
		onGetDocument = () => {},
		documentData = [],
		billsLoading = false,
	} =	useGetDocument();

	const {
		onAprrovalOrRejection = () => {},
		loadingList = false,
	} = useApprovalRejectionDoc({ setShowCheckInvoices, setIsOpen });

	const handleDropdown = (key = invoiceNumber) => {
		setIsOpen(key);
		if (billId) {
			onGetDocument({ id: billId, services: serviceType });
		}
	};

	return (
		<div className={styles.accordian_container}>
			<div className={styles.accordian}>
				<div className={styles.header}>
					<div className={styles.invoice_number}>{invoiceNumber}</div>
					- SID
					<div className={styles.sid_number}>
						#
						{sid}
					</div>
				</div>

				<div className={styles.status}>
					<div className={styles.checkinvoice}>
						{(showCheckInvoices[id] === 'Tagged' || payrunBillStatus === 'APPROVED') ? (
							<div className={styles.verified}>
								<IcCFtick />
								{' '}
								Tagged
							</div>
						) : null}
						{(showCheckInvoices[id] === 'Reject' || payrunBillStatus === 'REJECTED') ? (
							<div className={styles.rejected}>
								<IcCFcrossInCircle />
								{' '}
								Reject
							</div>
						) : null}

					</div>

					<div className={styles.iconwrapper}>
						{isOpen === invoiceNumber ? (
							<Button
								onClick={() => setIsOpen(null)}
							>
								<IcMArrowRotateUp width={20} height={20} />
							</Button>
						) : (
							<Button
								onClick={() => handleDropdown()}
							>
								<IcMArrowRotateDown width={20} height={20} />
							</Button>
						)}
					</div>
				</div>
			</div>

			{isOpen === invoiceNumber ? (
				<Documents
					id={id}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					documentUrl={documentUrl}
					handleDropdown={handleDropdown}
					setShowCheckInvoices={setShowCheckInvoices}
					documentData={documentData}
					billsLoading={billsLoading}
					onAprrovalOrRejection={onAprrovalOrRejection}
					loadingList={loadingList}
					payrunBillStatus={payrunBillStatus}
					showCheckInvoices={showCheckInvoices}
				/>
			) : null}
		</div>
	);
}

export default Accordian;
