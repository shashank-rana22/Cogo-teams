/* eslint-disable max-len */
import { useState } from 'react';

import StyledTable from '../Dashboard/commons/StyledTable';

import advancedColumn from './Columns/advancedColumn';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';

interface ItemProps {
	activeEntity:string;
}
const list = [
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'Retesh singh',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'Anil Kumar',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'jaiprakash kushwaha',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'Retesh singh',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'Retesh singh',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'jaiprakash kushwaha',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'Retesh singh',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'jaiprakash kushwaha',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'Retesh singh',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'jaiprakash kushwaha',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'Retesh singh',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'jaiprakash kushwaha',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'Retesh singh',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'jaiprakash kushwaha',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
			'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
	{
		incidentNumber : '5425365',
		sidNumber      : '529875',
		entity         : '301',
		businessName   : 'Cogoport private Limited',
		advancedAmount : '20000000000',
		reuestedByName : 'Retesh singh',
		reuestedByDate : '2023-03-08 18:30:00',
		approvedByName : 'jaiprakash kushwaha',
		document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

		],
	},
];
function AdvancePayment({ activeEntity }:ItemProps) {
	const [filters, setFilters] = useState({
		service: undefined,
	});
	const [isSortActive, setIsSortActive] = useState(null);
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<SelectFilters filters={filters} setFilters={setFilters} activeEntity={activeEntity} createButton="createButton" />
			</div>
			<div>
				<StyledTable
					data={list}
					columns={advancedColumn({
						isSortActive,
						setIsSortActive,
						setFilters,
					})}
				/>
			</div>
		</div>
	);
}
export default AdvancePayment;
