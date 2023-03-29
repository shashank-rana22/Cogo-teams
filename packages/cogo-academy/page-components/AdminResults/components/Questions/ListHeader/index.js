import SortComponent from '../../../commons/SortComponent';

import styles from './styles.module.css';

const MAPPING = {
	topic: {
		label     : 'Topic',
		className : styles.container_item,
	},
	question: {
		label     : 'Question',
		className : styles.section,
	},
	question_type: {
		label     : 'Question Type',
		className : styles.container_item,
	},
	difficulty_level: {
		label     : 'Difficulty Level',
		className : styles.container_item,
	},
	students_appeared: {
		label     : 'Students IT Appeared For',
		sort      : true,
		className : styles.container_item,
	},
	correct_percentage: {
		label     : 'Correct Percentage %',
		sort      : true,
		className : styles.container_item,
	},
};

function ListHeader({ sortFilter = {}, setSortFilter = () => {} }) {
	return (
		<div className={styles.container}>
			{Object.keys(MAPPING).map((item) => {
				const { label, sort = false, className } = MAPPING[item];

				return (
					<div key={item} className={className}>
						<div>{label}</div>

						{sort ? (
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
