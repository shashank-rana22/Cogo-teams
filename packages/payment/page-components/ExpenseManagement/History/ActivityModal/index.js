import { Button, Modal } from '@cogoport/components';
import { getMonth, getDate } from '@cogoport/utils';
import React from 'react';

import { MONTHS } from '../../../../Constants/contants';

import styles from './styles.module.css';

function ActivityModal({ item = {}, onClose = () => {}, show = false }) {
	return (
		<div className={styles.whole_container}>
			<Modal size="xl" show={show} onClose={onClose} placement="center">
				<Modal.Header title="Activity log" />
				<Modal.Body>
					<div className={styles.container}>
						<div className={styles.section}>
							<span className={styles.column1}>Description</span>
							<span className={styles.column2}>{item?.description || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L1 </span>
							<span className={styles.column2}>{item?.level1_approved_by || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L1 Date </span>
							<span className={styles.column2}>
								{item?.level1_approved_on
									? `${MONTHS[getMonth(new Date(item?.level1_approved_on))].label} 
								${getDate(new Date(item?.level1_approved_on))}` : '-'}

							</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L2 </span>
							<span className={styles.column2}>{item?.level2_approved_by || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L2 Date </span>
							<span className={styles.column2}>
								{item?.level2_approved_on
									? `${MONTHS[getMonth(new Date(item?.level2_approved_on))]} 
								${getDate(new Date(item?.level2_approved_on))}` : '-'}

							</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>L1 Remarks </span>
							<span className={styles.column2}>{item?.level1_remarks || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>L2 Remarks </span>
							<span className={styles.column2}>{item?.level2_remarks || '-'}</span>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button}>
						<Button
							size="md"
							type="button"
							onClick={onClose}
						>
							OK
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default ActivityModal;
