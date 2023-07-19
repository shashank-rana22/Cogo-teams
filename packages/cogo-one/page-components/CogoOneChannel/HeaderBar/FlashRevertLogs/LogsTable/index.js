import { Table, Input, Button, ButtonIcon } from '@cogoport/components';
import { IcMDelete, IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import dummyData from './dummyData';
import getLogsColumns from './getLogsColumns';
import styles from './styles.module.css';

function LogsTable() {
	const [sidQuery, setSidQuery] = useState('');
	const [filtersParams, setFilterParams] = useState({});

	const logColumns = getLogsColumns({ setFilterParams, filtersParams });

	const showClearAllButton = Object.values(filtersParams).some((val) => !!val);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Input
					size="sm"
					value={sidQuery || ''}
					placeholder="Search sid no.."
					className={styles.input_container}
					onChange={setSidQuery}
					prefix={<IcMSearchlight className={styles.search_icon} />}
					suffix={sidQuery && (
						<ButtonIcon
							size="sm"
							icon={<IcMDelete />}
							disabled={false}
							themeType="primary"
							onClick={() => setSidQuery('')}
						/>
					)}
				/>
				{showClearAllButton && (
					<Button
						size="sm"
						themeType="tertiary"
						className={styles.button_container}
					>
						Clear All
					</Button>
				)}
			</div>

			<Table
				columns={logColumns}
				data={dummyData}
				layoutType="table"
			/>
		</div>
	);
}

export default LogsTable;
