import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

function ListHeader({ sortFilter = {}, setSortFilter = () => {} }) {
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
						value="students_appeared"
						sortFilter={sortFilter}
						setSortFilter={setSortFilter}
					/>
				</div>

				<div className={styles.small_section_sort}>
					Correct Percentage %

					<SortComponent
						value="correct_percentage"
						sortFilter={sortFilter}
						setSortFilter={setSortFilter}
					/>
				</div>
			</div>
		</div>
	);
}

export default ListHeader;
