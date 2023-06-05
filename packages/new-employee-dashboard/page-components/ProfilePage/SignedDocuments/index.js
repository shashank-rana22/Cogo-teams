import React, { useState } from 'react';

import useGetEmployeeSignedDocuments from '../../hooks/useGetEmployeeSigningDocuments';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import ReviewModal from './ReviewModal';
import styles from './styles.module.css';

function SignedDocuments() {
	const onClickViewDocument = ({ url }) => {
		window.open(url || 'https://www.africau.edu/images/default/sample.pdf', '_blank');
	};

	const { data:docData } = useGetEmployeeSignedDocuments();

	const { signed_documents = [] } = docData || {};

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
				data={signed_documents}
			/>

			<ReviewModal showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

export default SignedDocuments;
