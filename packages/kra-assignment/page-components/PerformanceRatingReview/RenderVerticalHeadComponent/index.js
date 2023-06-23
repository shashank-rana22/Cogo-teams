import { Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import StyledTable from '../../common/StyledTable';
import getColumns from '../getColumns';

import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data found';

function RenderTitle({ title, averageValue, level }) {
	return (
		<div className={styles.title}>
			<div>
				{startCase(title)}
			</div>

			{
				level === 'vertical_manager' && (
					<div className={styles.average_value}>
						Average Rating :
						{' '}
						{averageValue || '-'}
					</div>
				)
			}

		</div>
	);
}

function RenderStyledTable({
	employee_list,
	identifier_key, setSelectedEmployees,
	onClickCheckbox,
	selectedEmployees,
	onClickHeaderCheckbox,
	level,
}) {
	const columns = getColumns({
		setSelectedEmployees,
		onClickCheckbox,
		selectedEmployees,
		identifier_key,
		onClickHeaderCheckbox,
		employee_list,
		level,
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
	onClickHeaderCheckbox,
	setAccordianList,
	setSelectedEmployees,
	onClickCheckbox,
	selectedEmployees,
	level,
}) {
	return (list || []).map((element) => {
		const { details:employee_list, label, average_value } = element || {};

		return (
			<div key={label} className={styles.single_accordian}>
				<Accordion
					type="text"
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

					/>
				</Accordion>
			</div>
		);
	});
}

export default RenderVerticalHeadComponent;
