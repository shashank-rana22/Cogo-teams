import { Pill } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CourseDetails({ data }) {
	console.log('data', data);
	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.header_description}>
					<h1 id={styles.bold}>{data?.name}</h1>
					<div>by Muskan Tushir</div>
				</div>
				<div className={styles.header_rating}>
					<IcMStarfull />
					4.4
				</div>
			</div>

			<div>
				<b>About the course:</b>
				{data?.description}
			</div>

			{data?.course_categories?.map((item) => (
				<Pill color="green">
					{item.display_name}
				</Pill>
			))}

			<div className={styles.instructions}>
				<div className={styles.instruction_head}><b>In this course, you will learn (Objectives)</b></div>

				{data?.course_objectives?.map((item, index) => (
					<div>
						{index + 1}
						.&nbsp;
						{ item }
					</div>
				))}
			</div>

			<div className={styles.bottom_box}>
				<div>Complete in 5 weeks to Get Certification</div>
				<Pill color="green">On or Before 18th May, 2023</Pill>
			</div>
		</div>
	);
}

export default CourseDetails;
