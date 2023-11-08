import { Tabs, TabPanel, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from './EmptyState';
import getTableColumns from './getTableColumns';
import styles from './styles.module.css';

function TableView({ loading = false, data = [], setClickedItem = () => {}, setView = () => {} }) {
	const tableColumns = getTableColumns();
	return (
		<div>
			<Tabs activeTab="cogoport_entities">
				<TabPanel name="cogoport_entities" title="COGOPORT ENTITIES">
					<div className={styles.table}>
						{isEmpty(data) ? <EmptyState /> : (
							<Table
								onRowClick={(item) => { setClickedItem(item); setView('details'); }}
								columns={tableColumns}
								data={data}
								loading={loading}
							/>
						)}
					</div>
				</TabPanel>

			</Tabs>
		</div>
	);
}
export default TableView;
