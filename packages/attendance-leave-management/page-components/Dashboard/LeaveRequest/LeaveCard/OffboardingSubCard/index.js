import { Button } from '@cogoport/components';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import formatDate from '@cogoport/globalization/utils/formatDate';
import {
	IcACareers,
	IcMTick,
} from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
// import { startCase } from '@cogoport/utils';
// import { formatDistanceToNow } from 'date-fns';
import React from 'react';

import styles from './styles.module.css';

function OffboardingSubCard({ val = {}, isManager = false, updateLoading = false }) {
	const router = useRouter();
	const handleResignation = (id, process_name) => {
		router.push(`/new-employee-dashboard/separation?process_name=${process_name}&id=${id}`);
	};
	return (
		<div className={styles.details} key={val.off_boarding_application_id}>
			<div className={styles.design}>
				<div className={styles.img}>
					<IcACareers width={18} height={18} />
				</div>
				<div className={styles.sec2}>
					<div className={styles.text1}>
						<span className={styles.text_name}>{val.employee_name}</span>
						{' '}
						requested
						resignation
					</div>
					<div className={styles.text2}>
						Process Clearance Name:
						{' '}
						{val.process_name}
					</div>
				</div>
			</div>
			{isManager ? (
				<div className={styles.yes_no}>
					<div className={styles.approve}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => handleResignation(val.off_boarding_application_id, val.process_name)}
							disabled={updateLoading}
						>
							<div className={styles.accept}>
								<IcMTick width={25} height={22} fill="#849E4C" />
								<span className={styles.acc_content}>Go To Clearance</span>
							</div>
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default OffboardingSubCard;
