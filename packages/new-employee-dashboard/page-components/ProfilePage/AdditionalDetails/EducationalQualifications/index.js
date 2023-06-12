import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';

import styles from './styles.module.css';

const RenderCources = ({ Courses }) => (Courses || []).map((course) => (
	<div key={course} className={styles.course}>
		{course}
	</div>
));

const Formatdate = ({ date }) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, yyyy'],
	formatType : 'date',
});

const EducationDetails = ({ employee_education_details }) => (employee_education_details || []).map((element) => {
	const {
		courses = [], description = '', started_at, ended_at, school_name, score, score_type, type,
	} = element || {};

	return (
		<div key={`{${school_name}_${type}}`} className={styles.per_container}>

			<div className={styles.header}>
				{type}
			</div>

			<div className={styles.top_bar}>
				<div className={styles.label_value_container}>
					<div className={styles.label}>
						Name of the Institution
					</div>
					<div className={styles.value}>
						{startCase(school_name)}
						<span style={{ paddingLeft: 8 }}>

							(
							<Formatdate date={started_at} />

							-
							<Formatdate date={ended_at} />

							)
						</span>

					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label}>
						Score
					</div>
					<div className={styles.value}>
						{score}
						{' '}
						{(score_type).toUpperCase()}
					</div>
				</div>

			</div>

			<div className={styles.label_value_container}>
				<div className={styles.label}>
					Description
				</div>
				<div className={styles.value}>
					{description || '-'}
				</div>
			</div>

			<div className={styles.label_value_container}>
				<div className={styles.label}>
					Courses
				</div>
				<div className={styles.course_wrapper}>
					{!isEmpty(courses) ? <RenderCources courses={courses} /> : '-'}
				</div>
			</div>

		</div>
	);
});

function EducationalQualifications({ profileData, getEmployeeDetailsLoading }) {
	const { detail } = profileData || {};
	const { employee_education_details = [] } = detail || {};

	if (getEmployeeDetailsLoading) {
		return <CommonLoader />;
	}

	if (isEmpty(employee_education_details)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			<EducationDetails employee_education_details={employee_education_details} />
		</div>
	);
}

export default EducationalQualifications;
