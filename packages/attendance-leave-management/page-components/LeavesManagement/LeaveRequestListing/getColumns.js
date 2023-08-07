import { startCase } from '@cogoport/utils';

const getColumns = () => [
	{
		Header   : 'LEAVE TYPE',
		accessor : (item) => (
			<div>
				{startCase(item?.leave_type) || '-'}
			</div>
		),
		id: 'leave_type',
	},
	{
		Header   : 'FROM DATE',
		accessor : (item) => (
			<div>
				{item?.from_date || '-'}
			</div>
		),
		id: 'from_date',
	},
	{
		Header   : 'TO DATE',
		accessor : (item) => (
			<div>
				{item?.to_date || '-'}
			</div>
		),
		id: 'to_date',
	},
	{
		Header   : 'TOTAL DAYS',
		accessor : (item) => (
			<div>
				{startCase(item?.total_days) || '-'}
			</div>
		),
		id: 'total_days',
	},
	{
		Header   : 'REMARKS',
		accessor : (item) => (
			<div>
				{startCase(item?.remarks) || '-'}
			</div>
		),
		id: 'remarks',
	},
	{
		Header   : 'APPROVER',
		accessor : (item) => (
			<div>
				{startCase(item?.approver) || '-'}
			</div>
		),
		id: 'approver',
	},
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div>
				{startCase(item?.status) || '-'}
			</div>
		),
		id: 'status',
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (
			<div>
				{startCase(item?.operation_key) || '-'}
			</div>
		),
		id: 'action',
	},

];

export default getColumns;
