import { cl } from '@cogoport/components';
import React from 'react';

import OtherChargeDetails from './OtherChargeDetails';
import styles from './styles.module.css';
import WeightChargeDetails from './WeightChargeDetails';

interface NestedObj {
	[key: string]: NestedObj | string | number;
}

interface Props {
	taskItem?: NestedObj;
	footerValues?: Array<string>;
	formData?: NestedObj;
	data?:NestedObj;
}

function ChargeDetails({
	taskItem = {},
	footerValues,
	formData,
	data = {},
}:Props) {
	return (
		<div className={styles.container}>
			<div className={cl`
				${styles.flex_row} 
				${styles.charge_container} 
			`}
			>
				<WeightChargeDetails data={data} />
				<OtherChargeDetails
					taskItem={taskItem}
					formData={formData}
				/>
			</div>

			<div className={styles.block} id="footer">
				<p style={{ fontSize: 13 }}>ORIGINAL 1 (FOR ISSUING CARRIER)</p>
			</div>
			{footerValues.map((index) => (
				<div id={`footer${index}`}>
					<p style={{ fontSize: 13 }} />
				</div>
			))}
		</div>
	);
}
export default ChargeDetails;
