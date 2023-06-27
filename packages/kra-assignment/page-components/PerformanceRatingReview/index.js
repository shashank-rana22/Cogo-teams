import { Button, Select } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useGetEmployeeLevels from './hooks/useGetEmployeeLevels';
import useGetRatingReviewDetails from './hooks/useGetRatingReviewDetails';
import KraModal from './KraModal';
import RenderVerticalHeadComponent from './RenderVerticalHeadComponent';
import styles from './styles.module.css';

function PerformanceRatingReview() {
	const {
		selectOptions,
		selectValue,
		setSelectValue,
		selectedEmployees,
		setSelectedEmployees,
		show,
		setShow,
		level,
	} = useGetEmployeeLevels();

	const { data } = useGetRatingReviewDetails({ selectValue, level });

	console.log('selectedEmployees', selectedEmployees);

	const onClickCheckbox = ({ event, item, identifier_key }) => {
		setSelectedEmployees((previousValue) => {
			let newCheckedValues = {};

			const previousIds = previousValue?.[identifier_key] || [];

			if (event.target?.checked) {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: [...previousIds, item?.employee_id],
				};
			} else {
				newCheckedValues = {
					...previousValue,
					[identifier_key]: previousIds.filter((selectedId) => selectedId !== item?.employee_id),
				};
			}

			return newCheckedValues;
		});
	};

	const onClickHeaderCheckbox = ({ event, identifier_key }) => {
		const { details } = (data || []).find((item) => (item?.label === identifier_key));
		const employeeIds = (details || []).map((employee) => (employee?.employee_id));

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

	const onClickEmployee = (id) => {
		console.log('id', id);
		setShow(id);
	};

	return (
		<div className={styles.container}>
			<div>
				{
				show
					? <KraModal show={show} setShow={setShow} />
					: null
			}
			</div>
			<div>
				Performance Rating Review
			</div>

			<div className={styles.button_wrapper}>
				<div className={styles.select_container}>
					<Select
						value={selectValue}
						onChange={setSelectValue}
						options={selectOptions}
					/>
				</div>

				<Button themeType="secondary">
					<span style={{ paddingRight: 6, display: 'flex', alignItems: 'center' }}>
						<IcMDownload width={14} height={14} />
					</span>
					Download CSV
				</Button>

			</div>

			<RenderVerticalHeadComponent
				list={data}
				setSelectedEmployees={setSelectedEmployees}
				onClickCheckbox={onClickCheckbox}
				selectedEmployees={selectedEmployees}
				onClickHeaderCheckbox={onClickHeaderCheckbox}
				level={level}
				onClickEmployee={onClickEmployee}
			/>

			{show ? <KraModal show={show} setShow={setShow} /> : null}
		</div>
	);
}

export default PerformanceRatingReview;
