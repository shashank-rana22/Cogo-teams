import { Table } from '@cogoport/components';

import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

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
				loadingRowsCount={10}
				loading={loading}

			/>
		</div>
	);
}
export default NetworkList;
