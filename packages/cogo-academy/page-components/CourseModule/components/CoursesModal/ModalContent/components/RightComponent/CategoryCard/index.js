import { Pill } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import GET_LINK_MAPPING from '../../../../../../configs/GET_LINK_MAPPING';

import styles from './styles.module.css';

function CategoryCard({ item }) {
	const router = useRouter();

	const { cogo_academy_course = {}, state = 'default' } = item || {};

	const { name, faq_topics = [], id = '' } = cogo_academy_course || {};

	const topicsArr = faq_topics.map((topic) => startCase(topic.name));

	return (
		<div
			role="presentation"
			className={styles.outer_container}
			onClick={() => router.push(GET_LINK_MAPPING({ state, course_id: id }))}
		>
			<div className={styles.container}>
				<div className={styles.title}>{name}</div>

				<div>
					{topicsArr.map((topic, index) => {
						if (index && topicsArr.length > 2) {
							return null;
						}

						return (
							<Pill
								key={topic}
								size="md"
								color="#EBEBEB"
								className={styles.status_pill}
							>
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
