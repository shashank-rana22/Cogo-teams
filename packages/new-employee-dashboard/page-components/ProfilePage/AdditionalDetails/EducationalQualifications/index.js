import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import CommonLoader from '../../../../common/Loader';

import styles from './styles.module.css';

function EducationalQualifications({ profileData, getEmployeeDetailsLoading }) {
	const { detail } = profileData || {};
	const { employee_education_details = [] } = detail || {};

	const formatdate = ({ date }) => formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, yyyy'],
		formatType : 'date',
	});

	const renderCources = ({ Courses }) => (Courses || []).map((course) => (
		<div key={course} className={styles.course}>
			{course}
		</div>
	));

	const educationDetails = () => (employee_education_details || []).map((element) => {
		const {
			Courses = [], description = '', started_at, ended_at, school_name, score, score_type, type,
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
								{formatdate({ date: started_at }) }
								-
								{formatdate({ date: ended_at })}
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
						{!isEmpty(Courses) ? renderCources({ Courses }) : '-'}
					</div>
				</div>

			</div>
		);
	});

	if (getEmployeeDetailsLoading) {
		return <CommonLoader />;
	}

	if (isEmpty(employee_education_details)) {
		return <EmptyState />;
	}

	return (
		<div className={styles.container}>
			{educationDetails()}
			{' '}

		</div>
	);
}

export default EducationalQualifications;
