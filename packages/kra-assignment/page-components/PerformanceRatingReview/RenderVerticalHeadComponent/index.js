import { Accordion } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import StyledTable from '../../common/StyledTable';
import getColumns from '../getColumns';

import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data found';

function RenderTitle({ title, averageValue }) {
	return (
		<div className={styles.title}>
			<div>
				{startCase(title)}
			</div>

			<div className={styles.average_value}>
				Average Rating :
				{' '}
				{averageValue}
			</div>
		</div>
	);
}

function RenderStyledTable({
	employee_list,
	identifier_key, setSelectedEmployees,
	onClickCheckbox,
	selectedEmployees,
	onClickHeaderCheckbox,
}) {
	const columns = getColumns({
		setSelectedEmployees,
		onClickCheckbox,
		selectedEmployees,
		identifier_key,
		onClickHeaderCheckbox,
		employee_list,
	});

	return (
		<div>
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
	onClickHeaderCheckbox,
	setAccordianList,
	setSelectedEmployees,
	onClickCheckbox,
	selectedEmployees,
}) {
	return (list || []).map((element) => {
		const { employee_list, key, average_value } = element || {};

		return (
			<div key={key} className={styles.single_accordian}>
				<Accordion
					type="text"
					title={(
						<RenderTitle
							title={key}
							averageValue={average_value}
							employee_list={employee_list}
							setAccordianList={setAccordianList}
						/>
					)}
				>
					<RenderStyledTable
						employee_list={employee_list}
						identifier_key={key}
						setSelectedEmployees={setSelectedEmployees}
						onClickCheckbox={onClickCheckbox}
						selectedEmployees={selectedEmployees}
						onClickHeaderCheckbox={onClickHeaderCheckbox}
					/>
				</Accordion>
			</div>
		);
	});
}

export default RenderVerticalHeadComponent;
