import { getByKey, startCase } from '@cogoport/utils';

import CompanyName from '../accessorComponent/CompanyName';
import Remarks from '../accessorComponent/Remarks';
import ViewRequested from '../accessorComponent/ViewRequested';

import SortData from './SortData.tsx';
import styles from './styles.module.css';

const approvedColumn = ({ isSortActive, setIsSortActive, setGlobalFilters, reftech }) => [
	{
		Header   : <div>INCIDENT ID</div>,
		id       : 'referenceId',
		accessor : (row) => (
			<div>
				<div className={styles.referenceId}>
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
		Header:
	<div>
		<SortData isSortActive={isSortActive} setIsSortActive={setIsSortActive} setGlobalFilters={setGlobalFilters} />
	</div>,
		id       : 'createdAt',
		accessor : (row) => (
			<div>
				<div>
					{getByKey(row, 'createdAt') as string}
					{/* {format(getByKey(row, 'createdAt') as Date, 'dd-MM-yyyy', {}, false)} */}
				</div>
			</div>
		),
	},
	{
		Header   : <div>APPROVED BY & ON</div>,
		id       : 'updatedAt',
		accessor : (row) => (
			<div>
				<div>
					{startCase(getByKey(row, 'updatedBy') as string)}
				</div>
				<div>
					{getByKey(row, 'updatedAt') as string}
					{/* {format(getByKey(row, 'updatedAt') as Date, 'dd-MM-yyyy', {}, false)} */}
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
		Header   : '',
		id       : 'view',
		accessor : (row) => (
			<div>
				<ViewRequested itemData={row} name="" reftech={reftech} />
			</div>

		),
	},

];
export default approvedColumn;
