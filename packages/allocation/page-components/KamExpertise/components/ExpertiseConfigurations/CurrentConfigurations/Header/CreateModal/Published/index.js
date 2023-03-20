import { cl, Pill, Table } from '@cogoport/components';
import React from 'react';
// import { Modal} from '@cogoport/components';

import styles from './styles.module.css';

function Published({ setSelectedVersion = () => {}, version_details }) {
	const data = [];
	Object.keys(version_details).forEach((key) => {
		if (key !== '') {
			data.push({
				version_number : key,
				status         : ` ${version_details[key].status}`,
				updated_at     : `${version_details[key].updated_at}`,
			});
		}
	});

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
					{value || '__'}
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
						<Pill className={styles.pill} color={colors}>{value}</Pill>
					</span>
				);
			},

		},
		{
			Header   : 'LAST UPDATED',
			accessor : 'updated_at',
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
				onRowClick={(row) => { setSelectedVersion(row.version_number); }}
			/>

		</div>

	);
}

export default Published;
