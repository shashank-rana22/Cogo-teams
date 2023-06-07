import { Pill, Carousel } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';

import styles from './styles.module.css';
import useHandleCourseDetails from './useHandleCourseDetails';

function CourseDetails({ data, instructorData = [], viewType = 'normal' }) {
	const {
		MAPPING,
		getModulesCount,
		FormatTime,
		CAROUSELDATA,
	} = useHandleCourseDetails({ instructorData });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_description}>
					<h1 id={styles.bold}>{data?.name}</h1>
					{viewType !== 'preview' ? (
						<div>
							by
							{' '}
							{instructorData?.[0]?.name}
						</div>
					) : null}
				</div>

				{data?.average_rating
					? (
						<div className={styles.header_rating}>
							<IcMStarfull fill="#000" />
							<span style={{ color: '#000' }}>{data?.average_rating}</span>
						</div>
					)
					: null}
			</div>

			<div className={styles.description}>
				<b>About the course &nbsp;:&nbsp;</b>
				{data?.description}
			</div>

			{data?.course_categories?.map((item) => (
				<Pill key={item.id} color="green">
					{item.display_name}
				</Pill>
			))}

			<div className={styles.instructions}>
				<div className={styles.instruction_head}><b>In this course, you will learn (Objectives)</b></div>

				{data?.course_objectives?.map((item, index) => (
					<div key={item}>
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
							{Object.entries(MAPPING).map(([key, value]) => {
								const { label, apiKey } = value;

								return (
									<div key={key}>
										{data?.course_stats?.[apiKey]
										|| getModulesCount({ course_modules: data?.course_modules, type: 'modules' })}
										{label}
									</div>
								);
							})}
						</div>

						<div>
							<div>
								{data?.course_stats?.graded_tests}
								&nbsp;Graded Test
							</div>
							<div>
								{data?.course_stats?.practice_tests}
								&nbsp;Practice Tests
							</div>
							<div><b>{data?.course_completion_rewards_details?.[0]}</b></div>
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
								{data?.course_completion_duration?.course_completion_value}
								&nbsp;
								{data?.course_completion_duration?.course_completion_unit}
							</div>

							{viewType !== 'preview' ? (
								<>
									<FormatTime value={data?.course_content_stats?.video_duration} type="Videos" />

									<FormatTime value={data?.course_content_stats?.reading_duration} type="Reading" />
								</>
							) : (
								<>
									{data?.course_content_duration_value}
									{' '}
									{data?.course_content_duration_unit}
									{' '}
									duration
								</>
							)}
						</div>
					</div>
				</div>

				{viewType !== 'preview' ? (
					<div className={styles.card} style={{ width: '30%' }}>
						<div className={styles.card_title}>Course Creator</div>
						<div className={styles.card_details}>
							<div>
								<img
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tutor.png"
									alt="resume.png"
								/>
							</div>
							<div className={styles.carasol}>
								<Carousel
									slides={CAROUSELDATA}
									itemsToShow={1}
									itemsToScroll={1}
									showDots={false}
									showArrow
								/>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default CourseDetails;
