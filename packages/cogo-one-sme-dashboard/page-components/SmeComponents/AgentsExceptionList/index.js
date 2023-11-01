import { Pagination, Table, cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import getDummyData from './getDummyData';
import getTableColumns from './getTableColumns';
import styles from './styles.module.css';

const TABLE_TYPES = ['search', 'call', 'mail', 'quotation', 'booking'];

function AgentsExceptionList() {
	const [tableType, setTableType] = useState('search');
	const [page, setPage] = useState(1);
	const tableColumns = getTableColumns() || [];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Agents Exception List
			</div>

			<div className={styles.table_body}>
				<div className={styles.header_bar}>
					{TABLE_TYPES?.map(
						(itm) => (
							<div
								key={itm}
								role="presentation"
								onClick={() => setTableType(itm)}
								className={cl`${styles.table_header} 
                                    ${tableType === itm ? styles.selected_header : ''}`}
							>
								<div className={styles.table_count}>
									{(Math.random() * 100)?.toFixed(0)}
								</div>
								{`Not a Single ${startCase(itm)}`}
							</div>
						),
					)}
				</div>

				<Table
					columns={tableColumns}
					data={getDummyData()}
					layoutType="table"
				/>

				<div className={styles.footer_bar}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={100}
						pageSize={5}
						onPageChange={(val) => setPage(val)}
					/>
				</div>
			</div>
		</div>
	);
}

export default AgentsExceptionList;
