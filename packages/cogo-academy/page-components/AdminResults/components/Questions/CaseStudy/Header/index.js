import { Pill } from '@cogoport/components';

import styles from './styles.module.css';

function Header({
	topic = '',
	index = 0,
	difficulty_level = '',
	no_of_questions = '0',
	user_appeared_count = '0',
}) {
	const STATS_MAPPING = {
		topic: {
			title : 'Topic',
			key   : topic,
		},
		difficulty_level: {
			title : 'Difficulty Level',
			key   : difficulty_level,
		},
		no_of_questions: {
			title : 'No of Questions',
			key   : no_of_questions,
		},
		user_appeared_count: {
			title : 'Students it appeared for',
			key   : user_appeared_count,
		},
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Case Study
				{' '}
				{index + 1}
			</div>

			<div className={styles.description}>

				{Object.keys(STATS_MAPPING).map((item) => {
					const { title, key } = STATS_MAPPING[item];

					return (
						<div key={key} className={styles.item_container}>
							<div className={styles.description_heading}>{title}</div>

							<div className={styles.description_content_container}>
								<Pill size="md" color="#F3FAFA">
									{key || '-'}
								</Pill>
							</div>
						</div>
					);
				})}

			</div>
		</div>
	);
}

export default Header;
