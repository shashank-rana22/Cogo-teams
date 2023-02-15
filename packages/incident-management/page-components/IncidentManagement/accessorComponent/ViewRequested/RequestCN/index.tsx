import { Textarea, Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function RequestCN({ itemData, setRemarks, onSave }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const { data, userNotes } = itemData || {};
	const { creditNoteRequest } = data || {};
	const { documentUrls, invoiceNumber, jobNumber, remark, creditNoteType } = creditNoteRequest || {};
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => { setShowTdsModal(true); }}>View</Button>
			<Modal size="lg" show={showTdsModal} onClose={() => { setShowTdsModal(false); }}>
				<Modal.Header title="Request CN" />
				<Modal.Body>
					<div className={styles.rate_conatiner}>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Shipment ID -
							</div>
							<div className={styles.label}>
								#
								{jobNumber}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								Invoice Number
							</div>
							<div className={styles.label}>
								{invoiceNumber}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								CN Type
							</div>
							<div className={styles.label}>
								{startCase(creditNoteType)}
							</div>
						</div>
						<div className={styles.subcontainer}>
							<div className={styles.value}>
								CN Category
							</div>
							<div className={styles.label}>
								Net
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
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Document -
						</div>
						<div className={styles.value}>
							{documentUrls?.map((url:string) => (url !== '' ? (
								<div className={styles.link}>
									<a href={url} target="_blank" rel="noreferrer">
										document.pdf
									</a>
								</div>
							) : (
								<span>No document available</span>
							)))}
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

export default RequestCN;
