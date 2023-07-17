import { Checkbox, Toggle } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({
	onClickCheckbox,
	selectedEmployees,
	onClickHeaderCheckbox,
	identifier_key,
	employee_list,
	level,
	setShow,
	toggleVal,
	selectedEmployeeList = () => {},
	activeTab,
}) => {
	const columns = [
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
						checked={(selectedEmployees[identifier_key] || [])
							.includes(item?.employee_id)}
						onChange={(event) => onClickCheckbox({ event, item, identifier_key })}
					/>
				</div>
			),
		},

		{
			Header   : 'Name',
			accessor : (item) => {
				const isVerticalHead = level === 'functional_manager' || activeTab !== 'vertical_head';
				return (
					<div
						className={styles.employee_name}
						style={{
							cursor         : isVerticalHead ? 'pointer' : 'custom',
							textDecoration : isVerticalHead ? 'underline' : 'custom',
						}}
						role="presentation"
						onClick={isVerticalHead ? () => setShow(item?.employee_id) : null}
					>
						{startCase(item?.employee_name) || startCase(item?.name) || '-'}
					</div>
				);
			},
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
	];

	if (level === 'vertical_head' && activeTab === 'vertical_head') {
		return [...columns, {
			Header   : 'Surprise Gift',
			accessor : (item) => (
				<div className={styles.toggle_container}>
					<Toggle
						size="sm"
						onLabel="Yes"
						offLabel="No"
						onChange={(event) => selectedEmployeeList({ item, event, toggleVal })}
					/>
				</div>
			),
		},
		];
	}
	return columns;
};

export default getColumns;
