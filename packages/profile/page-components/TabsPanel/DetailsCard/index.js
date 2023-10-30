import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMFtick, IcMCrossInCircle } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DetailsCard({ heading = '', details = [], isGrid = true, data = {}, loading = false }) {
	const { employee_detail, modified_employee_detail, processed_employee_detail, personal_details } = data || {};

	const { present_address, employee_education_details } = employee_detail || {};
	const { family_details } = personal_details || {};

	const mapping = (key, value) => {
		const getMapping = {
			details   : employee_detail,
			address   : present_address,
			processed : processed_employee_detail,
			modified  : modified_employee_detail,
			personal  : personal_details,
			family    : family_details,
		};

		if (employee_education_details) {
			employee_education_details.forEach((detail) => {
				getMapping[detail.education_level] = detail;
			});
		}

		if (value === 'ended_at') {
			return formatDate({
				date       : getByKey(getMapping[key], value),
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			});
		}

		return getByKey(getMapping[key], value);
	};

	const labelValue = (value, key) => {
		if (Array.isArray(value)) {
			let str = '';
			value.forEach((Value) => {
				str += `${mapping(key, Value) ? mapping(key, Value) : ''} `;
			});
			return (str.trim() === '') ? ' — ' : str;
		}
		return (mapping(key, value)) ? mapping(key, value) : ' — ';
	};

	return (
		<div className={styles.info_subcontainer}>
			{isGrid ? <span className={styles.info_heading}>{heading}</span> : null}
			{isGrid ? (
				<div className={styles.info_grid}>
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
										{loading ? <Placeholder height="27px" width="90%" /> : labelValue(value, key)}
									</span>
								</div>
							) : (
								<span className={styles.value}>
									{loading ? <Placeholder height="27px" width="90%" /> : labelValue(value, key)}
								</span>
							)}
						</div>
					))}
				</div>
			) : (
				<div className={styles.info_div}>
					{details.map(({ label, value, key }) => (
						<div className={styles.side_label_value} key={value}>
							<span className={styles.side_label}>
								{label}
							</span>
							<span className={styles.side_value}>
								{loading ? <Placeholder height="27px" width="90%" /> : labelValue(value, key)}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default DetailsCard;
