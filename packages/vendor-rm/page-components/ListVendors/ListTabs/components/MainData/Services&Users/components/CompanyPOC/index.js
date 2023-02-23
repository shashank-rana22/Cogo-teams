/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
// import { IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import workScope from '../../../../../../../../commons/utils/work-scopes.json';

import styles from './styles.module.css';

const labelMapping = {
	name          : 'Name',
	email         : 'Email ID',
	mobile_number : 'Mobile Number',
	poc_role      : 'Role in the Company',
};

function CompanyPOC({
	data,
}) {
	const details = (data?.pocs || []).map((poc) => {
		const obj = {
			name          : poc?.name,
			email         : poc?.email,
			mobile_number : `${poc?.mobile_country_code} ${poc?.mobile_number}`,
			poc_role      : poc?.poc_role[0],
		};
		return obj;
	});

	const getRoleLabel = (val) => {
		const scopeObj = workScope.find((scope) => scope.value === val);
		return scopeObj.label;
	};

	return (
		<div className={styles.main}>
			<span className={styles.heading}>
				Company POC
			</span>
			<div className={styles.cont}>
				{details.map((item) => (
					<div className={styles.box_info}>
						{
							Object.keys(item).map((poc) => (
								<div>
									<div className={styles.top}>
										{labelMapping[poc]}
									</div>
									<div className={styles.bottom}>
										{poc === 'poc_role' ? getRoleLabel(item[poc]) : item[poc]}
									</div>
								</div>
							))
						}
					</div>
				)) }

			</div>

			<hr className={styles.dis} />

		</div>
	);
}

export default CompanyPOC;
