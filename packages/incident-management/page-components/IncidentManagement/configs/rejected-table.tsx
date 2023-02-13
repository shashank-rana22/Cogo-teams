import { getByKey, startCase } from '@cogoport/utils';

import ActionRejected from '../accessorComponent/ActionRejected';
import CompanyName from '../accessorComponent/CompanyName';
import Remarks from '../accessorComponent/Remarks';
import StatusName from '../accessorComponent/StatusName';

import SortData from './SortData.tsx';
import styles from './styles.module.css';

const rejectedColumn = ({ isSortActive, setIsSortActive, setGlobalFilters }) => [
	{
		Header   : <div>INCIDENT ID</div>,
		id       : 'referenceId',
		accessor : (row) => (
			<div>
				<div className={styles.referenceId}>
					#
					{getByKey(row, 'referenceId') as string}
				</div>
			</div>
		),
	},
	{
		Header   : <div>COMPANY NAME</div>,
		id       : 'businessName',
		accessor : (row) => (
			<div>
				<CompanyName itemdata={row} />
				{/* <div>
					{getByKey(row, 'data.organization.businessName') as string}
				</div> */}
			</div>
		),
	},
	{
		Header   : <div>REQUEST TYPE</div>,
		id       : 'type',
		accessor : (row) => (

			<div className={styles.request_type}>
				{startCase(getByKey(row, 'type') as string)}
			</div>

		),
	},
	{
		Header   : <div>REJECTED BY & ON</div>,
		id       : 'rejectedBy',
		accessor : (row) => (
			<div>
				<div>
					{startCase(getByKey(row, 'updatedBy') as string)}
				</div>
				<div>
					{/* {format(getByKey(row, 'updatedAt') as Date, 'dd MMM yy', {}, false)} */}
					{getByKey(row, 'updatedAt') as string}
				</div>
			</div>
		),

	},
	{
		Header:
	<div>
		<SortData isSortActive={isSortActive} setIsSortActive={setIsSortActive} setGlobalFilters={setGlobalFilters} />
	</div>,
		id       : 'createdAt',
		accessor : (row) => (
			<div>
				<div>
					{getByKey(row, 'createdAt') as string}
					{/* {format(getByKey(row, 'createdAt') as Date, 'dd MMM yy', {}, false)} */}
				</div>
			</div>
		),
	},
	{
		Header   : 'REMARKS',
		id       : 'remarks',
		accessor : (row) => (
			<div>
				<Remarks itemData={row} />
				{/* {getByKey(row, 'remark') as string} */}
			</div>
		),
	},
	{
		Header   : <div>STATUS</div>,
		id       : 'userIncidentStatus',
		accessor : (row) => (
			<div>
				<div>
					<StatusName itemData={row} />
					{/* {startCase(getByKey(row, 'userIncidentStatus') as string)} */}
				</div>
			</div>
		),
	},

	{
		Header   : '',
		id       : 'action',
		accessor : (row) => (
			<div>
				<ActionRejected itemData={row} />
			</div>
		),

	},

];
export default rejectedColumn;
