import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function HandoverTakeoverClearance() {
	return (
		<>
			<Heading title="HANDOVER TAKEOVER CLEARANCE" subTitle="Knowledge Transfer" />
			<div className={styles.container}>
				<div className={styles.heading}>
					Status
				</div>
				<div className={styles.content}>
					<span className={styles.text}>Handover is successful given by  Employee Name to Employee </span>
				</div>
			</div>
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }}>Back</Button>
				<Button themeType="primary">
					Proceed
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>
		</>
	);
}

export default HandoverTakeoverClearance;
