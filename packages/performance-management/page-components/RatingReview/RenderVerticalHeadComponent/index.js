import { Accordion, Placeholder } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import StyledTable from '../../../common/StyledTable';
import getColumns from '../getColumns';
import usePerformanceRatingReview from '../hooks/usePerformanceRatingReview';

import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data found';

function RenderTitle({ title }) {
	return (
		<div className={styles.title}>
			<div>{startCase(title)}</div>

			{/* {level === 'vertical_head' && activeTab === 'vertical_head' && (
				<div className={styles.average_value}>
					Average Rating :
					{' '}
					{averageValue || 'N/A'}
				</div>
			)} */}
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
	activeTab,

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
	list,
	setAccordianList,
	setSelectedEmployees,
	selectedEmployees,
	level,
	setShow,
	toggleVal,
	setToggleVal,
	activeTab,
	getRatingApiLoading,
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
							activeTab={activeTab}
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
						activeTab={activeTab}

					/>
				</Accordion>
			</div>
		);
	});
}

export default RenderVerticalHeadComponent;
