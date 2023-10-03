import { Button } from '@cogoport/components';
import React from 'react';

import CommonPage from './CommonDetailsModal';
import JobOpenDetailsModal from './JobOpen/JobOpenDetailsModal';
import styles from './styles.module.css';

function CommonDetailsModal({
	setDetailsModal = () => {},
	detailsModal = {},
	refetch = () => {},
}) {
	return (
		<div className={styles.containerDisplay}>
			<Button
				size="md"
				themeType="secondary"
				onClick={() => setDetailsModal(null)}
				className={styles.go_back_button}
			>
				Go Back
			</Button>

			{detailsModal?.type === 'JOB_OPEN' ? (
				<JobOpenDetailsModal
					row={detailsModal}
					setDetailsModal={setDetailsModal}
					refetch={refetch}
				/>
			)
				:			(
					<CommonPage
						header={detailsModal?.type}
						row={detailsModal}
						setDetailsModal={setDetailsModal}
						refetch={refetch}
					/>
				)}

		</div>
	);
}
export default CommonDetailsModal;