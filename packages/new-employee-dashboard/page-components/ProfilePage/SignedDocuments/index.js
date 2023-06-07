import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import useListEmployeeSignedDocuments from '../../hooks/useListEmployeeSignedDocuments';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import ReviewModal from './ReviewModal';
import styles from './styles.module.css';

function SignedDocuments() {
	const onClickViewDocument = ({ url }) => {
		window.open(url || 'https://www.africau.edu/images/default/sample.pdf', '_blank');
	};

	const { list = [], loading } = useListEmployeeSignedDocuments();

	const [showModal, setShowModal] = useState(false);

	const columns = getColumns({ onClickViewDocument, setShowModal });

	return (
		<div className={styles.container}>
			{(list || []).length > 0 || loading
				? <StyledTable columns={columns} data={list} loading={loading} />
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
