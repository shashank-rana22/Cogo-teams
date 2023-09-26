import { RatingComponent, Input } from '@cogoport/components';

import styles from './styles.module.css';

const getColumns = ({ rating, setRating, feedback, setFeedback }) => [
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
	},
	{
		Header   : 'RATING',
		accessor : (item) => (
			<RatingComponent
				type="star"
				totalStars={5}
				value={rating?.[item?.id]}
				onChange={(e) => setRating((prev) => ({
					...prev,
					[item?.id]: e,
				}))}
			/>
		),
	},
	{
		Header   : 'FEEDBACK',
		accessor : (item) => (
			<Input
				placeholder="Type here..."
				value={feedback?.[item?.id]}
				onChange={(e) => setFeedback((prev) => ({
					...prev,
					[item?.id]: e,
				}))}
			/>
		),
	},
];

export default getColumns;
