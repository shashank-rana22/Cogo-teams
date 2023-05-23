import { cl } from '@cogoport/components';
import React from 'react';

import OtherChargeDetails from './OtherChargeDetails';
import styles from './styles.module.css';
import WeightChargeDetails from './WeightChargeDetails';

interface NestedObj {
	[key: string]: string | number;
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
	activeHawb?: NestedObj;
}

const FOOTER_MAPPING = {
	copy_12    : 'COPY 12(FOR CUSTOMS)',
	copy_11    : 'COPY 11(EXTRA COPY FOR CARRIER)',
	copy_10    : 'COPY 10(EXTRA COPY FOR CARRIER)',
	copy_9     : 'COPY 9(FOR AGENT)',
	copy_8     : 'COPY 8(FOR FIRST CARRIER)',
	copy_7     : 'COPY 7(FOR SECOND CARRIER)',
	copy_6     : 'COPY 6(FOR THIRD CARRIER)',
	copy_5     : 'COPY 5(FOR AIRPORT OF DESTINATION)',
	copy_4     : 'COPY 4(DELIVERY RECEIPT)',
	original_3 : 'ORIGINAL 3 (FOR SHIPPER)',
	original_2 : 'ORIGINAL 2 (FOR CONSIGNEE)',
	original_1 : 'ORIGINAL 1 (FOR ISSUING CARRIER)',
};

function ChargeDetails({
	taskItem = {},
	footerValues,
	formData,
	data = {},
	whiteout = false,
	activeCategory = '',
	edit,
	viewDoc = false,
	activeHawb = {},
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
					activeHawb={activeHawb}
					viewDoc={viewDoc}
				/>
			</div>
			<div className={styles.block} style={{ '--temp-color': tempColor } as React.CSSProperties} id="footer">
				<p style={{ fontSize: 13, color: tempColor }}>
					{taskItem?.copyType
						? FOOTER_MAPPING[taskItem.copyType] : 'ORIGINAL 1 (FOR ISSUING CARRIER)'}
				</p>
			</div>
			{footerValues.map((index) => (
				<div key={index} id={`footer${index}`}>
					<p style={{ fontSize: 13 }} />
				</div>
			))}
		</div>
	);
}
export default ChargeDetails;
