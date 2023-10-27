import { Placeholder, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMFtick, IcMCrossInCircle, IcMEdit } from '@cogoport/icons-react';
import { getByKey, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function DetailsCard({
	heading = '', details = [], isGrid = true, data = {},
	loading = false, handleClickDetails, keyMapping, keyEdu, statutoryDetails,
}) {
	console.log('🚀 ~ file: index.js:14 ~ isGrid:', isGrid);
	const {
		employee_detail, modified_employee_detail,
		processed_employee_detail, personal_details, employee_squads,
	} = data || {};

	const { present_address, employee_education_details } = employee_detail || {};
	const { family_details } = personal_details || {};

	const mapping = (key, value) => {
		const getMapping = {
			details        : employee_detail,
			address        : present_address,
			processed      : processed_employee_detail,
			modified       : modified_employee_detail,
			personal       : personal_details,
			family         : family_details,
			employee_squad : employee_squads,
			statutory      : statutoryDetails,
		};

		if (employee_education_details) {
			employee_education_details.forEach((detail) => {
				getMapping[detail.education_level] = detail;
			});
		}

		console.log(employee_education_details, 'dets');

		if (['ended_at', 'date_of_birth'].includes(value)) {
			console.log('test', getByKey(getMapping[key], value), value);
			return getByKey(getMapping[key], value) ? formatDate({
				date       : getByKey(getMapping[key], value),
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
				formatType : 'date',
			}) : null;
		}
		return getByKey(getMapping[key], value);
	};

	const labelValue = (value, key, isStartCase) => {
		console.log('value', value);
		if (Array.isArray(value)) {
			let str = '';
			value.forEach((Value) => {
				str += `${mapping(key, Value) ? mapping(key, Value) : ''} `;
			});
			return (str.trim() === '') ? ' — ' : str;
		}
		const mapValue = (mapping(key, value)) ? mapping(key, value) : ' — ';
		return isStartCase ? startCase(mapping(key, value)) : mapValue;
	};

	return (
		<div className={styles.info_subcontainer}>
			{isGrid ? (
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span className={styles.info_heading}>{heading}</span>
					{(keyMapping || keyEdu) && (
						<Button
							className={styles.info_button}
							size="md"
							themeType="secondary"
							onClick={() => handleClickDetails(keyEdu ? { heading, details } : keyMapping)}
						>
							<IcMEdit style={{ marginRight: '5px' }} />
							Edit
						</Button>
					)}
				</div>
			) : null}
			{isGrid ? (
				<div className={styles.info_grid}>
					{details.map(({ label, value, key, isStartCase }) => (
						<div className={styles.label_value} key={value}>
							<span className={styles.label}>
								{console.log(value, 'fdghj')}
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
										{loading
											? <Placeholder height="27px" width="90%" />
											: labelValue(value, key, isStartCase)}
									</span>
								</div>
							) : (
								<span className={styles.value}>
									{loading
										? <Placeholder height="27px" width="90%" />
										: labelValue(value, key, isStartCase)}
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
								{loading
									? <Placeholder height="27px" width="90%" /> : labelValue(value, key)}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default DetailsCard;
