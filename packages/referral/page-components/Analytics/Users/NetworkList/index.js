import { Table } from '@cogoport/components';

import TableColumns from '../List/TableColumn';

import styles from './styles.module.css';

function NetworkList({
	showOptions,
	setShowOptions,
	showActivityModal,
	setShowActivityModal,
	data = [],
}) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Top 10 Networks</div>
			<Table
				columns={TableColumns({
					listType: 'network',
					showOptions,
					setShowOptions,
					showActivityModal,
					setShowActivityModal,
				})}
				data={data}
				loadingRowsCount={10}

			/>
		</div>
	);
}
export default NetworkList;
