import { Pill, Button, Tooltip, ProgressBar } from '@cogoport/components';
import { IcMStarfull, IcMBookmark, IcMFolder, IcCWaitForSometime } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useUpdateUserCourse from '../../hooks/useUpdateUserCourse';

import styles from './styles.module.css';

function ToolTipContent({ faq_topics }) {
	return (
		<>
			{(faq_topics || []).map((item, index) => {
				const { id, display_name } = item;

				return index >= 1 ? (
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
	handleClick = () => {},
	fetchList,
	viewType = '',
}) {
	const router = useRouter();

	const {
		cogo_academy_course = {},
		cogo_academy_course_id: course_id = '',
		user_progress,
		state,
		modules_count = 0,
	} = data;

	const {
		faq_topics = [],
		name = '',
		description = '',
		course_categories = [],
		thumbnail_url = '',
		course_completion_duration = {},
	} = cogo_academy_course;

	const { course_completion_unit, course_completion_value } = course_completion_duration;

	const { secondaryBtnText, primaryBtnText, icon } = buttonContent;

	const { updateUserCourse } = useUpdateUserCourse({ fetchList });

	return (
		<div className={`${styles.container} ${styles[viewType]}`}>
			<div
				style={{ backgroundImage: `url(${thumbnail_url})` }}
				className={styles.header}
			>
				<div className={styles.topics_rating_container}>
					<div className={styles.topics}>
						{faq_topics.map((topic, index) => {
							if (index > 0 && faq_topics.length > 2) {
								return null;
							}
							const { id, display_name } = topic;
							return (
								<Pill key={id} size="md" color="#EBEBEB">
									{display_name}
								</Pill>
							);
						})}

						{faq_topics.length > 2 ? (
							<Tooltip
								interactive
								content={<ToolTipContent faq_topics={faq_topics} />}
								placement="top"
								className={styles.tooltip}
							>
								<Pill color="#EBEBEB">{`+${faq_topics.length - 1} More`}</Pill>
							</Tooltip>
						) : null}
					</div>

					{data?.rating ? (
						<div className={styles.rating}>
							<IcMStarfull style={{ marginRight: '6px' }} fill="#fcdc00" />
							<span style={{ color: '#fcdc00' }}>{data?.rating}</span>
						</div>
					) : null}
				</div>

				<div
					className={data?.is_saved ? styles.saved : styles.save}
					role="button"
					tabIndex="0"
					onClick={() => {
						updateUserCourse(data?.id, data?.is_saved);
					}}
				>
					<div className={data?.is_saved ? styles.saved_div : styles.not_saved}>
						<IcMBookmark
							fill={data?.is_saved ? '#000' : '#fff'}
							style={{ marginRight: '6px' }}
						/>

						<div>{data?.is_saved ? 'Saved' : 'Save'}</div>
					</div>
				</div>
			</div>

			<div className={styles.details}>
				<div className={styles.categories_container}>
					{course_categories.map((topic, index) => {
						if (index > 1 && course_categories.length > 2) {
							return null;
						}
						const { id, display_name } = topic;
						return (
							<div key={id} className={styles.category_name}>
								{display_name}
							</div>
						);
					})}

					{course_categories.length > 2 ? (
						<div className={`${styles.category_name} ${styles.more}`}>
							<Tooltip
								interactive
								content={<ToolTipContent faq_topics={faq_topics} />}
								placement="top"
								className={styles.tooltip}
							>
								{`+${course_categories.length - 2} More`}
							</Tooltip>
						</div>
					) : null}
				</div>

				<div className={styles.title}>{name}</div>
				<div className={styles.description}>{description}</div>

				{state === 'ongoing' ? (
					<div>
						<div className={styles.remaining_text}>
							{100 - Number(user_progress)}
							% Remaining
						</div>
						<ProgressBar progress={user_progress} uploadText=" " />
					</div>
				) : null}

				<div className={styles.info_container}>
					<div className={styles.info}>
						<IcMFolder height={16} width={16} fill="#F68B21" />
						<div style={{ marginLeft: '4px' }}>
							{modules_count}
							{' '}
							Module
							{modules_count === 1 ? '' : 's'}
						</div>
					</div>

					<div style={{ marginLeft: '24px' }} className={styles.info}>
						<IcCWaitForSometime height={16} width={16} fill="#F68B21" />
						<div style={{ marginLeft: '4px' }}>
							{course_completion_value}
							{' '}
							{course_completion_unit}
							{course_completion_value === 1 ? '' : 's'}
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
						themeType="secondary"
						className={styles.btn}
						onClick={() => {
							handleClick(course_id);
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
