import styles from './styles.module.css';

const MAPPING = {
	question: {
		label     : 'Question',
		className : styles.section,
	},
	question_type: {
		label     : 'Answer Type',
		className : styles.container_item,
	},
	difficulty_level: {
		label     : 'Correct %',
		className : styles.container_item,
	},
};

function Header() {
	return (
		<div className={styles.container}>
			{Object.keys(MAPPING).map((item) => {
				const { label, className } = MAPPING[item];

				return (
					<div key={item} className={className}>
						<div>{label}</div>
					</div>
				);
			})}
		</div>
	);
}

export default Header;
