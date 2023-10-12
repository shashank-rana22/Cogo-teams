import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { paymentApprovalColumns } from '../tableconfig';

import styles from './styles.module.css';

function StyledTable({
	apiData = {}, setApiData = () => { },
}) {
	return (
		<div className={styles.table}>
			<Table
				columns={paymentApprovalColumns({ setApiData })}
				data={apiData}
			/>

			{isEmpty(apiData) ? <div className={styles.empty}>No LineItems Found</div> : null}
		</div>

	);
}
export default StyledTable;
