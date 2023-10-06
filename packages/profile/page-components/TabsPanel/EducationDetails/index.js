import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyState';
import { otherEducationInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';
import useGetEducationInfo from './useGetEducationInfo';

function EducationDetails({ data = {}, loading = false }) {
	const { employee_detail } = data || {};
	const { employee_education_details } = employee_detail || {};

	const info = useGetEducationInfo(employee_education_details);
	const otherInfo = otherEducationInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.flex}>
					<div className={styles.heading}>
						<span className={styles.personal}>EDUCATION DETAILS</span>
						<span className={styles.detail}>View and manage educational details</span>
					</div>
				</div>
				{
					!isEmpty(employee_education_details) ? (
						<div className={styles.info_container}>
							{info?.map(({ heading, details }) => (
								<DetailsCard
									heading={heading}
									details={details}
									data={data}
									key={heading}
									loading={loading}
								/>
							))}
						</div>
					) : (<EmptyState />)
				}
			</div>
			<RightGlance otherInfo={otherInfo} data={data} loading={loading} />
		</div>
	);
}

export default EducationDetails;
