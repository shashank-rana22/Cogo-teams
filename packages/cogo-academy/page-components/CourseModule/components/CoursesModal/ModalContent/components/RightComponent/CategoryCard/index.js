import { Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function CategoryCard({ item }) {
	const router = useRouter();
	const { cogo_academy_course = {}, id:course_id } = item || {};

	const { name, faq_topics = [] } = cogo_academy_course || {};

	const topicsArr = faq_topics.map((topic) => startCase(topic.name));

	return (
		<div
			role="presentation"
			className={styles.outer_container}
			onClick={() => router.push(`/learning/course/introduction?course_id=${course_id}`)}
		>
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
