import React from 'react';

import useGetEmployeeStatutoryDetails from '../../../hooks/useGetEmployeeStatutoryDetails';
import { statutoryInfo } from '../../../utils/info';
import { otherStatuoryInfo } from '../../../utils/otherInfo';
import DetailsCard from '../DetailsCard';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';

function StatutoryDetails({ data = {}, loading = false }) {
	const info = statutoryInfo;
	const otherInfo = otherStatuoryInfo;
	const { employee_detail } = data || {};
	const { data: statutoryDetails } = useGetEmployeeStatutoryDetails(employee_detail?.id);

	return (
		<div className={styles.tab_content}>

			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>STATUTORY DETAILS</span>
					<span className={styles.detail}>View and manage employee details</span>
				</div>
				<div className={styles.info_container}>
					<DetailsCard
						heading={info.heading}
						details={info.details}
						data={data}
						loading={loading}
						statutoryDetails={statutoryDetails}
					/>
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} loading={loading} />
		</div>
	);
}

export default StatutoryDetails;
