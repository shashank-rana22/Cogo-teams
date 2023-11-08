import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import CancellationRequest from '../CancellationRequest';
import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function HandoverTakeoverClearance({ data = {}, refetch = () => {}, handleBack = () => {}, handleNext = () => {} }) {
	const { hoto_clearance, application_status, applicant_details, application_process_details } = data || {};
	const { process_user_details, hoto_clearance:hotoClearance } = hoto_clearance || {};
	let { name } = process_user_details || {};
	const { is_complete, is_ignored } = hotoClearance || {};
	const { sub_process_data } = hotoClearance || {};
	const { name:approver_name } = sub_process_data || {};

	name = !approver_name ? name : approver_name;

	if (is_ignored) {
		return (
			<Heading
				title="HANDOVER TAKEOVER CLEARANCE"
				subTitle="Knowledge Transfer"
				isComplete={is_complete}
				name={name}
				refetch={refetch}
				isIgnored={is_ignored}
				application_process_details={application_process_details}
			/>
		);
	}

	return (
		<>
			<Heading
				title="HANDOVER TAKEOVER CLEARANCE"
				subTitle="Knowledge Transfer"
				isComplete={is_complete}
				name={name}
				refetch={refetch}
				isIgnored={is_ignored}
				application_process_details={application_process_details}
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
								given by
								{' '}
								{applicant_details?.employee_name || '-'}
								{' '}
								to
								{' '}
								{process_user_details?.name || '-'}
								{' '}
							</span>
						</div>
					</div>
				</>
			) : null}
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }} onClick={handleBack}>Back</Button>
				<Button themeType="primary" onClick={handleNext}>
					<span style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>Proceed</span>
					<IcMArrowRight width={20} height={20} style={{ marginLeft: '4px' }} />
				</Button>
			</div>
		</>
	);
}

export default HandoverTakeoverClearance;
