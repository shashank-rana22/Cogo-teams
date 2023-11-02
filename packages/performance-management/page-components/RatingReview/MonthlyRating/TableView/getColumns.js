import { RatingComponent, Input, Button, Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

const getColumns = ({
	rating, setRating, feedback, setFeedback, props, handleAllSelect,
	handleSelectId, selectedEmployees, list, handleRatingUpdate,
}) => {
	const isVerticalHead = props?.level === 'vertical_head' && props?.activeTab === 'vertical_head';
	const ishrbp = props?.activeTab === 'hrbp_view';

	const columns = [
		{
			Header   : 'NAME',
			accessor : (item) => (
				<div>
					<div className={styles.table_name}>
						{item?.name || '-'}
						{item?.employee_code ? ` (${item?.employee_code})` : ''}
					</div>
					<div className={styles.table_employee_detail}>
						{item?.designation}
						{item?.office_location ? <div className={styles.table_dot} /> : null}
						{item?.office_location}
					</div>
				</div>
			),
			id: 'name',
		},
		{
			Header   : 'RATING',
			accessor : (item) => (
				<RatingComponent
					type="star"
					totalStars={5}
					value={rating?.[item?.id]?.value}
					onChange={(e) => setRating((prev) => ({
						...prev,
						[item?.id]: { value: e },
					}))}
					disabled={rating?.[item?.id]?.disabled && !isVerticalHead}
				/>
			),
			id: 'rating',
		},
		{
			Header   : 'FEEDBACK',
			accessor : (item) => (
				<Input
					placeholder="Type here..."
					value={feedback?.[item?.id]?.value}
					onChange={(e) => setFeedback((prev) => ({
						...prev,
						[item?.id]: { value: e },
					}))}
					disabled={feedback?.[item?.id]?.disabled && !isVerticalHead}
				/>
			),
			id: 'feedback',
		},
	];

	const checkboxCol = {
		Header: <Checkbox
			checked={list.length === selectedEmployees.length}
			onChange={(e) => handleAllSelect(e)}
		/>,
		accessor: (item) => (
			<Checkbox
				checked={selectedEmployees.some((val) => val.id === item.id)}
				onChange={(e) => handleSelectId(e, item)}
			/>
		),
		id: 'select_all',
	};

	const actionCol = {
		Header   : 'Action',
		accessor : (item) => (
			<Button onClick={() => handleRatingUpdate(item)}>Update</Button>
		),
		id: 'updated_employee',
	};

	const managerCol = {
		Header   : 'Manager',
		accessor : (item) => (
			<div className={styles.table_name}>
				{item?.manager_name || '-'}
			</div>
		),
		id: 'manager_name',
	};

	if (isVerticalHead) {
		return [checkboxCol, ...columns, managerCol, actionCol];
	}
	if (ishrbp) {
		return [...columns, managerCol];
	}
	return columns;
};

export default getColumns;
