import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function EducationalQualifications() {
	// const { employee_education_details = [{ name: 'eee' }] } = profileData || {};
	const employee_education_details = [{
		name        : 'JNV Dgg',
		type        : 'High School',
		description : 'edewdcfer qdfeqfre edeferf',
		started_at  : 'april 2018',
		ended_at    : 'april 2020',
		score_type  : 'percentage',
		score       : '90',
		courses     : 'course 1 -  jecnedjcnjdndjenv edjcnedfj eanej',

	}, {
		name        : 'JNV Dgg',
		type        : 'High School',
		description : 'edewdcfer qdfeqfre edeferf',
		started_at  : 'april 2018',
		ended_at    : 'april 2020',
		score_type  : 'percentage',
		score       : '90',
		courses     : 'course 1 -  jecnedjcnjdndjenv edjcnedfj eanej',

	},
	{
		name        : 'JNV Dgg',
		type        : 'High School',
		description : 'edewdcfer qdfeqfre edeferf',
		started_at  : 'april 2018',
		ended_at    : 'april 2020',
		score_type  : 'percentage',
		score       : '90',
		courses     : 'course 1 -  jecnedjcnjdndjenv edjcnedfj eanej',

	}];

	const educationDetails = () => (employee_education_details || []).map((element) => {
		const {
			name, type, description, started_at, ended_at, courses, score, score_type,
		} = element || {};

		return (
			<div key={`{${name}_${type}}`} className={styles.per_container}>
				<div className={styles.top_bar}>
					<div className={styles.label_value_container}>
						<div className={styles.label}>
							Name of the Institution
						</div>
						<div className={styles.value}>
							{name}
						</div>
					</div>

					<div className={styles.label_value_container}>
						<div className={styles.label}>
							Start Date
						</div>
						<div className={styles.value}>
							{startCase(started_at)}
						</div>
					</div>

					<div className={styles.label_value_container}>
						<div className={styles.label}>
							End Date
						</div>
						<div className={styles.value}>

							{startCase(ended_at)}
						</div>
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
					<div className={styles.value}>

						{courses}
					</div>
				</div>

			</div>
		);
	});
	return (
		<div className={styles.container}>
			{educationDetails()}
			{' '}

		</div>
	);
}

export default EducationalQualifications;
