/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
// import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import useGetListVendorPocServices from '../../hooks/useGetListVendorPocServices';
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

function ServicePOC() {
	const {
		allServicesAndPocs = [],
		loading = false,
	} = useGetListVendorPocServices();

	if (loading) {
		return (
			<LoadingState />
		);
	}

	return (
		<div className={styles.main}>
			<span className={styles.heading}>Service POC </span>

			{
				(allServicesAndPocs || []).map((singleServicePoc) => (
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
											? startCase(singleServicePoc?.cogoport_office?.display_name)
											: startCase(singleServicePoc?.[item])}
									</span>
								</div>
							)) }
						</div>

						<div className={styles.cont}>
							{(singleServicePoc?.poc_details || []).map((poc) => (
								<>
									{(Object.entries(poc) || []).map((item) => (
										<div className={styles.box_info}>
											<div>
												<div className={styles.top}>
													{pocsMapping[item[0]]}
												</div>

												<div className={styles.bottom}>
													{item?.[0] === 'poc_role'
														? getPocRole(item?.[1]) : item?.[1]}
												</div>
											</div>
										</div>
									))}
								</>
							)) }
						</div>

					</>
				))
			}

		</div>
	);
}

export default ServicePOC;
