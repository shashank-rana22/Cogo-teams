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

			<div className={styles.description}>
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

			<div className={styles.card_display}>
				<div className={styles.card} style={{ width: '38%' }}>
					<div className={styles.card_title}>Course Details</div>
					<div className={styles.card_details}>
						<div>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/resume.png"
								alt="resume.png"
							/>
						</div>
						<div>
							<div>5 Modules</div>
							<div>24 Sub Modules</div>
							<div>50 Chapters</div>
						</div>
						<div>
							<div>1 Graded Test</div>
							<div>4 Practice Tests</div>
							<div><b>Certification</b></div>
						</div>
					</div>
				</div>

				<div className={styles.card} style={{ width: '30%' }}>
					<div className={styles.card_title}>Estimated Completion</div>
					<div className={styles.card_details}>
						<div>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/back_in_time.png"
								alt="resume.png"
							/>
						</div>
						<div>
							<div>
								{data?.course_completion_duration?.course_completion_value}
								&nbsp;
								{data?.course_completion_duration?.course_completion_unit}
							</div>
							<div>24 Sub Modules</div>
							<div>50 Chapters</div>
						</div>
					</div>
				</div>

				<div className={styles.card} style={{ width: '30%' }}>
					<div className={styles.card_title}>Course Creator</div>
					<div className={styles.card_details}>
						<div>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tutor.png"
								alt="resume.png"
							/>
						</div>
						<div>
							<div>Muskan Tushir</div>
							<div>Product analyst</div>
							<div>1+ Years in Logistics industry</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.bottom_box}>
				<div>
					Complete in &nbsp;
					{data?.course_completion_duration?.course_completion_value}
					&nbsp;
					{data?.course_completion_duration?.course_completion_unit}
					&nbsp;to Get Certification
				</div>
				<Pill color="green">On or Before 18th May, 2023</Pill>
			</div>

		</div>
	);
}

export default CourseDetails;
