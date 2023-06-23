import { Button, Select } from '@cogoport/components';
import { useState } from 'react';

import StyledTable from '../common/StyledTable';

import dummyData from './dummyData';
import getColumns from './getColumns';
import KraModal from './KraModal';
import RenderVerticalHeadComponent from './RenderVerticalHeadComponent';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data found';

const VERTICAL_HEAD_OPTIONS = [
	{
		label : 'All Employees',
		value : 'all_employees',
	},
	{
		label : 'Reporting Manager Wise',
		value : 'reporting_manager_wise',
	},
	{
		label : 'Chapter Wise',
		value : 'chapter_wise',
	},
	{
		label : 'Squad Wise',
		value : 'squad_wise',
	},
];

const FUNCTIONAL_HEAD_OPTIONS = [
	{
		label : 'All Employees',
		value : 'all_employees',
	},
];

function RenderFunctionalHeadComponent({ columns }) {
	return (
		<StyledTable
			columns={columns}
			data={[{}]}
			emptyText={TABLE_EMPTY_TEXT}
		/>
	);
}

function PerformanceRatingReview() {
	const [selectValue, setSelectValue] = useState('');
	const [selectedEmployees, setSelectedEmployees] = useState({});
	const [show, setShow] = useState(false);

	const { main_key, list } = dummyData || {};

	const onClickCheckbox = ({ event, item, identifier_key }) => {
		setSelectedEmployees((previousValue) => {
			let newCheckedValues = {};

			const previousIds = previousValue?.[identifier_key] || [];

			if (event.target?.checked) {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: [...previousIds, item?.id],
				};
			} else {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: previousIds.filter((selectedId) => selectedId !== item?.id),
				};
			}

			return newCheckedValues;
		});
	};

	const onClickHeaderCheckbox = ({ event, identifier_key }) => {
		const { employee_list } = (list || []).find((item) => (item?.key === identifier_key));
		const employeeIds = (employee_list || []).map((employee) => (employee?.id));

		setSelectedEmployees((previousValue) => {
			let newCheckedValues = {};

			if (event.target?.checked) {
				newCheckedValues = { ...previousValue, [identifier_key]: employeeIds };
			} else {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: [],
				};
			}

			return newCheckedValues;
		});
	};
	const columns = getColumns({ setSelectedEmployees, onClickCheckbox, selectedEmployees });

	return (
		<div className={styles.container}>
			<div>
				Performance Rating Review
			</div>

			<Button
				onClick={() => setShow(true)}
			>
				Add
			</Button>

			<div className={styles.button_wrapper}>
				<div className={styles.select_container}>
					<Select
						value={selectValue}
						onChange={setSelectValue}
						options={main_key === 'vertical_head' ? VERTICAL_HEAD_OPTIONS : FUNCTIONAL_HEAD_OPTIONS}
					/>
				</div>

				<Button themeType="secondary">
					Download CSV
				</Button>

			</div>

			{
				main_key === 'vertical_head'
					? (
						<RenderVerticalHeadComponent
							list={list}
							setSelectedEmployees={setSelectedEmployees}
							onClickCheckbox={onClickCheckbox}
							selectedEmployees={selectedEmployees}
							onClickHeaderCheckbox={onClickHeaderCheckbox}
						/>
					)
					: <RenderFunctionalHeadComponent columns={columns} />
			}

			{
				show
					? <KraModal show={show} setShow={setShow} />
					: null
			}
		</div>
	);
}

export default PerformanceRatingReview;
