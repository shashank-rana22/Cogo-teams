import React from 'react';

import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

function SignedDocuments({ profileData, loading }) {
	const onClickViewDocument = (id) => {
		window.open('www.google.com', '_blank');
	};

	const columns = getColumns({ onClickViewDocument });

	return (
		<div className={styles.container}>
			<div className={styles.approval_required}>
				Approvals Required:
				<div className={styles.approval_done}>1/5</div>
			</div>

			<StyledTable
				columns={columns}
				data={[{ status: 'pending' }, { status: 'Approved' }, { status: 'pending' }, { status: 'Rejected' }]}
			/>
		</div>
	);
}

export default SignedDocuments;
