import { Table } from '@cogoport/components';

import useGetScoringConfigs from '../useGetScoringConfigs';

import getListColumnMapping from './get-list-column-mapping';
import styles from './styles.module.css';

function List(props) {
	const { activeActionId } = props;

	const { list } = useGetScoringConfigs();

	const LIST_COLUMN_MAPPING = getListColumnMapping({ activeActionId });

	return (
		<div className={styles.table_container}>
			<Table
				className={styles.scoring_plans_table}
				columns={LIST_COLUMN_MAPPING}
				data={list}
			/>
		</div>
	);
}

export default List;
