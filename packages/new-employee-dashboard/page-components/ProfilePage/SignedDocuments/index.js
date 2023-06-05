import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import ReviewModal from './ReviewModal';
import styles from './styles.module.css';
import ListEmployeeSignedDocuments from './useListEmployeeSignedDocuments';

function SignedDocuments() {
	const onClickViewDocument = (id) => {
		window.open('https://www.africau.edu/images/default/sample.pdf', '_blank');
	};

	const { list, loading: listLoading } = ListEmployeeSignedDocuments();

	const [showModal, setShowModal] = useState(false);

	const columns = getColumns({ onClickViewDocument, setShowModal });

	return (
		<div className={styles.container}>
			<div className={styles.approval_required}>
				Approvals Required:
				<div className={styles.approval_done}>1/5</div>
			</div>

			{(list || []).length > 0 || listLoading
				? <StyledTable columns={columns} data={list} loading={listLoading} />
				: (
					<EmptyState
						flexDirection="column"
						emptyText="No Signed Document to Review"
						textSize={20}
					/>
				)}

			<ReviewModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

export default SignedDocuments;
