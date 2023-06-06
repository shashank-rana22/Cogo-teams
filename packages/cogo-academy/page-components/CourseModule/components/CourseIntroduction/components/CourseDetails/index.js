import { Pill, Carousel } from '@cogoport/components';
import { IcMStarfull } from '@cogoport/icons-react';

import styles from './styles.module.css';

const formatTime = (time, type) => (
	<div>
		{Math.floor(time / 60)}
		&nbsp;
		<b>Hour</b>
		&nbsp;
		{(time % 60)}
		&nbsp;
		<b>Min</b>
		&nbsp;
		{type}
	</div>
);

const getModulesCount = ({ course_modules = [], type }) => {
	if (type === 'modules') {
		return course_modules.length;
	}

	if (type === 'sub_modules') {
		let finalValue = 0;

		course_modules.forEach((item) => {
			finalValue += (item.course_sub_modules || []).length;
		});

		return finalValue;
	}

	let chaptersCount = 0;

	course_modules.forEach((modules) => {
		const { course_sub_modules = [] } = modules || {};

		course_sub_modules.forEach((subModule) => {
			chaptersCount += (subModule.course_sub_module_chapters || []).length;
		});
	});

	return chaptersCount;
};

function CourseDetails({ data, instructorData = [], viewType = 'normal' }) {
	const CAROUSELDATA = instructorData?.map((item, index) => ({
		key    : `${index}${JSON.stringify(item)}`,
		render : () => (
			<div>
				<div className={styles.box}>{item.name}</div>
				<div className={styles.box}>{item.mobile_number}</div>
				<div className={styles.box}>{item.email}</div>
			</div>
		),
	}));

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
							<IcMStarfull fill="#fcdc00" />
							<span style={{ color: '#fcdc00' }}>{data?.average_rating}</span>
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
							<div>
								{data?.course_stats?.modules_count
								|| getModulesCount({ course_modules: data?.course_modules, type: 'modules' })}
								&nbsp;Modules
							</div>
							<div>
								{data?.course_stats?.sub_modules_count
								|| getModulesCount({ course_modules: data?.course_modules, type: 'sub_modules' })}
								&nbsp;Sub Modules
							</div>
							<div>
								{data?.course_stats?.course_sub_module_chapters_count
								|| getModulesCount({ course_modules: data?.course_modules, type: 'chapters' })}
								&nbsp;Chapters
							</div>
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

				{viewType !== 'preview' ? (
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
								<div>
									{formatTime(data?.course_content_stats?.video_duration, 'Videos')}
								</div>
								<div>
									{formatTime(data?.course_content_stats?.reading_duration, 'Reading')}
								</div>
							</div>
						</div>
					</div>
				) : null}

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

			{/* <div className={styles.bottom_box}>
				<div>
					Complete in &nbsp;
					{data?.course_completion_duration?.course_completion_value}
					&nbsp;
					{data?.course_completion_duration?.course_completion_unit}
					&nbsp;to Get Certification
				</div>
				<Pill color="green">
					On or Before
					{' '}
					{format(data?.course_end_date || '', 'dd MMMM YYYY')}
				</Pill>
			</div> */}
		</div>
	);
}

export default CourseDetails;
