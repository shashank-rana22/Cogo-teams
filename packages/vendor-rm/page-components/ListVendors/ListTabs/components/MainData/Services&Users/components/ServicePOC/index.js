import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import getOfficeLocation from '../../../../../../../../utils/getOfficeLocation';
import getPocRole from '../../utils/getPocRole';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

const FIRST_INDEX = 1;

const FIELDS_TO_SHOW = {
	category           : 'Service category',
	cogoport_office_id : 'Cogoport Office',
};

const POCS_MAPPING = {
	name          : 'Name',
	email         : 'Email ID',
	mobile_number : 'Mobile Number',
	poc_role      : 'Role in the Company',
};

function ServicePOC({
	allServicesAndPocs = [],
	loading = false,
	setShowForm = () => {},
}) {
	const handleEditServicePOC = ({ selectedPOC }) => {
		setShowForm({
			title : 'editPOCForm',
			data  : selectedPOC,
		});
	};

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
					<div key={singleServicePoc.id} className={styles.head}>
						{Object.keys(FIELDS_TO_SHOW).map((item) => (
							<div className={styles.item} key={item}>
								<span className={styles.top}>
									{FIELDS_TO_SHOW[item]}
									{' '}
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
								{(Object.entries(poc) || []).map((item) => {
									if (item[GLOBAL_CONSTANTS.zeroth_index] === 'id') {
										return null;
									}

									return (
										<div className={styles.label_value_container} key={item?.id}>
											<div className={styles.top}>
												{POCS_MAPPING[item[GLOBAL_CONSTANTS.zeroth_index]]}
											</div>

											<div className={styles.bottom}>
												{item?.[GLOBAL_CONSTANTS.zeroth_index] === 'poc_role'
													? getPocRole(item?.[FIRST_INDEX]) : item?.[FIRST_INDEX]}
											</div>
										</div>
									);
								})}
							</>
						))}

						<div
							role="presentation"
							className={styles.edit_icon_container}
							style={{ cursor: 'pointer' }}
							onClick={() => handleEditServicePOC({ selectedPOC: singleServicePoc?.poc_details })}
						>
							<IcMEdit height={16} width={16} />
						</div>
					</div>
				</>
			))}
		</div>
	);
}

export default ServicePOC;
