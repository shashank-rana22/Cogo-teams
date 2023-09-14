import { Input, Table } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getConfigurationFilterTableColumns from '../../../../../../constants/configuration-filter-table-columns';

import styles from './styles.module.css';

function Published({ setSelectedVersion = () => {}, list, versionName, setVersionName }) {
	const { t } = useTranslation(['allocation']);

	const configurationFilterTableColumns = getConfigurationFilterTableColumns({ t });

	const TABLE_DATA = [];

	list.forEach((element) => {
		if (element.status !== 'draft') {
			TABLE_DATA.push(element);
		}
	});

	return (
		<div className={styles.modal_body}>
			<div className={styles.head_text}>
				{t('allocation:version_to_create_new_draft')}
			</div>

			<div className={styles.supporting_text}>
				{t('allocation:creating_a_new_draft_will_overwrite')}
			</div>

			<Input
				size="sm"
				placeholder={t('allocation:enter_draft_name_placeholder')}
				style={{ marginBottom: '16px' }}
				value={versionName}
				onChange={(value) => setVersionName(value)}
			/>

			<Table
				className={styles.table}
				columns={configurationFilterTableColumns}
				data={TABLE_DATA}
				selectType="single"
				onRowClick={(row) => setSelectedVersion(row)}
			/>

		</div>

	);
}

export default Published;
