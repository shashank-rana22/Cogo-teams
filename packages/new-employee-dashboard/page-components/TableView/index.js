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
				>
					<TabPanel name="active" title="Active">
						<StyledTable
							columns={columns}
							data={list}
							loading={loading}
						/>
					</TabPanel>

					<TabPanel name="inactive" title="Inactive">
						<StyledTable
							columns={columns}
							data={list}
							loading={loading}
						/>
					</TabPanel>

				</Tabs>

			</div>

		</div>
	);
}

export default TableView;
