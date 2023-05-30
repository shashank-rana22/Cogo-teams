import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CategoryCard({ item }) {
	const { cogo_academy_course = {} } = item;

	const { name, faq_topics = [] } = cogo_academy_course || {};

	const topicsArr = faq_topics.map((topic) => startCase(topic.name));

	return (
		<div className={styles.outer_container}>
			<div className={styles.container}>
				<div className={styles.title}>{name}</div>

				<div>
					{topicsArr.map((topic, index) => {
						if (index > 0 && topicsArr.length > 2) {
							return null;
						}

						return (
							<Pill size="md" color="#EBEBEB" className={styles.status_pill}>
								{topic}
							</Pill>
						);
					})}

					{topicsArr.length > 2 ? (
						<Pill color="#EBEBEB">{`+${topicsArr.length - 1} More`}</Pill>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default CategoryCard;
