import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMFtick, IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CancellationRequest from '../CancellationRequest';
import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function TechClearanceHrbp({ data = {}, refetch = () => {}, handleBack = () => {}, handleNext = () => {} }) {
	const { tech_clearance, application_status, application_process_details } = data || {};
	const { process_user_details, tech_clearance:techClearance } = tech_clearance || {};
	let { name } = process_user_details || {};
	const { sub_process_data, is_complete, is_ignored } = techClearance || {};
	const { serviceList, name:approver_name } = sub_process_data || {};
	name = !approver_name ? name : approver_name;

	const [show, setShow] = useState(false);

	if (is_ignored) {
		return (
			<Heading
				title="TECH CLEARANCE"
				subTitle="Access Removal"
				isComplete={is_complete}
				name={name}
				refetch={refetch}
				application_process_details={application_process_details}
				isIgnored={is_ignored}
			/>
		);
	}

	return (
		<>
			<Heading
				title="TECH CLEARANCE"
				subTitle="Access Removal"
				isComplete={is_complete}
				name={name}
				refetch={refetch}
				application_process_details={application_process_details}
				isIgnored={is_ignored}
			/>

			{application_status === 'cancellation_requested' ? (
				<CancellationRequest
					data={data}
					refetch={refetch}
				/>
			) : null}
			{is_complete ? (
				<div className={styles.container}>

					<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
						<span>
							Status
						</span>
						<div className={styles.button_add_service_container}>
							<IcMArrowDown
								width={16}
								height={16}
								className={show ? styles.caret_active : styles.caret_arrow}
							/>
						</div>
					</div>

					<div className={show ? styles.item_container : styles.item_container_closed}>
						{(serviceList || []).map((val) => (
							<div className={styles.detail} key={val.key}>
								<div className={styles.label}>
									{startCase(val)}
								</div>
								<div className={styles.status_detail}>
									<IcMFtick
										height={18}
										width={18}
										color="#849E4C"
										style={{ marginRight: '4px' }}
									/>
									Access Removed
								</div>
							</div>
						))}
					</div>
				</div>
			) : null}
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }} onClick={handleBack}>Back</Button>
				<Button themeType="primary" onClick={handleNext}>
					<span className={styles.proceedbtn}>Proceed</span>
					<IcMArrowRight width={20} height={20} style={{ marginLeft: '4px' }} />
				</Button>
			</div>
		</>
	);
}

export default TechClearanceHrbp;
