import { startCase } from '@cogoport/utils';
import React from 'react';

import getOfficeLocation from '../../../../../utils/getOfficeLocation';

import styles from './styles.module.css';

const filedsToShow = {
	category           : 'Service category',
	sub_category       : 'Service Sub-Category',
	cogoport_office_id : 'Cogoport Office',
};

function VendorServices({
	detail,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Vendor Services
			</div>
			<div className={styles.body}>
				{
					(detail || []).map((item) => (
						<div className={styles.single_record}>
							{
								Object.keys(filedsToShow).map((wantedField) => {
									const val = item[wantedField];
									return (
										<div className={styles.fields_to_show}>
											<div className={styles.label}>
												{filedsToShow[wantedField]}
											</div>
											<div className={styles.value}>
												{wantedField === 'cogoport_office_id'
													? getOfficeLocation(val) : startCase(val)}
											</div>
										</div>
									);
								})
							}
						</div>
					))
				}
			</div>
		</div>
	);
}

export default VendorServices;
