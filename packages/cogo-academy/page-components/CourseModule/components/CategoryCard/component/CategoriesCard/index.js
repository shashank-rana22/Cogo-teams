import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image, useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const TOOLTIP_START_VALUE = 1;

const MIN_TOPICS_LENGTH = 2;

const TOPIC_INDEX_START = 0;

const TOPIC_INDEX_END = 1;

function TooltipContent({ item = [] }) {
	return (
		<div>
			{item.map((tag, i) => {
				if (i >= TOOLTIP_START_VALUE) {
					return <Pill key={tag?.topic_name}>{tag?.topic_name}</Pill>;
				}

				return null;
			})}
		</div>
	);
}

function CategoriesCard({ data = {}, setCurrentCategory }) {
	const router = useRouter();

	const { display_name = '', topics = [], id = '', course_count = 0 } = data;

	return (
		<div
			className={styles.container}
			role="button"
			tabIndex="0"
			onClick={() => {
				setCurrentCategory(id);
				router.push('/learning/course?viewType=all_courses');
			}}
		>
			<div className={styles.title}>{startCase(display_name)}</div>

			<div className={styles.details}>
				<div className={styles.image_box}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.cogo_logo_without_bg}
						alt="cogoport_icon"
						width={40}
						height={40}
					/>

					<div>Academy</div>
				</div>

				<div>
					<div className={styles.pill_box}>
						{topics?.slice(TOPIC_INDEX_START, TOPIC_INDEX_END).map((item) => (
							<Pill
								key={item?.topic_name}
								size="md"
								className={styles.pill}
							>
								{item?.topic_name}
							</Pill>
						))}

						{topics?.length > MIN_TOPICS_LENGTH ? (
							<Tooltip
								content={<TooltipContent item={topics} />}
								placement="right"
								theme="light"
								styles={{ marginBottom: '24px' }}
							>
								<Pill>
									+
									{data.topics.length - TOPIC_INDEX_END}
									{' '}
									Topics
								</Pill>
							</Tooltip>
						)
							: null}
					</div>

					<div className={styles.courses}>
						{course_count}
						{' '}
						Courses
					</div>
				</div>

			</div>

		</div>
	);
}

export default CategoriesCard;
