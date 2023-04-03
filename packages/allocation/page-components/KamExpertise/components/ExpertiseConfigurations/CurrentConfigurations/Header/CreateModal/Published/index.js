import { Input, Pill, Table } from '@cogoport/components';
import { format } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const columns = [
	{
		Header   : 'VERSION NAME',
		key      : 'version_number',
		id       : 'version_number',
		accessor : 'version_number',
		Cell     : ({ value }) => (
			<section>
				Version
				{' '}
				{value || ''}
			</section>
		),
	},
	{
		Header   : 'STATUS',
		accessor : 'status',
		Cell     : ({ value }) => {
			const colors = value === 'live' ? 'green' : 'red';
			return (
				<span>
					<Pill className={styles.pill} color={colors}>{value || ''}</Pill>
				</span>
			);
		},

	},
	{
		Header   : 'LAST UPDATED',
		accessor : 'audit_data',
		Cell     : ({ value }) => (
			<section>{value?.updated_at ? format(value?.updated_at, 'dd-MM-YYYY') : ''}</section>
		),
	},

];

function Published({ setSelectedVersion = () => {}, list, versionName, setVersionName }) {
	const table = [];

	list.forEach((element) => {
		if (element.status !== 'draft') {
			table.push(element);
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
				onChange={(value) => { setVersionName(value); }}
			/>

			<Table
				className={styles.table}
				columns={columns}
				data={table}
				selectType="single"
				onRowClick={(row) => setSelectedVersion(row)}
			/>

		</div>

	);
}

export default Published;
