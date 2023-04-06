import React from 'react';

import formatArrayValues from '../../../../../utils/formatArrayValues';
import workScopes from '../../../../../utils/work-scopes.json';

import styles from './styles.module.css';

const fieldsToShow = {
	name          : 'Name of the contact',
	email         : 'Email ID',
	mobile_number : 'Mobile Number',
	poc_role      : 'Role in Organisation',
};

function VendorContact({
	detail,
}) {
	const getDisplayValue = ({ fieldName }) => {
		const val = detail?.[0]?.[fieldName] || '';

		if (fieldName === 'mobile_number') {
			const { mobile_number = '', mobile_country_code = '' } = detail?.[0] || {};
			return `${mobile_country_code} ${mobile_number}`;
		}

		if (fieldName === 'poc_role') {
			const formattedValues = (val || []).map(
				(value) => workScopes.find(
					(work_scope) => work_scope.value === value,
				).label,
			);

			return formatArrayValues(formattedValues, false);
		}

		return val;
	};

	return (
		<div
			className={styles.container}
		>
			<div className={styles.title}>
				Vendor Contact
			</div>

			<div className={styles.body}>
				<div className={styles.single_record}>
					{
						Object.keys(fieldsToShow).map((fieldName) => (
							<div key={fieldName} className={styles.fields_to_show}>

								<div className={styles.label}>
									{fieldsToShow[fieldName]}
								</div>

								<div className={styles.value}>
									{getDisplayValue({ fieldName })}
								</div>

							</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default VendorContact;
