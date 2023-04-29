import { format, getByKey, startCase } from '@cogoport/utils';

import CompanyName from '../accessorComponent/CompanyName';
import DateName from '../accessorComponent/DateName';
import Remarks from '../accessorComponent/Remarks';
import ViewRequested from '../accessorComponent/ViewRequested';

import SortData from './SortData.tsx';
import styles from './styles.module.css';

interface PropsType {
	isSortActive:string;
	setIsSortActive:Function;
	setGlobalFilters:Function;
	refetch:Function;
}

const approvedColumn = ({ isSortActive, setIsSortActive, setGlobalFilters, refetch }:PropsType) => [
	{
		Header   : <div>INCIDENT ID</div>,
		id       : 'referenceId',
		accessor : (row) => (
			<div>
				<div className={styles.reference_id}>
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
		accessor : (row) => {
			const { createdAt } = row;
			return (
				<div>
					{format(createdAt, 'dd MMM YYYY', {}, false)}
					<div>{format(createdAt, 'hh:mm a', {}, false)}</div>
				</div>
			);
		},
	},
	{
		Header   : <div>APPROVED BY & ON</div>,
		id       : 'updatedAt',
		accessor : (row) => (
			<div>
				<DateName itemData={row} />
			</div>
		),
	},

	{
		Header   : 'REMARKS',
		id       : 'remarks',
		accessor : (row) => (
			<div>
				<Remarks itemData={row} />
			</div>
		),
	},

	{
		Header   : '',
		id       : 'view',
		accessor : (row) => (
			<div>
				<ViewRequested itemData={row} name="" refetch={refetch} />
			</div>

		),
	},

];
export default approvedColumn;
