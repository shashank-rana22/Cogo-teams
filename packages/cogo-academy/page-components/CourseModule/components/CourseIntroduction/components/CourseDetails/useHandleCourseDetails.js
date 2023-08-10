import styles from './styles.module.css';

const TIME_UNIT_VALUE = 60;

const MAPPING = {
	modules: {
		label  : 'Modules',
		apiKey : 'modules_count',
	},
	sub_modules: {
		label  : 'Sub Modules',
		apiKey : 'sub_modules_count',
	},
	chapters: {
		label  : 'Chapters',
		apiKey : 'course_sub_module_chapters_count',
	},
};

function FormatTime({ value = 0, type }) {
	return (
		<div>
			{Math.floor(value / TIME_UNIT_VALUE)}
		&nbsp;
			<b>Hour</b>
		&nbsp;
			{(value % TIME_UNIT_VALUE)}
		&nbsp;
			<b>Min</b>
		&nbsp;
			{type}
		</div>
	);
}

const useHandleCourseDetails = ({ instructorData }) => {
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

	const CAROUSELDATA = instructorData?.map((item, index) => {
		const { name = '', mobile_number, email = '' } = item || {};

		return {
			key    : `${name}_${index}`,
			render : () => (
				<div key={name}>
					<div className={styles.box}>{name}</div>
					<div className={styles.box}>{mobile_number}</div>
					<div className={styles.box}>{email}</div>
				</div>
			),
		};
	});

	return {
		MAPPING,
		getModulesCount,
		FormatTime,
		CAROUSELDATA,
	};
};

export default useHandleCourseDetails;
