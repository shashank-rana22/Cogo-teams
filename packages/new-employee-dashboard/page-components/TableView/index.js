import { Tabs, TabPanel } from '@cogoport/components';
import React from 'react';

import StyledTable from '../StyledTable';

import styles from './styles.module.css';
import useTableView from './useTableView';

function TableView({ search }) {
	const { columns, loading, list, setActiveTab, activeTab } = useTableView({ search });

	return (
		<div className={styles.container}>
			<div style={{ paddingBottom: 12 }}>

				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
					style={{ marginBottom: 8 }}
				>
					<TabPanel name="active" title="Active" />
					<TabPanel name="inactive" title="Inactive" />
				</Tabs>

				<StyledTable
					columns={columns}
					data={list}
					loading={loading}
				/>
			</div>
		</div>
	);
}

export default TableView;
