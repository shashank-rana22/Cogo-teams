import { cl } from '@cogoport/components';
import React from 'react';

import OtherChargeDetails from './OtherChargeDetails';
import styles from './styles.module.css';
import WeightChargeDetails from './WeightChargeDetails';

function ChargeDetails({
	data = {},
	shipment_data = {},
	footer_values,
	fields,
	primary_service = {},
}) {
	return (
		<div>
			<div className={cl`
				${styles.flex_row} 
				${styles.charge_container} 
			`}
			>
				<WeightChargeDetails data={data} />
				<OtherChargeDetails
					shipment_data={shipment_data}
					fields={fields}
					primary_service={primary_service}
				/>
			</div>

			<div className={styles.block} id="footer">
				<p style={{ fontSize: 13 }}>ORIGINAL 1 (FOR ISSUING CARRIER)</p>
			</div>
			{footer_values.map((index) => (
				<div id={`footer${index}`}>
					<p style={{ fontSize: 13 }} />
				</div>
			))}
		</div>
	);
}
export default ChargeDetails;
