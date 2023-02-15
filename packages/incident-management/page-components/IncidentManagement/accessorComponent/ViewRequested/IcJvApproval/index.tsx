/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-cycle */
import { Table } from '@cogoport/components';
import { Textarea, Modal, Button } from '@cogoport/components';
import getPrice from '@cogoport/forms/utils/get-formatted-price';
import React, { useState } from 'react';

// import StyledTable from '../../../Table';
import getModalColumns from '../getModalColumn';

import styles from './styles.module.css';

function IcJvApproval({ itemData, setRemarks, onSave }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const { type, data, userNotes } = itemData || {};
	const { interCompanyJournalVoucherRequest } = data || {};
	const { list = [], remark, totalCredit, totalDebit, currency } = interCompanyJournalVoucherRequest || {};
	const columns = getModalColumns(type);
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => { setShowTdsModal(true); }}>View</Button>
			<Modal size="xl" show={showTdsModal} onClose={() => { setShowTdsModal(false); }}>
				<Modal.Header title="Inter Company - Journal Voucher" />
				<Modal.Body>
					<div className={styles.rate_conatiner}>
						<div className={styles.current}>
							<div className={styles.rate_label}>
								Debit
							</div>

							<div className={styles.amount_value}>
								<div>{getPrice(totalDebit as number, currency || 'INR' as string)}</div>
							</div>

						</div>
						<div className={styles.requested}>
							<div className={styles.rate_label}>
								Credit
							</div>

							<div className={styles.amount_value}>
								<div>{getPrice(totalCredit as number, currency || 'INR' as string)}</div>
							</div>

						</div>
					</div>

					<div className={styles.rate_conatiner}>
						<Table data={list} columns={columns} />
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Remark -
						</div>
						<div className={styles.value}>
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
					<Button onClick={() => {
						setShowTdsModal(false);
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

export default IcJvApproval;
