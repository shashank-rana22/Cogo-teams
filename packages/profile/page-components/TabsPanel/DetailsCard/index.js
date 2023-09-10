import { IcMFtick, IcMCrossInCircle } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DetailsCard({ heading = '', details = [], isGrid = true, data = {} }) {
	const { employee_detail, modified_employee_detail, processed_employee_detail, personal_details } = data;
	const { present_address } = employee_detail;
	const { family_details } = personal_details;

	function labelValue(value, key) {
		if (key === null) {
			return value;
		}

		const mapping = {
			details   : getByKey(employee_detail, value),
			address   : getByKey(present_address, value),
			processed : getByKey(processed_employee_detail, value),
			modified  : getByKey(modified_employee_detail, value),
			personal  : getByKey(personal_details, value),
			family    : getByKey(family_details, value),
		};
		return mapping[key];
	}

	return (
		<div className={styles.info_subcontainer}>
			{isGrid ? <span className={styles.info_heading}>{heading}</span> : null}
			{isGrid ? (
				<grid className={styles.info_grid}>
					{details.map(({ label, value, key }) => (
						<div className={styles.label_value} key={value}>
							<span className={styles.label}>
								{label}
							</span>
							{(typeof labelValue(value, key) === 'boolean') ? (
								<div className={styles.icon_container}>
									{labelValue(value, key) ? (
										<>
											<IcMFtick width={20} height={20} className={styles.green} />
											<span>Yes</span>
										</>
									) : (
										<>
											<IcMCrossInCircle width={16} height={16} className={styles.red} />
											<span>No</span>
										</>
									)}
									<span className={styles.value}>
										{labelValue(value, key)}
									</span>
								</div>
							) : (
								<span className={styles.value}>
									{labelValue(value, key)}
								</span>
							)}
						</div>
					))}
				</grid>
			) : (
				<div className={styles.info_div}>
					{details.map(({ label, value, key }) => (
						<div className={styles.side_label_value} key={value}>
							<span className={styles.side_label}>
								{label}
							</span>
							<span className={styles.side_value}>
								{labelValue(value, key)}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default DetailsCard;
