import { format, getByKey, startCase } from '@cogoport/utils';

import ActionRejected from '../accessorComponent/ActionRejected';
import ClickableIncidentId from '../accessorComponent/ClickableIncidentId';
import CompanyName from '../accessorComponent/CompanyName';
import DateName from '../accessorComponent/DateName';
import Remarks from '../accessorComponent/Remarks';
import StatusName from '../accessorComponent/StatusName';

import SortData from './SortData.tsx';
import styles from './styles.module.css';

interface PropsType {
	isSortActive:string;
	setIsSortActive:Function;
	setGlobalFilters:Function;
	refetch:Function;
	setActiveTab:Function;
	setPayload:Function;
}

const rejectedColumn = ({
	isSortActive, setIsSortActive,
	setGlobalFilters, refetch, setActiveTab, setPayload,
}:PropsType) => [
	{
		Header   : <div>INCIDENT ID</div>,
		id       : 'referenceId',
		accessor : (row) => (
			<ClickableIncidentId itemData={row} setActiveTab={setActiveTab} setPayload={setPayload} />
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
		Header   : <div>REJECTED BY & ON</div>,
		id       : 'rejectedBy',
		accessor : (row) => (
			<div>
				<DateName itemData={row} />
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
		Header   : 'REMARKS',
		id       : 'remarks',
		accessor : (row) => (
			<div>
				<Remarks itemData={row} />
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
				</div>
			</div>
		),
	},

	{
		Header   : '',
		id       : 'action',
		accessor : (row) => (
			<div>
				<ActionRejected itemData={row} refetch={refetch} />
			</div>
		),

	},

];
export default rejectedColumn;
