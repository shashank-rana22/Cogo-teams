import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { employmentInfo } from '../../../utils/info';
import { otherEmploymentInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import EmploymentStatus from './EmploymentStatus';
import styles from './styles.module.css';

function EmploymentDetails({ data = {}, loading = false }) {
	const info = employmentInfo;
	const otherInfo = otherEmploymentInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>EMPLOYMENT DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					{info.map(({ heading, details }, index) => (
						<>
							<DetailsCard
								heading={heading}
								details={details}
								key={heading}
								data={data}
								loading={loading}
							/>
							{(index === GLOBAL_CONSTANTS.zeroth_index)
								? <EmploymentStatus data={data} loading={loading} /> : null}
						</>
					))}
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={data} loading={loading} />
		</div>
	);
}

export default EmploymentDetails;
