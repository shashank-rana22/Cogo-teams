import React from 'react';

import JobOpenDetailsModal from '../JobOpen/JobOpenDetailsModal';

import styles from './styles.module.css';

function CommonDetailsModal({ setDetailsModal = () => {}, detailsModal = {} }) {
	return (
		<div className={styles.containerDisplay}>
			mayank yadav

			{ detailsModal?.type === 'JOB_OPEN' ? (
				<JobOpenDetailsModal
					row={detailsModal}
					setDetailsModal={setDetailsModal}
				/>
			) : null }

		</div>
	);
}
export default CommonDetailsModal;
