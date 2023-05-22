import { Pill, Card } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CourseDetailCard() {
	return (
		<div className={styles.container}>

			<div className={styles.header}>

				<div className={styles.topics_rating_container}>
					<div className={styles.topics}>
						<Pill size="md" color="#EBEBEB">Javascript</Pill>
						<Pill size="md" color="#EBEBEB">CSS</Pill>
					</div>

					<div className={styles.rating}>
						{/* <IcMStarfull style={{ marginRight: '6px' }} /> */}
						<p>4.4</p>
					</div>
				</div>

				<div className={styles.save}>
					<svg width="16" height="14" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M0.875 10.0312V1.71875C0.875 1.51875 0.95 1.34375 1.1 1.19375C1.25 1.04375 1.425 0.96875 1.625 0.96875H5.825C5.63333 1.18542 5.48958 1.41667 5.39375 1.6625C5.29792 1.90833 5.25 2.17708 5.25 2.46875C5.25 3.02708 5.42917 3.51458 5.7875 3.93125C6.14583 4.34792 6.59167 4.60208 7.125 4.69375C7.26667 4.71042 7.39167 4.71875 7.5 4.71875C7.60833 4.71875 7.73333 4.71042 7.875 4.69375V10.0312L4.375 8.53125L0.875 10.0312ZM7.125 3.96875V2.84375H6V2.09375H7.125V0.96875H7.875V2.09375H9V2.84375H7.875V3.96875H7.125Z" fill="#221F20" />
					</svg>

					<p>Save</p>
				</div>

				<div className={styles.details}>
					<p className={styles.category_name}>Tech Ops</p>
					<h2>Web Development Basics</h2>
					<p className={styles.course_overview} />
				</div>

			</div>
		</div>
	);
}

export default CourseDetailCard;
