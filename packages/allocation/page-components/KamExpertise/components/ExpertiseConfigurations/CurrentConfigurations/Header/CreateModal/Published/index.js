import { Pill, Table } from '@cogoport/components';
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
					<Pill className={styles.pill} color={colors}>{value === 'active' ? 'live' : value}</Pill>
				</span>
			);
		},

	},
	{
		Header   : 'LAST UPDATED',
		accessor : 'updated_at',
		Cell     : ({ value }) => (
			<section>{value ? format(value, 'dd-MM-YYYY') : ''}</section>
		),
	},

];

function Published({ setSelectedVersion = () => {}, list }) {
	const table = [];

	list.forEach((element) => {
		if (element.status !== 'draft') {
			table.push({
				version_number : element?.version_number || '',
				status         : element?.status || '',
				updated_at     : element?.audit_data?.updated_at || '',

			});
		}
	});

	return (
		<div className={styles.modal_body}>
			<div className={styles.head_text}>
				b. Please select the version you prefer to use when creating a new draft:
			</div>

			<div className={styles.supporting_text}>
				Creating a new draft will overwrite the existing saved draft.
			</div>

			<Table
				className={styles.table}
				columns={columns}
				data={table}
				selectType="single"
				onRowClick={(row) => setSelectedVersion(row.version_number)}
			/>

		</div>

	);
}

export default Published;
