/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
// import { IcMEdit } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import getOfficeLocation from '../../../../../../../../utils/getOfficeLocation';
import getPocRole from '../../utils/getPocRole';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

const filedsToShow = {
	category           : 'Service category',
	sub_category       : 'Service Sub-Category',
	cogoport_office_id : 'Cogoport Office',
};

const pocsMapping = {
	name          : 'Name',
	email         : 'Email ID',
	mobile_number : 'Mobile Number',
	poc_role      : 'Role in the Company',
};

function ServicePOC({
	allServicesAndPocs = [],
	loading = false,
}) {
	if (loading) {
		return (
			<LoadingState />
		);
	}

	if (isEmpty(allServicesAndPocs)) {
		return null;
	}

	return (
		<div className={styles.main}>
			<span className={styles.heading}>Service POC </span>

			{(allServicesAndPocs || []).map((singleServicePoc) => (
				<>
					<div className={styles.head}>
						{Object.keys(filedsToShow).map((item) => (
							<div className={styles.fl}>
								<span className={styles.top}>
									{filedsToShow[item]}
									:
								</span>
								<span className={styles.bottom}>
									{item === 'cogoport_office_id'
										? getOfficeLocation(singleServicePoc?.cogoport_office_id)
										: startCase(singleServicePoc?.[item])}
								</span>
							</div>
						)) }
					</div>

					<div className={styles.content}>
						{(singleServicePoc?.poc_details || []).map((poc) => (
							<>
								{(Object.entries(poc) || []).map((item) => (
									<div className={styles.label_value_container}>
										<div className={styles.top}>
											{pocsMapping[item[0]]}
										</div>

										<div className={styles.bottom}>
											{item?.[0] === 'poc_role'
												? getPocRole(item?.[1]) : item?.[1]}
										</div>
									</div>
								))}
							</>
						)) }
					</div>
				</>
			))}
		</div>
	);
}

export default ServicePOC;
