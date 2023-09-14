import { Button } from '@cogoport/components';
import { IcACareers } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function OffboardingSubCard({ val = {}, isManager = false, updateLoading = false }) {
	const router = useRouter();

	const handleResignation = (id, process_name) => {
		router.push(`/separation?process_name=${process_name}&application_id=${id}`);
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
						{startCase(val.process_name)}
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
							Go To Clearance
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default OffboardingSubCard;
