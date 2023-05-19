import { Pill } from '@cogoport/components';
import React from 'react';

import StyledTable from '../StyledTable';

import styles from './styles.module.css';

const columns = [
	{
		Header   : 'NAME & EMAIL',
		accessor : (items) => (
			<div className={styles.name_and_email}>
				<div className={styles.name}>Shivam Singh</div>
				shivam.singh@cogoport.com
			</div>
		),
	},
	{
		Header   : 'ROLE',
		accessor : (items) => (
			<div>
				Sr. Product Manager
			</div>
		),
	},
	{
		Header   : 'REPORTING MANAGER',
		accessor : (items) => (
			<div>
				Ankur Varma
			</div>
		),
	},
	{
		Header   : 'DATE OF JOINING',
		accessor : (items) => (
			<div>
				1 June, 2023
			</div>
		),
	},
	{
		Header   : 'PROFILE COMPLETION',
		accessor : (items) => (
			<div>
				<div className={styles.animate}>
					<div className={styles.progress_bar} style={{ width: `${items.progress}%` }}>
						<div className={styles.progress} />
					</div>
				</div>
				shivam
			</div>
		),
	},
	{
		Header   : 'STATUS',
		accessor : (items) => (
			<div>
				<Pill
					size="md"
					color="#fff085"
				>
					In progress
				</Pill>
			</div>
		),
	},
];

function TableView() {
	return (
		<div className={styles.container}>
			<StyledTable
				columns={columns}
				data={[{ progress: 10 }, { progress: 80 }, { progress: 50 }, { progress: 70 }, { progress: 20 }]}
			/>
		</div>
	);
}

export default TableView;
