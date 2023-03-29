import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

function ListHeader({ sortFilter = {}, setSortFilter = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.container_item}>Topic</div>

			<div className={styles.section}>Question</div>

			<div className={styles.container_item}>Question Type</div>

			<div className={styles.container_item}>Difficulty Level</div>

			<div className={styles.container_item}>
				<div>Students IT Appeared For</div>

				<SortComponent
					value="students_appeared"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>

			<div className={styles.container_item}>
				Correct Percentage %

				<SortComponent
					value="correct_percentage"
					sortFilter={sortFilter}
					setSortFilter={setSortFilter}
				/>
			</div>
		</div>
	);
}

export default ListHeader;
