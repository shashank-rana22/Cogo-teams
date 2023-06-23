import { Checkbox } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getColumns = ({
	onClickCheckbox,
	selectedEmployees,
	onClickHeaderCheckbox,
	identifier_key,
	employee_list,
}) => [
	{
		id     : 'select_options',
		Header : (
			<div role="presentation">
				<Checkbox
					checked={(selectedEmployees[identifier_key] || []).length === (employee_list || []).length}
					onChange={(event) => onClickHeaderCheckbox({ event, identifier_key })}
				/>
			</div>
		),
		accessor: (item) => (
			<div>
				<Checkbox
					checked={(selectedEmployees[identifier_key] || []).includes(item?.id)}
					onChange={(event) => onClickCheckbox({ event, item, identifier_key })}
				/>
			</div>
		),
	},
	{
		Header   : 'Name',
		accessor : (item) => (
			<div>
				{startCase(item?.name) || '-'}
			</div>
		),
	},
	{
		Header   : 'Calculated Rating',
		accessor : (item) => (
			<div>
				{startCase(item?.calculated_rating) || '-'}
			</div>
		),
	},
	{
		Header   : 'Revised Rating',
		accessor : (item) => (
			<div>
				{startCase(item?.revised_rating) || '-'}
			</div>
		),
	},
	{
		Header   : 'Final Rating',
		accessor : (item) => (
			<div>
				{startCase(item?.final_rating) || '-'}
			</div>
		),
	},
	{
		Header   : 'Manager',
		accessor : (item) => (
			<div>
				{startCase(item?.manager) || '-'}
			</div>
		),
	},
	{
		Header   : 'HRBP',
		accessor : (item) => (
			<div>
				{startCase(item?.hrbp) || '-'}
			</div>
		),
	},
	{
		Header   : 'Average Rating',
		accessor : (item) => (
			<div>
				{startCase(item?.average_rating) || '-'}
			</div>
		),
	},
	{
		Header   : 'Z-Score',
		accessor : (item) => (
			<div>
				{startCase(item?.z_score) || '-'}
			</div>
		),
	},
	{
		Header   : 'Surprise Gift',
		accessor : (item) => (
			<div>
				{startCase(item?.surprise_gift) || '-'}
			</div>
		),
	},
];

export default getColumns;
