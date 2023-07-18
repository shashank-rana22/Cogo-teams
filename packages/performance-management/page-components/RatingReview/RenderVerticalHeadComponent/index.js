import { Accordion, Placeholder } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import StyledTable from '../../../common/StyledTable';
import getColumns from '../getColumns';
import usePerformanceRatingReview from '../hooks/usePerformanceRatingReview';

import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data found';

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
	activeTab,
	rest,

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
		activeTab,
		rest,

	});

	return (
		<div className={styles.table_wrapper}>
			<StyledTable
				columns={columns}
				data={employee_list}
				emptyText={TABLE_EMPTY_TEXT}
			/>
		</div>

	);
}

function RenderVerticalHeadComponent({
	data,
	setSelectedEmployees,
	selectedEmployees,
	level,
	setShow,
	toggleVal,
	setToggleVal,
	activeTab,
	getRatingApiLoading,
}) {
	const { list, ...rest } = data || {};

	const {
		onClickCheckbox,
		onClickHeaderCheckbox, selectedEmployeeList,
	} = usePerformanceRatingReview({
		setSelectedEmployees,
		data: list,
		toggleVal,
		setToggleVal,
	});

	if (getRatingApiLoading) {
		return (
			<div>
				<Placeholder height="40px" width="100%" style={{ marginBottom: '20px' }} />
				<Placeholder height="40px" width="100%" />
			</div>
		);
	}

	if (isEmpty(list)) {
		return (
			<div className={styles.single_accordian}>
				<EmptyState />
			</div>
		);
	}

	return (list || []).map((element) => {
		const { details: employee_list, label } = element || {};

		return (
			<div key={label} className={styles.single_accordian}>
				<Accordion
					type="text"
					isOpen={label === 'all_employees'}
					title={startCase(label)}
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
						activeTab={activeTab}
						rest={rest}

					/>
				</Accordion>
			</div>
		);
	});
}

export default RenderVerticalHeadComponent;
