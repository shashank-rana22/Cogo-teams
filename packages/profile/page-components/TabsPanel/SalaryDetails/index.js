import React from 'react';

import StyledTable from '../../../common/StyledTable';
import { SalaryData } from '../../../utils/constants';
import { otherSalaryInfo } from '../../../utils/otherInfo';
import RightGlance from '../RightGlance';

import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

function PersonalDetails() {
	const columns = useGetColumns();
	const data = SalaryData;
	const otherInfo = otherSalaryInfo;

	return (
		<div className={styles.tab_content}>
			<div className={styles.main_container}>
				<div className={styles.heading}>
					<span className={styles.personal}>SALARY DETAILS</span>
					<span className={styles.detail}>View and manage salary details</span>
				</div>
				<div className={styles.info_container}>
					<StyledTable columns={columns} data={data} />
				</div>
			</div>
			<RightGlance otherInfo={otherInfo} />
		</div>
	);
}

export default PersonalDetails;
