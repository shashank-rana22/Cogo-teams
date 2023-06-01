import { Pill, Button, Tooltip } from '@cogoport/components';
import { IcMStarfull, IcMBookmark } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CourseCard({ data = {}, buttonContent = {}, handleClick = () => {} }) {
	const { cogo_academy_course = {}, cogo_academy_course_id : course_id = '' } = data;

	const { faq_topics = [], name = '', description = '', course_categories = [] } = cogo_academy_course;

	const {
		secondaryBtnText,
		primaryBtnText,
		icon,
	} = buttonContent;

	const toolTipContent = (
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

	return (
		<div className={styles.container}>
			<div className={styles.header}>
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
								content={toolTipContent}
								placement="top"
								className={styles.tooltip}
							>
								<Pill color="#EBEBEB">{`+${faq_topics.length - 1} More`}</Pill>
							</Tooltip>

						) : null}

					</div>

					<div className={styles.rating}>
						<IcMStarfull style={{ marginRight: '6px' }} />
						<div>4.4</div>
					</div>
				</div>

				<div className={styles.save}>
					<IcMBookmark fill="#000000" style={{ marginRight: '6px' }} />

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

							<p
								key={id}
								className={styles.category_name}
							>
								{display_name}
							</p>
						);
					})}

					{course_categories.length > 2 ? (
						<p
							className={`${styles.category_name} ${styles.more}`}
						>
							{`+${course_categories.length - 2} More`}
						</p>
					) : null}
				</div>

				<h2>{name}</h2>
				<p className={styles.description}>
					{description}
				</p>

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
