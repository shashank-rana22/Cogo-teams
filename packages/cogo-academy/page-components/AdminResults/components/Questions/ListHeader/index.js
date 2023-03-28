import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ListHeader({
	sortType = '', setSortType = () => {}, sortBy = '', setSortBy = () => {},

}) {
	const applySorting = (val, typ) => {
		setSortBy(val);
		setSortType(typ);
	};
	const renderTitle = () => (
		<div role="presentation" className={styles.container}>
			<div className={styles.container2}>

				<div className={styles.small_section}>
					Topic

				</div>

				<div className={styles.section}>
					Question
				</div>

				<div className={styles.small_section}>
					Question Type

				</div>

				<div className={styles.small_section}>
					Difficulty Level
				</div>

				<div className={styles.small_section_sort}>
					<div>Students IT Appeared For</div>
					<div>
						{
				(sortBy === 'students_appeared' && sortType === 'desc')
			&& (
				<div className={styles.arrow_up}>
					<IcMArrowRotateUp
						width={12}
						height={12}
						onClick={() => { applySorting('students_appeared', 'asc'); }}
					/>
				</div>
			)
			}
						{
				!(sortBy === 'students_appeared' && sortType === 'desc')
			&& (
				<div className={styles.arrow_up}>
					<IcMArrowRotateDown
						width={12}
						height={12}
						onClick={() => { applySorting('students_appeared', 'desc'); }}
					/>
				</div>
			)
}
					</div>

				</div>

				<div className={styles.small_section_sort}>
					Correct Percentage				%
					{
				(sortBy === 'correct_percentage' && sortType === 'desc')
			&& (
				<div className={styles.arrow_up}>
					<IcMArrowRotateUp
						width={12}
						height={12}
						onClick={() => { applySorting('correct_percentage', 'asc'); }}
					/>
				</div>
			)
			}
					{
				!(sortBy === 'correct_percentage' && sortType === 'desc')
			&& (
				<div className={styles.arrow_up}>
					<IcMArrowRotateDown
						width={12}
						height={12}
						onClick={() => { applySorting('correct_percentage', 'desc'); }}
					/>
				</div>
			)
}
				</div>
			</div>
		</div>
	);
	return (
		<div className={styles.outer_container}>
			{renderTitle()}
		</div>
	);
}

export default ListHeader;
