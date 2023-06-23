import { Checkbox } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getColumns = ({
	onClickCheckbox,
	selectedEmployees,
	onClickHeaderCheckbox,
	identifier_key,
	employee_list,
	level,
}) => {
	const a = [
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
						checked={(selectedEmployees[identifier_key] || []).includes(item?.employee_id)}
						onChange={(event) => onClickCheckbox({ event, item, identifier_key })}
					/>
				</div>
			),
		},
		{
			Header   : 'Name',
			accessor : (item) => (
				<div>
					{startCase(item?.employee_name) || '-'}
				</div>
			),
		},
		{
			Header   : 'Calculated Rating',
			accessor : (item) => (
				<div>
					{startCase(item?.system_rating) || '-'}
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
					{startCase(item?.reporting_manager_name) || '-'}
				</div>
			),
		},
		{
			Header   : 'HRBP',
			accessor : (item) => (
				<div>
					{startCase(item?.hrbp_name) || '-'}
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
	];

	if (level === 'vertical_manager') {
		return [...a, {
			Header   : 'Surprise Gift',
			accessor : (item) => (
				<div>
					{startCase(item?.surprise_gift) || '-'}
				</div>
			),
		}];
	}
	return a;
};

export default getColumns;
