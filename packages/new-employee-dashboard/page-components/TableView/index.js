import { Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import StyledTable from '../StyledTable';

import styles from './styles.module.css';

const getColumns = ({ onClickNewJoinerColumn }) => [
	{
		Header   : 'NAME & EMAIL',
		accessor : (item) => (
			<div
				role="presentation"
				className={styles.name_and_email}
				onClick={() => onClickNewJoinerColumn(item?.id)}
			>
				<div className={styles.name}>Shivam Singh</div>
				shivam.singh@cogoport.com
			</div>
		),
	},
	{
		Header   : 'ROLE',
		accessor : (item) => (
			<div>
				Sr. Product Manager
			</div>
		),
	},
	{
		Header   : 'REPORTING MANAGER',
		accessor : (item) => (
			<div>
				Ankur Varma
			</div>
		),
	},
	{
		Header   : 'DATE OF JOINING',
		accessor : (item) => (
			<div>
				1 June, 2023
			</div>
		),
	},
	{
		Header   : 'PROFILE COMPLETION',
		accessor : (item) => (
			<div className={styles.profile_completion}>
				<div className={styles.animate}>
					<div className={styles.progress_bar} style={{ width: `${item.progress}%` }}>
						<div className={styles.progress} />
					</div>
				</div>
				<div>
					{item.progress}
					% complete
				</div>
			</div>
		),
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
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
	const router = useRouter();

	const onClickNewJoinerColumn = (id) => {
		router.push(`/new-employee-dashboard/${id}`, `/new-employee-dashboard/${id}`);
	};

	const columns = getColumns({ onClickNewJoinerColumn });

	return (
		<div className={styles.container}>
			<StyledTable
				columns={columns}
				data={[
					{
						id       : '85cdcf6b-bd52-4fea-b136-12e377c48ecc',
						progress : 95,
					}, { id: 'q1123kj-oouyhb2682h-aad-ad11sdq', progress: 80 },
					{ id: 'w123sdfs-rf23r2ed-22-2d21', progress: 50 }, { id: '123-ewd32e2-d23d-23d2d2d', progress: 70 },
					{ id: 'q1231ewdw-w232ws3rfrbyy-123', progress: 28 }, { id: 'qs1123-877jvvnd-ad123', progress: 20 }]}
				loading={false}
			/>
		</div>
	);
}

export default TableView;
