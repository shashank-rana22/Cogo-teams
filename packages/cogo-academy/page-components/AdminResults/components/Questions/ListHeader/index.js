import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

function ListHeader({
	sortType = '', setSortType = () => {}, sortBy = '', setSortBy = () => {},

}) {
	return (
		<div className={styles.container}>
			<div className={styles.container2}>
				<div className={styles.small_section}>Topic</div>

				<div className={styles.section}>Question</div>

				<div className={styles.small_section}>Question Type</div>

				<div className={styles.small_section}>Difficulty Level</div>

				<div className={styles.small_section_sort}>
					<div>Students IT Appeared For</div>

					<SortComponent
						val="students_appeared"
						sortBy={sortBy}
						sortType={sortType}
						setSortBy={setSortBy}
						setSortType={setSortType}
					/>
				</div>

				<div className={styles.small_section_sort}>
					Correct Percentage %

					<SortComponent
						val="correct_percentage"
						sortBy={sortBy}
						sortType={sortType}
						setSortBy={setSortBy}
						setSortType={setSortType}
					/>
				</div>
			</div>
		</div>
	);
}

export default ListHeader;
