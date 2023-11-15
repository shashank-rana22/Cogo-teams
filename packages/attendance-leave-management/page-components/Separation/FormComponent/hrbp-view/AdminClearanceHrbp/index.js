import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcCFtick, IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import CancellationRequest from '../CancellationRequest';
import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function AdminClearanceHrbp({ data = {}, refetch = () => {}, handleBack = () => {}, handleNext = () => {} }) {
	const {
		formState:{ errors = {} },
	} = useForm();

	const { admin_clearance, application_status, application_process_details } = data || {};
	const { process_user_details, admin_clearance:adminClearance } = admin_clearance || {};
	let { name } = process_user_details || {};
	const { sub_process_data, is_complete, is_ignored } = adminClearance || {};
	const { name:approver_name } = sub_process_data || {};
	name = !approver_name ? name : approver_name;

	if (is_ignored) {
		return (
			<Heading
				title="ADMIN CLEARANCE"
				subTitle="FNF & other settlements "
				isComplete={is_complete}
				name={name}
				isIgnored={is_ignored}
				application_process_details={application_process_details}
			/>
		);
	}

	return (
		<>
			<Heading
				title="ADMIN CLEARANCE"
				subTitle="FNF & other settlements "
				isComplete={is_complete}
				name={name}
				isIgnored={is_ignored}
				application_process_details={application_process_details}
				refetch={refetch}
			/>
			{application_status === 'cancellation_requested' ? (
				<CancellationRequest
					data={data}
					refetch={refetch}
				/>
			) : null}
			{is_complete ? (
				<>
					<div className={styles.container}>
						<div className={styles.heading}>
							Status
						</div>
						<div className={styles.content}>
							<div className={styles.column}>
								<div className={styles.row1}>ID Card</div>
								<div className={styles.row2}>
									<IcCFtick width={16} height={16} style={{ color: '#849E4C' }} />
									<span style={{ marginLeft: '4px' }}>
										{startCase(sub_process_data?.idCardStatus)}
									</span>
								</div>
							</div>

							<div className={styles.column}>
								<div className={styles.row1}>Access Card</div>
								<div className={styles.row2}>
									<IcCFtick width={16} height={16} style={{ color: '#849E4C' }} />
									<span style={{ marginLeft: '4px' }}>
										{startCase(sub_process_data?.accessCardStatus)}
									</span>
								</div>
							</div>

							<div className={styles.column}>
								<div className={styles.row1}>Parking Ticket</div>
								<div className={styles.row2}>
									<IcCFtick width={16} height={16} style={{ color: '#849E4C' }} />
									<span style={{ marginLeft: '4px' }}>
										{startCase(sub_process_data?.companyAssets)}
									</span>
								</div>
							</div>

							<div className={styles.column}>
								<div className={styles.row1}>Parking Charges</div>
								<div className={styles.row2}>
									<span style={{ color: '#BF291E' }}>
										{startCase(sub_process_data?.parkingCharges)}
										rs
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.container}>
						<div className={styles.heading}>
							Notes shared with you
						</div>

						{(sub_process_data?.notes || []).map((item) => (
							<div key={item} className={styles.upper_text}>
								<div>
									Q.
									{' '}
									{item?.label}
								</div>
								<div className={styles.lower_text}>
									Ans.
									{' '}
									{item?.Value || '-'}
								</div>
							</div>
						))}
						{errors.notes_shared ? <span className={styles.error}>*This field is Required</span> : null}
					</div>
				</>
			) : null}
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: 4 }} onClick={handleBack}>Back</Button>
				<Button themeType="primary" onClick={handleNext}>
					<span className={styles.proceedbtn}>Proceed</span>
					<IcMArrowRight width={20} height={20} style={{ marginLeft: '4px' }} />
				</Button>
			</div>
		</>
	);
}

export default AdminClearanceHrbp;
