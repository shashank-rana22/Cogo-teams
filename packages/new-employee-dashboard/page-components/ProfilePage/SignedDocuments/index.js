import React, { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import useGetEmployeeSignedDocuments from '../../hooks/useGetEmployeeSigningDocuments';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import ReviewModal from './ReviewModal';
import styles from './styles.module.css';

function SignedDocuments() {
	const onClickViewDocument = ({ url }) => {
		window.open(url || 'https://www.africau.edu/images/default/sample.pdf', '_blank');
	};

	const { data:docData, loading } = useGetEmployeeSignedDocuments();

	const { signed_documents = [] } = docData || {};

	const [showModal, setShowModal] = useState(false);

	const columns = getColumns({ onClickViewDocument, setShowModal });

	return (
		<div className={styles.container}>
			<div className={styles.approval_required}>
				Approvals Required:
				<div className={styles.approval_done}>1/5</div>
			</div>

			{(signed_documents || []).length > 0 || loading
				? <StyledTable columns={columns} data={signed_documents} loading={loading} />
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
