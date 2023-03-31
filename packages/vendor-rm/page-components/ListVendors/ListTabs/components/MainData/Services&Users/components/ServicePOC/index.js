import { IcMEdit } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import getOfficeLocation from '../../../../../../../../utils/getOfficeLocation';
import getPocRole from '../../utils/getPocRole';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

const fieldsToShow = {
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
						{Object.keys(fieldsToShow).map((item) => (
							<div className={styles.item}>
								<span className={styles.top}>
									{fieldsToShow[item]}
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
									if (item[0] === 'id') {
										return null;
									}

									return (
										<div className={styles.label_value_container}>
											<div className={styles.top}>
												{pocsMapping[item[0]]}
											</div>

											<div className={styles.bottom}>
												{item?.[0] === 'poc_role'
													? getPocRole(item?.[1]) : item?.[1]}
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
