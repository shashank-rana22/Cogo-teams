import { Textarea, Modal, Button } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React from 'react';

import styles from './styles.module.css';

function JournalVoucher({
	itemData, setRemarks, remarks, onSave, showModal, setShowModal, loadingOnSave,
}) {
	const { data, userNotes, status } = itemData || {};
	const { journalVoucherRequest } = data || {};
	const {
		entityCode, tradePartyName, type, category, accMode, currency, amount,
		exchangeRate, ledCurrency, validityDate, remark,
	} = journalVoucherRequest || {};
	return (
		<div>
			{status === 'REJECTED'
				? <Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>View</Button>
				: <Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>View</Button>}
			<Modal size="lg" show={showModal} onClose={() => { setShowModal(false); }}>
				<Modal.Header title="Journal Voucher" />
				<div className={styles.header_conatiner}>
					<div className={styles.sub_header}>
						<div className={styles.value}>
							Entity
						</div>
						<div className={styles.label}>
							{entityCode}
						</div>
					</div>
					<div className={styles.sub_header}>
						<div className={styles.value}>
							Business Partner
						</div>
						<div className={styles.label}>
							{tradePartyName}
						</div>
					</div>
					<div className={styles.sub_header}>
						<div className={styles.value}>
							JV Type
						</div>
						<div className={styles.label}>
							{type}
						</div>
					</div>
					<div className={styles.sub_header}>
						<div className={styles.value}>
							JV Category
						</div>
						<div className={styles.label}>
							{category}
						</div>
					</div>
					<div className={styles.sub_header}>
						<div className={styles.value}>
							JV Mode
						</div>
						<div className={styles.label}>
							{accMode}
						</div>
					</div>
				</div>
				<Modal.Body>
					<div className={styles.rate_conatiner}>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Currency
							</div>
							<div className={styles.label}>
								{currency}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Amount
							</div>
							<div className={styles.label}>
								{getPrice((amount) as number, (currency) as string)}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Exchange Rate
							</div>
							<div className={styles.label}>
								{exchangeRate}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Ledger Currency
							</div>
							<div className={styles.label}>
								{ledCurrency}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Validity Date
							</div>
							<div className={styles.label}>
								{validityDate}
							</div>
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Remark -
						</div>
						<div className={styles.label}>
							{remark}
						</div>
					</div>
					<div className={styles.remarks_style}>
						Notes (only visible to self)
						<Textarea
							name="remarks"
							className={styles.text_area}
							size="lg"
							onChange={(values) => setRemarks(values)}
							placeholder="Enter here..."
							defaultValue={userNotes}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						disabled={!(remarks.length > 0) || loadingOnSave}
						onClick={() => {
							onSave();
						}}
					>
						Save

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default JournalVoucher;
