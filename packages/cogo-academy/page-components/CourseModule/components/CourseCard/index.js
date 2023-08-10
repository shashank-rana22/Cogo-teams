import { Pill, Button, Tooltip, ProgressBar } from '@cogoport/components';
import { IcMStarfull, IcMBookmark, IcMFolder, IcCWaitForSometime } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import GET_LINK_MAPPING from '../../configs/GET_LINK_MAPPING';
import useUpdateUserCourse from '../../hooks/useUpdateUserCourse';
import toFixed from '../../utils/toFixed';

import styles from './styles.module.css';

const MAXIMUM_PROGRESS_PRECENTAGE = 100;

const MAX_ITEMS_TO_SHOW = 2;

const ROUND_OF_DIGITS = 2;

const SINGULAR_VALUE = 1;

function ToolTipContent({ faq_topics = [] }) {
	return (
		<>
			{faq_topics.map((item, index) => {
				const { id, display_name } = item;

				return index >= SINGULAR_VALUE ? (
					<Pill key={id} size="md" color="#EBEBEB">
						{display_name}
					</Pill>
				) : null;
			})}
		</>
	);
}

function CourseCard({
	data = {},
	buttonContent = {},
	fetchList,
	viewType = '',
}) {
	const router = useRouter();

	const {
		cogo_academy_course = {},
		cogo_academy_course_id: course_id = '',
		user_progress = 0,
		state,
		modules_count = 0,
		average_rating = 0,
		is_saved = false,
	} = data || {};

	const {
		faq_topics = [],
		name = '',
		description = '',
		course_categories = [],
		thumbnail_url = '',
		course_completion_duration = {},
	} = cogo_academy_course || {};

	const { course_completion_unit, course_completion_value } = course_completion_duration;

	const { secondaryBtnText, primaryBtnText, icon } = buttonContent;

	const { updateUserCourse } = useUpdateUserCourse({ fetchList });

	const finalUserProgress = Math.min(user_progress, MAXIMUM_PROGRESS_PRECENTAGE);

	return (
		<div className={`${styles.container} ${styles[viewType]}`}>
			<div
				style={{ backgroundImage: `url(${thumbnail_url})` }}
				className={styles.header}
			>
				<div className={styles.topics_rating_container}>
					<div className={styles.topics}>
						{faq_topics.map((topic, index) => {
							if (index && faq_topics.length > MAX_ITEMS_TO_SHOW) {
								return null;
							}

							const { id, display_name } = topic;
							return (
								<Pill key={id} size="md" color="#EBEBEB">
									{display_name}
								</Pill>
							);
						})}

						{faq_topics.length > MAX_ITEMS_TO_SHOW ? (
							<Tooltip
								interactive
								content={<ToolTipContent faq_topics={faq_topics} />}
								placement="top"
								className={styles.tooltip}
							>
								<Pill color="#EBEBEB">{`+${faq_topics.length - SINGULAR_VALUE} More`}</Pill>
							</Tooltip>
						) : null}
					</div>

					{average_rating ? (
						<div className={styles.rating}>
							<IcMStarfull style={{ marginRight: '6px' }} fill="#fcdc00" />
							<span style={{ color: '#fcdc00' }}>{average_rating}</span>
						</div>
					) : null}
				</div>

				<div
					className={is_saved ? styles.saved : styles.save}
					role="button"
					tabIndex="0"
					onClick={() => {
						updateUserCourse({ course_user_mapping_id: data?.id, saved: is_saved });
					}}
				>
					<div className={is_saved ? styles.saved_div : styles.not_saved}>
						<IcMBookmark
							fill={is_saved ? '#000' : '#fff'}
							style={{ marginRight: '6px' }}
						/>

						<div>{is_saved ? 'Saved' : 'Save'}</div>
					</div>
				</div>
			</div>

			<div className={styles.details}>
				<div className={styles.categories_container}>
					{course_categories.map((topic, index) => {
						if (index > SINGULAR_VALUE && course_categories.length > MAX_ITEMS_TO_SHOW) {
							return null;
						}
						const { id, display_name } = topic;
						return (
							<div key={id} className={styles.category_name}>
								{display_name}
							</div>
						);
					})}

					{course_categories.length > MAX_ITEMS_TO_SHOW ? (
						<div className={`${styles.category_name} ${styles.more}`}>
							<Tooltip
								interactive
								content={<ToolTipContent faq_topics={faq_topics} />}
								placement="top"
								className={styles.tooltip}
							>
								{`+${course_categories.length - MAX_ITEMS_TO_SHOW} More`}
							</Tooltip>
						</div>
					) : null}
				</div>

				<div className={styles.title}>{name}</div>
				<div className={styles.description}>{description}</div>

				<div className={styles.additional_content}>
					{state === 'ongoing' ? (
						<>
							<div className={styles.remaining_text}>
								{toFixed(MAXIMUM_PROGRESS_PRECENTAGE - Number(finalUserProgress), ROUND_OF_DIGITS)}
								% Remaining
							</div>
							<ProgressBar progress={toFixed(finalUserProgress, ROUND_OF_DIGITS)} uploadText=" " />
						</>
					) : null}

					<div className={styles.info_container}>
						<div className={styles.info}>
							<IcMFolder height={16} width={16} fill="#F68B21" />
							<div style={{ marginLeft: '4px' }}>
								{modules_count}
								{' '}
								Module
								{modules_count === SINGULAR_VALUE ? '' : 's'}
							</div>
						</div>

						<div style={{ marginLeft: '24px' }} className={styles.info}>
							<IcCWaitForSometime height={16} width={16} fill="#F68B21" />
							<div style={{ marginLeft: '4px' }}>
								{course_completion_value}
								{' '}
								{course_completion_unit}
								{course_completion_value === SINGULAR_VALUE ? '' : 's'}
							</div>
						</div>
					</div>
				</div>

				<div className={styles.btn_container}>
					<Button
						size="md"
						themeType="link"
						type="button"
						onClick={() => router.push(
							`/learning/course/introduction?course_id=${course_id}&viewType=curriculum`,
						)}
					>
						{secondaryBtnText}
					</Button>

					<Button
						size="md"
						type="button"
						themeType="secondary"
						className={`${styles.btn} primary_button`}
						onClick={() => {
							router.push(GET_LINK_MAPPING({ state, course_id }));
						}}
					>
						<div className={styles.btn_text}>{primaryBtnText}</div>
						{icon}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
