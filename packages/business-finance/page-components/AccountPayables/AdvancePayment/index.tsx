/* eslint-disable max-len */
import { Popover } from '@cogoport/components';
import { useState } from 'react';

import List from '../../commons/List';
// import StyledTable from '../Dashboard/commons/StyledTable';

import { ADVANCE_CONFIG } from './Columns/advanceConfig';
// import advancedColumn from './Columns/advancedColumn';
import useGetAdvancePaymentList from './hooks/useGetAdvancePaymentList';
import AmountWithCurrency from './renderFunction/AmountWithCurrency';
import ApprovedBy from './renderFunction/ApprovedBy';
import IncidentNumber from './renderFunction/IncidentNumber';
import OrganizationName from './renderFunction/OrganizationName';
import RequestedBy from './renderFunction/RequestedBy';
import SIDnumber from './renderFunction/SIDnumber';
import SelectFilters from './SelectFilters';
import styles from './styles.module.css';

interface ItemProps {
	activeEntity:string;
}
// const list = {
// 	list: [
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'Retesh singh',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'Anil Kumar',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'jaiprakash kushwaha',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'Retesh singh',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'Retesh singh',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'jaiprakash kushwaha',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'Retesh singh',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'jaiprakash kushwaha',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'Retesh singh',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'jaiprakash kushwaha',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'Retesh singh',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'jaiprakash kushwaha',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'Retesh singh',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'jaiprakash kushwaha',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',
// 				'https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 		{
// 			incidentNumber : '5425365',
// 			sidNumber      : '529875',
// 			entity         : '301',
// 			businessName   : 'Cogoport private Limited',
// 			advancedAmount : '20000000000',
// 			reuestedByName : 'Retesh singh',
// 			reuestedByDate : '2023-03-08 18:30:00',
// 			approvedByName : 'jaiprakash kushwaha',
// 			document       : ['https://cogoport-testing.sgp1.digitaloceanspaces.com/c58289cbdbc51cdcf53723f40681ed96/documents_60eed33822a8cf49f5001a11_Attendance.pdf',

// 			],
// 		},
// 	],
// };
function AdvancePayment({ activeEntity }:ItemProps) {
	// const [filters, setFilters] = useState({
	// 	service: undefined,
	// });
	const [sort, setSort] = useState({});
	const { filters, setFilters, data, loading } = useGetAdvancePaymentList({ activeEntity, sort });
	const { pageIndex } = data || {};
	const functions = {
		// renderBankDetails: (itemData) => (
		// 	<BankDetails
		// 		itemData={itemData}
		// 		setEditedValue={setEditedValue}
		// 		setEditedTdsValue={setEditedTdsValue}
		// 		payrun_type={payrun_type}
		// 	/>
		// ),
		// renderRemarks: (itemData) => <Remark itemData={itemData} />,
		renderDocument: (itemData) => {
			const { document } = itemData || {};
			const content = document?.map((url:string) => (url !== '' ? (
				<div className={styles.document_number}>
					<a href={url} target="_blank" rel="noreferrer">
						{url?.split('/')?.pop() || '-'}
					</a>
				</div>
			) : (
				<span>No document available</span>
			)));
			return (
				<div className={styles.link}>
					<Popover placement="top" render={content}>
						<>
							{document?.length}
							{' '}
							{' '}
							document
						</>
					</Popover>
				</div>
			);
		},
		// renderTdsEdit: (itemData) => (
		// 	<EditTdsPayrun
		// 		setEditedTdsValue={setEditedTdsValue}
		// 		itemData={itemData}
		// 		setEditeableTds={setEditeableTds}
		// 		setRestTds={setRestTds}
		// 		viewSelectedInvoice={viewSelectedInvoice}
		// 		refetch={refetch}
		// 		setRefetch={setRefetch}
		// 		editKey="tdsValue"
		// 	/>
		// ),
		// renderEditIcon: (itemData) => (
		// 	<EditPayrun
		// 		setEditedValue={setEditedValue}
		// 		itemData={itemData}
		// 		setEditeable={setEditeable}
		// 		setRestValue={setRestValue}
		// 		viewSelectedInvoice={viewSelectedInvoice}
		// 		refetch={refetch}
		// 		setRefetch={setRefetch}
		// 		editKey="payableValue"
		// 	/>
		// ),
		// renderInvoiceDates: (itemData) => <InvoiceDates itemData={itemData} />,
		// remarksRender: (itemData) => <Remark itemData={itemData} overflowDot />,
		renderAmountWithCurrency: (itemData) => (
			<AmountWithCurrency itemData={itemData} />
		),
		renderIncidentNumber: (itemData) => (
			<IncidentNumber itemData={itemData} />
		),
		renderSIDnumber: (itemData) => (
			<SIDnumber itemData={itemData} />
		),
		renderOrganization: (itemData) => (
			<OrganizationName itemData={itemData} />
		),
		renderRequestedBy: (itemData) => (
			<RequestedBy itemData={itemData} />
		),
		renderApprovedBy: (itemData) => (
			<ApprovedBy itemData={itemData} />
		),
	};
	// const [isSortActive, setIsSortActive] = useState(null);

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<SelectFilters
					filters={filters}
					setFilters={setFilters}
					activeEntity={activeEntity}
					createButton="createButton"
				/>
			</div>
			<div className={styles.list}>
				{/* <StyledTable
					data={list}
					columns={advancedColumn({
						isSortActive,
						setIsSortActive,
						setFilters,
					})}
				/> */}
				<List
					itemData={data}
					config={ADVANCE_CONFIG}
					functions={functions}
					loading={loading}
					sort={sort}
					setSort={setSort}
					page={pageIndex}
					pageSize={10}
					handlePageChange={(val: number) => setFilters({
						...filters,
						pageIndex: val,
					})}
					showPagination
				/>
			</div>
		</div>
	);
}
export default AdvancePayment;
