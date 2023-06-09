import { Pill, Carousel } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';
import useHandleCourseDetails from './useHandleCourseDetails';

const FIRST_INDEX = 0;

const INDEX_TO_VALUE_DIFF = 1;

function CourseDetails({ data = {}, instructorData = [], viewType = 'normal' }) {
	const {
		MAPPING,
		getModulesCount,
		FormatTime,
		CAROUSELDATA,
	} = useHandleCourseDetails({ instructorData });

	const {
		name = '',
		average_rating = 0,
		description = '',
		course_categories = [],
		course_objectives = [],
		course_stats = {},
		course_modules = [],
		course_completion_rewards_details = [],
		course_completion_duration = {},
		course_content_stats = {},
		course_content_duration_value = 0,
		course_content_duration_unit = '',
	} = data || {};

	const { graded_tests = 0, practice_tests = 0 } = course_stats || {};

	const { video_duration = 0, reading_duration = 0 } = course_content_stats || {};

	const { course_completion_value = 0, course_completion_unit = '' } = course_completion_duration || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.header_description}>
					<h1 className={styles.bold}>{name}</h1>
					{viewType !== 'preview' ? (
						<div>
							by
							{' '}
							{instructorData?.[FIRST_INDEX]?.name}
						</div>
					) : null}
				</div>

				{average_rating
					? (
						<div className={styles.header_rating}>
							<IcMStarfull fill="#000" />
							<span style={{ color: '#000' }}>{average_rating}</span>
						</div>
					)
					: null}
			</div>

			<div className={styles.description}>
				<strong>About the course &nbsp;:&nbsp;</strong>
				{description}
			</div>

			{course_categories?.map((item) => (
				<Pill key={item.id} color="green">
					{item.display_name}
				</Pill>
			))}

			<div className={styles.instructions}>
				<div className={styles.instruction_head}>
					<strong>In this course, you will learn (Objectives)</strong>
				</div>

				{course_objectives?.map((item, index) => (
					<div key={item}>
						{index + INDEX_TO_VALUE_DIFF}
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
							<Image
								width={60}
								height={60}
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/resume.png"
								alt="resume.png"
							/>
						</div>

						<div>
							{Object.entries(MAPPING).map(([key, value]) => {
								const { label, apiKey } = value;

								return (
									<div key={key}>
										<strong>
											{course_stats?.[apiKey]
										|| getModulesCount({ course_modules, type: key })}
										</strong>
										{' '}
										{label}
									</div>
								);
							})}
						</div>

						<div>
							<div>
								{graded_tests}
								&nbsp;Graded Test
							</div>
							<div>
								{practice_tests}
								&nbsp;Practice Tests
							</div>
							<div><strong>{course_completion_rewards_details?.[FIRST_INDEX]}</strong></div>
						</div>
					</div>
				</div>

				<div className={styles.card} style={{ width: '30%' }}>
					<div className={styles.card_title}>Estimated Completion</div>
					<div className={styles.card_details}>
						<div>
							<Image
								width={60}
								height={60}
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/back_in_time.png"
								alt="resume.png"
							/>
						</div>

						<div>
							<div>
								{course_completion_value}
								&nbsp;
								{course_completion_unit}
							</div>

							{!isEmpty(course_content_stats) ? (
								<>
									<FormatTime value={video_duration} type="Videos" />

									<FormatTime value={reading_duration} type="Reading" />
								</>
							) : (
								<>
									{course_content_duration_value}
									{' '}
									{course_content_duration_unit}
									{' '}
									duration
								</>
							)}
						</div>
					</div>
				</div>

				{!isEmpty(instructorData) && !isEmpty(CAROUSELDATA) ? (
					<div className={styles.card} style={{ width: '30%' }}>
						<div className={styles.card_title}>Course Creator</div>
						<div className={styles.card_details}>
							<div>
								<Image
									width={60}
									height={60}
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
