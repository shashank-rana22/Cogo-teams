import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

const MAPPING = {
	topic: {
		label: 'Topic',
	},
	question: {
		label: 'Question',
	},
	question_type: {
		label: 'Question Type',
	},
	difficulty_level: {
		label: 'Difficulty Level',
	},
	students_appeared: {
		label: 'Students IT Appeared For',
	},
	correct_percentage: {
		label: 'Correct Percentage %',
	},
};

function ListHeader({ sortFilter = {}, setSortFilter = () => {} }) {
	return (
		<div className={styles.container}>
			{Object.keys(MAPPING).map((item) => {
				const { label } = MAPPING[item];

				return (
					<div key={item} className={item === 'question' ? styles.section : styles.container_item}>
						<div>{label}</div>

						{['students_appeared', 'correct_percentage'].includes(item) ? (
							<SortComponent
								value={item}
								sortFilter={sortFilter}
								setSortFilter={setSortFilter}
							/>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default ListHeader;
