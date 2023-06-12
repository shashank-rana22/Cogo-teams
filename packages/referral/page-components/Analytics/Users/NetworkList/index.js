import { Table } from '@cogoport/components';

import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

const ROW_COUNT = 10;

function NetworkList({
	setShowOptions = () => {},
	setShowActivityModal = () => {},
	data = [],
	loading = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Top 10 Networks</div>
			<Table
				columns={TableColumns({
					listType: 'network',
					setShowOptions,
					setShowActivityModal,
				})}
				data={data}
				loadingRowsCount={ROW_COUNT}
				loading={loading}
			/>
		</div>
	);
}
export default NetworkList;
