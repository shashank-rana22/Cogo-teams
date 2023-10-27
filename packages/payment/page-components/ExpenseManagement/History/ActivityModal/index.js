import { Button, Modal, ButtonIcon } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { getMonth, getDate } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

function ActivityModal({ item, onClose, show }) {
	return (
		<div className={styles.whole_container}>
			<Modal size="md" show={show} onClose={onClose} placement="center">
				<Modal.Header title="Activity log" />
				<Modal.Body>
					<div className={styles.container}>
						<div className={styles.section}>
							<span className={styles.column1}>Submitted On</span>
							<span className={styles.column2}>
								{
								`${MONTHS[getMonth(new Date(item?.submitted_on))]} 
								${getDate(new Date(item?.submitted_on))}` || '-'
}
							</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L1 </span>
							<span className={styles.column2}>{item?.level1_approved_by || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L1 Date </span>
							<span className={styles.column2}>{item?.level1_approved_on || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L2 </span>
							<span className={styles.column2}>{item?.level2_approved_by || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Approved by L2 Date </span>
							<span className={styles.column2}>{item?.level2_approved_on || '-'}</span>
						</div>
						<div className={styles.section}>
							<span className={styles.column1}>Attachment</span>
							<span className={styles.column2}>
								<ButtonIcon
									size="xl"
									icon={<IcMDownload />}
									themeType="primary"
									onClick={() => window.open(item?.attachment_url, '_blank')}
								/>
							</span>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.button}>
						<Button
							size="md"
							type="button"
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
