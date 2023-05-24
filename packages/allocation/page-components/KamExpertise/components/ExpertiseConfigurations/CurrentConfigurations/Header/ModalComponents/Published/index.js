import { Input, Table } from '@cogoport/components';

import CONFIGURATION_FILTER_TABLE_COLUMNS from '../../../../../../constants/configuration-filter-table-columns';

import styles from './styles.module.css';

function Published({ setSelectedVersion = () => {}, list, versionName, setVersionName }) {
	const tableData = [];

	list.forEach((element) => {
		if (element.status !== 'draft') {
			tableData.push(element);
		}
	});

	return (
		<div className={styles.modal_body}>
			<div className={styles.head_text}>
				Select the version to create a new draft:
			</div>

			<div className={styles.supporting_text}>
				Creating a new draft will overwrite the existing saved draft.
			</div>

			<Input
				size="sm"
				placeholder="Enter Draft Name"
				style={{ marginBottom: '16px' }}
				value={versionName}
				onChange={(value) => setVersionName(value)}
			/>

			<Table
				className={styles.table}
				columns={CONFIGURATION_FILTER_TABLE_COLUMNS}
				data={tableData}
				selectType="single"
				onRowClick={(row) => setSelectedVersion(row)}
			/>

		</div>

	);
}

export default Published;
