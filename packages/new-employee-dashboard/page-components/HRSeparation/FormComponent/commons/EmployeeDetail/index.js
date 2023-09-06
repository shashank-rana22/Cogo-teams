import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';

function EmployeeDetail() {
	const [show, setShow] = useState(true);

	const KEYS_TO_DISPLAY = {
		employee_name   : 'Shivam Singh',
		cogo_id         : 'COGO0833',
		department      : 'Technology',
		designation     : 'Senior Software Engineer',
		date_of_joining : formatDate({
			date       : new Date(),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		age_in_organization : '1 year 8 months',
		reporting_location  : 'Mumbai',
		chapter             : 'HRMS',
		reporting_manager   : 'Khushal Paliwal',
		hrbp                : 'Mukti Shetty',
		feedback_rating     : '3',
		personal_mail       : 'shivam26051998@gmail.com',
		reason_for_leaving  : 'Not feeling well',
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
