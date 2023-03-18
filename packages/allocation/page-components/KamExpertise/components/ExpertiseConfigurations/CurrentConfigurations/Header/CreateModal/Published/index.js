import { cl, Pill, Table } from '@cogoport/components';
import React from 'react';
// import { Modal} from '@cogoport/components';

import styles from './styles.module.css';

function Published({ setSelectedVersion = () => {} }) {
	const columns = [
		{
			Header   : 'VERSION NAME',
			key      : 'versionName',
			id       : 'versionName',
			accessor : 'versionName',
		},
		{
			Header   : 'STATUS',
			accessor : 'status',
			Cell     : ({ value }) => {
				const colors = value === 'Live' ? 'green' : 'red';
				return (
					<span>
						<Pill className={styles.pill} color={colors}>{value}</Pill>
					</span>
				);
			},

		},
		{
			Header   : 'LAST UPDATED',
			accessor : 'last_updated',
		},

	];
	const data = [
		{
			id           : '6',
			versionName  : 'Version 6',
			last_updated : '22-Sep-2023',
			status       : 'Live',

		},
		{
			id           : '5',
			versionName  : 'Version 5',
			last_updated : '22-Sep-2023',
			status       : 'Expired',

		},
		{
			id           : '4',
			versionName  : 'Version 4',
			last_updated : '22-Sep-2023',
			status       : 'Expired',

		},
		{
			id           : '3',
			versionName  : 'Version 3',
			last_updated : '22-Sep-2023',
			status       : 'Expired',

		},
		{
			id           : '2',
			versionName  : 'Version 3',
			last_updated : '22-Sep-2023',
			status       : 'Expired',

		},
		{
			id           : '1',
			versionName  : 'Version 3',
			last_updated : '22-Sep-2023',
			status       : 'Expired',

		},
		{
			id           : '19',
			versionName  : 'Version 3',
			last_updated : '22-Sep-2023',
			status       : 'Expired',

		},

	];

	return (
		<div className={styles.modal_body}>
			<div className={styles.head_text}>
				b. Please select the version you prefer to use when creating a new draft:
			</div>
			<div className={styles.supporting_text}>
				*Creating a new draft will overwrite the existing saved draft.*
			</div>
			<Table
				// className={styles.table}
				className={cl`
					${styles.table}
				`}
				columns={columns}
				data={data}
				selectType="single"
				onRowClick={(row) => { setSelectedVersion(row.id); }}
			/>

		</div>

	);
}

export default Published;
