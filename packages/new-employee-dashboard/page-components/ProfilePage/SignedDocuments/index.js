import React, { useState } from 'react';

import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import ReviewModal from './ReviewModal';
import styles from './styles.module.css';
import ListEmployeeSignedDocuments from './useListEmployeeSignedDocuments';

function SignedDocuments({ profileData, loading }) {
	const onClickViewDocument = (id) => {
		window.open(id, '_blank');
	};

	const { list } = ListEmployeeSignedDocuments();

	const [showModal, setShowModal] = useState(false);

	const columns = getColumns({ onClickViewDocument, setShowModal });

	return (
		<div className={styles.container}>
			<div className={styles.approval_required}>
				Approvals Required:
				<div className={styles.approval_done}>1/5</div>
			</div>

			<StyledTable
				columns={columns}
				data={list}
			/>

			<ReviewModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

export default SignedDocuments;
