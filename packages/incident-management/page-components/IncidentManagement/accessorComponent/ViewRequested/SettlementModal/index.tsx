import { Table, Textarea, Modal, Button } from '@cogoport/components';
import React, { useState } from 'react';

import getModalColumns from '../getModalColumn';

import styles from './styles.module.css';

function SettlementModal({ itemData }) {
	const [showTdsModal, setShowTdsModal] = useState(false);
	const { type, data } = itemData || {};
	const { settlementRequest } = data || {};
	const { list = [] } = settlementRequest || {};
	const columns = getModalColumns(type);
	return (
		<div>
			<Button size="md" themeType="secondary" onClick={() => { setShowTdsModal(true); }}>View</Button>
			<Modal size="xl" show={showTdsModal} onClose={() => { setShowTdsModal(false); }}>
				<Modal.Header title="Settlement" />
				<Modal.Body>
					<Table data={list} columns={columns} />
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Remark -
						</div>
						<div className={styles.value}>
							Some remark from other side
						</div>
					</div>
					<div className={styles.rate_conatiner}>
						<div className={styles.value}>
							Document -
						</div>
						<div className={styles.value}>
							{itemData?.data?.bankRequest?.documentUrls?.map((url:string) => (url !== '' ? (
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
							placeholder="Enter here..."
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={() => { setShowTdsModal(false); }}>OK</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default SettlementModal;
