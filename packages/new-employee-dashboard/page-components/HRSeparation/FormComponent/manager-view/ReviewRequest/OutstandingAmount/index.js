import { Table } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import getColumns from './getColumns';
import styles from './styles.module.css';

function OutstandingAmount({ outstanding_amount_details = [] }) {
	const [showTable, setShowTable] = useState(true);
	const columns = getColumns();

	const outstanding = !isEmpty(outstanding_amount_details) ? outstanding_amount_details : [{}];

	return (
		<div className={styles.container}>
			<div
				role="presentation"
				className={styles.label}
				onClick={() => setShowTable(!showTable)}
			>
				Outstanding Amount Details
				<IcMArrowDown
					width={16}
					height={16}
					style={{ marginRight: 4 }}
					className={showTable ? styles.caret_active : styles.caret_arrow}
				/>
			</div>

			{showTable ? (
				<div className={styles.table_view}>
					<Table columns={columns} data={outstanding} loading={false} />
				</div>
			) : null}
		</div>
	);
}

export default OutstandingAmount;
