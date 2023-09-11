import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function EmployeeDetail({ data }) {
	const { applicant_details } = data || {};
	console.log('🚀 ~ file: index.js:11 ~ EmployeeDetail ~ applicant_details:', data);
	const [show, setShow] = useState(true);

	const KEYS_TO_DISPLAY = {
		employee_name   : applicant_details?.employee_name,
		cogo_id         : applicant_details?.cogo_id,
		department      : applicant_details?.department,
		designation     : applicant_details?.designation,
		date_of_joining : formatDate({
			date       : new Date(),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		age_in_organization : applicant_details?.age_in_organization,
		reporting_location  : applicant_details?.reporting_location,
		chapter             : applicant_details?.chapter,
		reporting_manager   : applicant_details?.reporting_manager,
		hrbp                : applicant_details?.hrbp,
		feedback_rating     : applicant_details?.feedback_rating,
		personal_mail       : applicant_details?.personal_mail,
		reason_for_leaving  : applicant_details?.reason_for_leaving,
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
				<span>Summary</span>
				<IcMArrowDown
					width={16}
					height={16}
					className={show ? styles.caret_active : styles.caret_arrow}
				/>
			</div>

			<div className={show ? styles.item_container : styles.item_container_closed}>
				{Object.keys(KEYS_TO_DISPLAY || {}).map((val) => (
					<div className={styles.detail} key={val.key}>
						<div className={styles.label}>
							{startCase(val) || '-'}
						</div>

						<div className={styles.employee_detail}>
							{KEYS_TO_DISPLAY[val] || '-'}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default EmployeeDetail;
