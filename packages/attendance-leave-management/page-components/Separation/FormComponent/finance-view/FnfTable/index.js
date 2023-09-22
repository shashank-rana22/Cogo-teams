import { Table, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../../common/EmptyState';

import styles from './styles.module.css';

function FnfTable({
	columns = [], data = [], loading = false, addParticular = false,
	emptyText = '', onRowClick = () => {}, className = '',
}) {
	if (isEmpty(data) && !loading && !addParticular) {
		return (
			<div style={{ paddingTop: 6, paddingLeft: 6 }}>
				<EmptyState emptyText={emptyText} />
			</div>
		);
	}

	return (
		<section className={cl`${styles.container} ${styles[className]}`}>
			<Table columns={columns} data={data} loading={loading} onRowClick={onRowClick} />
		</section>
	);
}

export default FnfTable;
