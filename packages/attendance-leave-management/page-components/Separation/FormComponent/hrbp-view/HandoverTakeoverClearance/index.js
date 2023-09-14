import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import CancellationRequest from '../CancellationRequest';
import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function HandoverTakeoverClearance({ data = {}, refetch = () => {}, handleBack = () => {}, handleNext = () => {} }) {
	const { hoto_clearance, application_status } = data || {};
	const { process_user_details, hoto_clearance:hotoClearance } = hoto_clearance || {};
	let { name } = process_user_details || {};
	const { is_complete } = hotoClearance || {};
	const { sub_process_data } = hotoClearance || {};
	const { name:approver_name } = sub_process_data || {};
	name = approver_name === null ? name : approver_name;

	return (
		<>
			<Heading
				title="HANDOVER TAKEOVER CLEARANCE"
				subTitle="Knowledge Transfer"
				isComplete={is_complete}
				name={name}
			/>
			{application_status === 'cancellation_requested' ? (
				<CancellationRequest
					data={data}
					refetch={refetch}
				/>
			) : null}
			{is_complete ? (
				<>
					{' '}
					<div className={styles.container}>
						<div className={styles.heading}>
							Status
						</div>
						<div className={styles.content}>
							<span className={styles.text}>
								Handover is successful
								given by Employee Name to Employee
								{' '}
							</span>
						</div>
					</div>
				</>
			) : null}
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }} onClick={handleBack}>Back</Button>
				<Button themeType="primary" onClick={handleNext}>
					Proceed
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />
				</Button>
			</div>
		</>
	);
}

export default HandoverTakeoverClearance;
