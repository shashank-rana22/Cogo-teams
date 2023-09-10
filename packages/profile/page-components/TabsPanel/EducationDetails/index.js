import React from 'react';

import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function EducationDetails({ data = {} }) {
	const info = [
		{
			heading : 'GRADUATION DETAILS',
			details : [
				{ label: 'College', value: 'Indian Institute of Technology, Bombay' },
				{ label: 'Degree', value: 'B. Tech.' },
				{ label: 'Field of study', value: 'Civil Engineering' },
				{ label: 'Graduation date', value: '10/05/23' },
				{ label: 'Grade', value: '8.24' },
			],
		},
	];

	const otherInfo = [
		{ label: 'College', value: 'Indian Institute of Technology, Bombay' },
		{ label: 'Degree', value: 'B. Tech.' },
		{ label: 'Field of study', value: 'Civil Engineering' },
		{ label: 'Graduated on', value: '10/05/23' },
	];

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.flex}>
					<div className={styles.heading}>
						<span className={styles.personal}>EDUCATION DETAILS</span>
						<span className={styles.detail}>View and manage educational details</span>
					</div>
				</div>
				<div className={styles.info_container}>
					{info.map(({ heading, details }) => (
						<DetailsCard heading={heading} details={details} data={data} key={heading} />
					))}
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={data} />
		</div>

	);
}

export default EducationDetails;
