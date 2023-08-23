import { Button } from '@cogoport/components';
import { IcMArrowRotateUp, IcMArrowRotateDown, IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetDocument from '../../../hooks/useGetDocuments';
import Documents from '../Documents';

import styles from './styles.module.css';

function Accordian({ setIsOpen, isOpen, itemData }) {
	const [showCheckInvoices, setShowCheckInvoices] = useState({});
	const {
		invoiceNumber = '',
		sid = '',
		status = '',
		billId = '',
		serviceType = '',
		documentUrl = '',
		id = '',
		payrunBillStatus = '',
	} = itemData || {};

	const {
		onGetDocument,
		DocumentData, ApproveReject, onApproveReject,
	} =		useGetDocument({ setShowCheckInvoices, setIsOpen });

	// console.log('DocumentData', DocumentData);
	// const billId = 'n8aj';
	// const services_type = 'FCL_FREIGHT';

	const handleDropdown = (key = invoiceNumber) => {
		setIsOpen(key);
		if (billId) {
			onGetDocument(billId, serviceType);
		}
	};

	// console.log('itemData', itemData);s

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
						{/* {(showCheckInvoices[id] === 'Tagged'
                            || payrunBillStatus === 'APPROVED') && (
                                <TagStyled>
                                    <Icon>
                                        <IcCFtick />
                                    </Icon>
                                    <TextStyled>Tagged</TextStyled>
                                </TagStyled>
            )}
            {(showCheckInvoices[id] === 'Reject'
                            || payrunBillStatus === 'REJECTED') && (
                                <TagStyled>
                                    <Icon>
                                        <IcCFcrossInCircle />
                                    </Icon>
                                    <TextStyled> Rejected </TextStyled>
                                </TagStyled>
            )} */}
						<div className={styles.verified}>
							<IcCFtick />
							<div>
								{status}
							</div>
						</div>
					</div>

					<div className={styles.iconwrapper}>
						{isOpen === invoiceNumber ? (
							<Button
								onClick={() => {
									setIsOpen(null);
								}}
							>
								<IcMArrowRotateUp width={20} height={20} />
							</Button>
						) : (
							<Button
								onClick={() => {
									handleDropdown();
								}}
							>
								<IcMArrowRotateDown width={20} height={20} />
							</Button>
						)}
					</div>
				</div>
			</div>

			{isOpen === invoiceNumber && (
				<Documents
					id={id}
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					documentUrl={documentUrl}
					handleDropdown={handleDropdown}
					setShowCheckInvoices={setShowCheckInvoices}
					DocumentData={DocumentData}
					onApproveReject={onApproveReject}
					ApproveReject={ApproveReject}
					payrunBillStatus={payrunBillStatus}
					showCheckInvoices={showCheckInvoices}
				/>
			)}
		</div>
	);
}

export default Accordian;
