import { Table } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import getColumns from './getColumns';
import styles from './styles.module.css';

function OutstandingAmount({ outstanding_amount_details = [] }) {
	const [showTable, setShowTable] = useState(true);
	const columns = getColumns();

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

			<div className={showTable ? styles.table_view : styles.table_view_closed}>
				<Table columns={columns} data={outstanding_amount_details} loading={false} />
			</div>
		</div>
	);
}

export default OutstandingAmount;
