import { Pill, Button } from '@cogoport/components';
import { IcMStarfull, IcMBookmark } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CourseCard({ data = {}, buttonContent = {} }) {
	const { cogo_academy_course = {} } = data;

	const { faq_topics = [], name = '', description = '', course_categories = [] } = cogo_academy_course;

	const {
		secondaryBtnText,
		primaryBtnText,
		icon,
	} = buttonContent;

	return (
		<div className={styles.container}>

			<div className={styles.header}>

				<div className={styles.topics_rating_container}>
					<div className={styles.topics}>
						{faq_topics.map(({ id, display_name }) => (
							<Pill
								key={id}
								size="md"
								color="#EBEBEB"
							>
								{display_name}
							</Pill>
						))}
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
					{course_categories.map(({ id, display_name }) => (
						<p
							key={id}
							className={styles.category_name}
						>
							{display_name}
						</p>
					))}
				</div>

				<h2>{name}</h2>
				<p className={styles.description}>
					{description}
				</p>
			</div>

			<div className={styles.btn_container}>

				<Button size="md" themeType="link">{secondaryBtnText}</Button>
				<Button size="md" themeType="secondary" className={styles.btn}>
					<div className={styles.btn_text}>{primaryBtnText}</div>
					{icon}
				</Button>
			</div>

		</div>
	);
}

export default CourseCard;
