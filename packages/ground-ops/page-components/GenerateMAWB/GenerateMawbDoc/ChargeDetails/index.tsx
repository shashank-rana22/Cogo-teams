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
	whiteout?:boolean;
	activeCategory?: String;
	edit?: boolean | string;
	viewDoc?: boolean;
}

function ChargeDetails({
	taskItem = {},
	footerValues,
	formData,
	data = {},
	whiteout = false,
	activeCategory = '',
	edit,
	viewDoc = false,
}:Props) {
	let tempColor = '#333';
	if (whiteout) {
		tempColor = 'transparent';
	}

	const docType = taskItem?.documentType === 'draft_airway_bill' ? 'mawb' : 'hawb';
	const awbType = edit || viewDoc ? docType : activeCategory;

	return (
		<div className={styles.container}>
			<div className={cl`
				${styles.flex_row} 
				${styles.charge_container} 
			`}
			>
				<WeightChargeDetails formData={formData} data={data} whiteout={whiteout} />
				<OtherChargeDetails
					taskItem={taskItem}
					formData={formData}
					whiteout={whiteout}
					awbType={awbType}
				/>
			</div>

			<div className={styles.block} style={{ '--temp-color': tempColor } as React.CSSProperties} id="footer">
				<p style={{ fontSize: 13, color: tempColor }}>ORIGINAL 1 (FOR ISSUING CARRIER)</p>
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
