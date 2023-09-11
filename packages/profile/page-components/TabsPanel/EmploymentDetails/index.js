import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import { employmentInfo } from '../../../utils/info';
import { otherEmploymentInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import EmploymentStatus from './EmploymentStatus';
import styles from './styles.module.css';

function EmploymentDetails({ data = {} }) {
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
					{info.map(({ heading, details }, index) => {
						if (index === GLOBAL_CONSTANTS.zeroth_index) {
							return (
								<>
									<DetailsCard heading={heading} details={details} key={heading} data={data} />
									<EmploymentStatus data={data} />
								</>
							);
						}
						return (
							<DetailsCard heading={heading} details={details} key={heading} data={data} />
						);
					})}
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} data={data} />
		</div>
	);
}

export default EmploymentDetails;
