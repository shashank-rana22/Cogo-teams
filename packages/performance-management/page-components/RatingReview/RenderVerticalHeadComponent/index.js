import { Accordion } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import StyledTable from '../../../common/StyledTable';
import getColumns from '../getColumns';
import usePerformanceRatingReview from '../hooks/usePerformanceRatingReview';

import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data found';

function RenderTitle({ title, averageValue, level }) {
	return (
		<div className={styles.title}>
			<div>{startCase(title)}</div>

			{level === 'vertical_manager' && (
				<div className={styles.average_value}>
					Average Rating :
					{' '}
					{averageValue || '-'}
				</div>
			)}
		</div>
	);
}

function RenderStyledTable({
	employee_list,
	identifier_key,
	setSelectedEmployees,
	onClickCheckbox,
	selectedEmployees,
	onClickHeaderCheckbox,
	level,
	setShow,
	selectedEmployeeList,
	toggleVal,

}) {
	const columns = getColumns({
		setSelectedEmployees,
		onClickCheckbox,
		selectedEmployees,
		identifier_key,
		onClickHeaderCheckbox,
		employee_list,
		level,
		setShow,
		selectedEmployeeList,
		toggleVal,

	});

	return (
		<StyledTable
			columns={columns}
			data={employee_list}
			emptyText={TABLE_EMPTY_TEXT}
		/>
	);
}

function RenderVerticalHeadComponent({
	list,
	setAccordianList,
	setSelectedEmployees,
	selectedEmployees,
	level,
	setShow,
	toggleVal,
	setToggleVal,

}) {
	const {
		onClickCheckbox,
		onClickHeaderCheckbox, selectedEmployeeList,
	} = usePerformanceRatingReview({
		setSelectedEmployees,
		data: list,
		toggleVal,
		setToggleVal,
	});

	if (isEmpty(list)) {
		return (
			<div className={styles.single_accordian}>
				<EmptyState />
			</div>
		);
	}

	return (list || []).map((element) => {
		const { details:employee_list, label, average_value } = element || {};

		return (
			<div key={label} className={styles.single_accordian}>
				<Accordion
					type="text"
					isOpen={label === 'all_employees'}
					title={(
						<RenderTitle
							title={label}
							averageValue={average_value}
							employee_list={employee_list}
							setAccordianList={setAccordianList}
							level={level}
						/>
					)}
				>
					<RenderStyledTable
						employee_list={employee_list}
						identifier_key={label}
						setSelectedEmployees={setSelectedEmployees}
						onClickCheckbox={onClickCheckbox}
						selectedEmployees={selectedEmployees}
						onClickHeaderCheckbox={onClickHeaderCheckbox}
						level={level}
						setShow={setShow}
						selectedEmployeeList={selectedEmployeeList}

					/>
				</Accordion>
			</div>
		);
	});
}

export default RenderVerticalHeadComponent;
