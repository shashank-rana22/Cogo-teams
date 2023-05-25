import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function EmploymentHistory({ profileData }) {
	const { detail } = profileData || {};
	const { employee_experience_details = [] } = detail || {};

	const formatdate = ({ date }) => formatDate({
		date,
		dateFormat : GLOBAL_CONSTANTS.formats.date['MMM, yyyy'],
		formatType : 'date',
	});

	const renderSkills = ({ skills }) => (skills || []).map((skill) => (
		<div key={skill} className={styles.skills}>
			{skill}
		</div>
	));

	const employmentDetails = () => (employee_experience_details || []).map((element) => {
		const {
			skills = [], description = '', started_at, ended_at, company_name,
		} = element || {};

		return (
			<div key={`{${company_name}_${started_at}}`} className={styles.per_container}>

				<div className={styles.header}>
					{company_name}
				</div>

				<div className={styles.top_bar}>
					<div className={styles.label_value_container}>

						<span style={{ paddingRight: 8 }}>
							{formatdate({ date: started_at }) }
						</span>
						-
						<span style={{ paddingLeft: 8 }}>
							{formatdate({ date: ended_at }) }
						</span>

					</div>

				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label}>
						Description
					</div>
					<div className={styles.value}>
						{description}
					</div>
				</div>

				<div className={styles.label_value_container}>
					<div className={styles.label}>
						Courses
					</div>
					<div className={styles.skills_value}>
						{renderSkills({ skills })}
					</div>
				</div>

			</div>
		);
	});
	return (
		<div className={styles.container}>
			{employmentDetails()}
			{' '}

		</div>
	);
}

export default EmploymentHistory;
