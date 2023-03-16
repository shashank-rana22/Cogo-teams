import { Table, Textarea, Modal, Button } from '@cogoport/components';
import React from 'react';

import getModalColumns from '../getModalColumn';

import styles from './styles.module.css';

function SettlementModal({
	itemData, setRemarks, remarks, onSave, showModal, setShowModal, loadingOnSave,
}) {
	const { type, data, userNotes, status } = itemData || {};
	const { settlementRequest } = data || {};
	const { list = [], supportingDocUrl, remark } = settlementRequest || {};
	const columns = getModalColumns(type);
	return (
		<div>
			{status === 'REJECTED'
				? <Button size="sm" themeType="tertiary" onClick={() => { setShowModal(true); }}>View</Button>
				: <Button size="md" themeType="secondary" onClick={() => { setShowModal(true); }}>View</Button>}
			<Modal size="xl" show={showModal} onClose={() => { setShowModal(false); }}>
				<Modal.Header title="Settlement" />
				<Modal.Body>
					<Table data={list} columns={columns} />
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Remark -
						</div>
						<div className={styles.value}>
							{remark}
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Document -
						</div>
						<div className={styles.value}>
							{supportingDocUrl?.map((url:string) => (url !== '' ? (
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

export default SettlementModal;
