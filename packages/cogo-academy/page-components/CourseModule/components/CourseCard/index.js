import { Pill, Button, Tooltip, ProgressBar } from '@cogoport/components';
import { IcMStarfull, IcMBookmark } from '@cogoport/icons-react';
import React from 'react';

import useUpdateUserCourse from '../../hooks/useUpdateUserCourse';

import styles from './styles.module.css';

function ToolTipContent({ faq_topics }) {
	return (
		<>
			{(faq_topics || []).map((item, index) => {
				const { id, display_name } = item;

				return (
					index >= 1 ? (
						<Pill
							key={id}
							size="md"
							color="#EBEBEB"
						>
							{display_name}
						</Pill>
					) : null
				);
			})}
		</>
	);
}

function CourseCard({ data = {}, buttonContent = {}, handleClick = () => {} }) {
	const { cogo_academy_course = {}, cogo_academy_course_id : course_id = '', course_progress, state } = data;

	const {
		faq_topics = [],
		name = '',
		description = '',
		course_categories = [],
		thumbnail_url = '',
	} = cogo_academy_course;

	const {
		secondaryBtnText,
		primaryBtnText,
		icon,
	} = buttonContent;

	const { updateUserCourse } = useUpdateUserCourse();

	return (
		<div className={styles.container}>
			<div style={{ backgroundImage: `url(${thumbnail_url})` }} className={styles.header}>
				<div className={styles.topics_rating_container}>
					<div className={styles.topics}>

						{faq_topics.map((topic, index) => {
							if (index > 0 && faq_topics.length > 2) {
								return null;
							}
							const { id, display_name } = topic;
							return (

								<Pill
									key={id}
									size="md"
									color="#EBEBEB"
								>
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
					)
						: null}
				</div>

				<div
					className={data?.is_saved ? styles.saved : styles.save}
					role="button"
					tabIndex="0"
					onClick={() => { updateUserCourse(data?.id, data?.is_saved); }}
				>
					<IcMBookmark
						fill={data?.is_saved ? '#f68b21' : '#000'}
						style={{ marginRight: '6px' }}
					/>

					<div>Save</div>
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

							<div
								key={id}
								className={styles.category_name}
							>
								{display_name}
							</div>
						);
					})}

					{course_categories.length > 2 ? (
						<div
							className={`${styles.category_name} ${styles.more}`}
						>
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

				<h2>{name}</h2>
				<div className={styles.description}>
					{description}
				</div>

				{state === 'ongoing' ? (
					<div>
						<div className={styles.remaining_text}>Remaining</div>
						<ProgressBar progress={course_progress} uploadText=" " />
					</div>
				) : null}

				<div className={styles.btn_container}>
					<Button size="md" themeType="link">{secondaryBtnText}</Button>

					<Button
						size="md"
						themeType="secondary"
						className={styles.btn}
						onClick={() => { handleClick(course_id); }}
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
