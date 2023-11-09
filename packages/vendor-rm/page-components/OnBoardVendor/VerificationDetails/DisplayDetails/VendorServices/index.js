import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const FIELDS_TO_SHOW = {
	category           : 'Service category',
	cogoport_office_id : 'Cogoport Office',
};

function VendorServices({
	detail = [],
}) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				Vendor Services
			</div>

			<div className={styles.body}>
				{(detail || []).map((item) => (
					<div className={styles.single_record} key={item.id}>
						{Object.keys(FIELDS_TO_SHOW).map((wantedField) => {
							const val = item[wantedField];
							const { cogoport_office:{ name : office_name = '' } = {} } = item;

							return (
								<div key={wantedField} className={styles.fields_to_show}>
									<div className={styles.label}>
										{FIELDS_TO_SHOW[wantedField]}
									</div>

									<div className={styles.value}>
										{wantedField === 'cogoport_office_id'
											? office_name : startCase(val)}
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}

export default VendorServices;
