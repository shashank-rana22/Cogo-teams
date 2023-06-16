import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyState';
import useListEmployeeSignedDocuments from '../../hooks/useListEmployeeSignedDocuments';
import StyledTable from '../../StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

const onClickViewDocument = ({ url }) => {
	window.open(url || '', '_blank');
};

function SignedDocuments() {
	const { list = [], loading } = useListEmployeeSignedDocuments();

	const columns = getColumns({ onClickViewDocument });

	return (
		<div className={styles.container}>
			{isEmpty(list) || loading
				? <StyledTable columns={columns} data={list} loading={loading} />
				: (
					<EmptyState
						flexDirection="column"
						emptyText="No Signed Document to Review"
						textSize={20}
					/>
				)}
		</div>
	);
}

export default SignedDocuments;
