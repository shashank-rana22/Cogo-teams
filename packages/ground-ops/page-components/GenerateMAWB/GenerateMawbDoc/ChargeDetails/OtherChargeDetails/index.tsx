/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function formatDate(date) {
	if (date) {
		return new Date(date).toLocaleDateString('en-GB', {
			day   : 'numeric',
			month : 'short',
			year  : 'numeric',
		});
	}
	return new Date().toLocaleDateString('en-GB', {
		day   : 'numeric',
		month : 'short',
		year  : 'numeric',
	});
}

interface Props {
	taskItem?: any;
	formData?: any;
}

function OtherChargeDetails({
	taskItem = {},
	formData = {},
}:Props) {
	return (
		<div className={cl`
				${styles.block_col} 
				${styles.other_charge_container} 
			`}
		>
			<div className={cl`
				${styles.flex_col} 
				${styles.other_container} 
			`}
			>
				<div className={cl`
					${styles.flex} 
					${styles.other_charge_outer_text} 
				`}
				>
					<p style={{ fontSize: 9 }}>
						Other Charges
						<div className={cl`
							${styles.flex} 
							${styles.other_charge_text} 
						`}
						>
							<p style={{ fontSize: 13 }}>
								<div style={{ height: '30%' }}>
									{formData.agentOtherCharges.map((item) => `${item.code.toUpperCase()}:${item.price} `)}
								</div>
								<br />
								{formData.carrierOtherCharges.map((item) => `${item.code.toUpperCase()}:${item.price} `)}
							</p>
						</div>
					</p>
				</div>
			</div>

			<div className={cl`
				${styles.flex_col} 
				${styles.hereby_container} 
			`}
			>
				<div className={cl`
					${styles.flex} 
					${styles.hereby_container_text} 
				`}
				>
					<p style={{ fontSize: 10 }} className="text">
						I hereby certify that the particulars on the face hereof are
						correct and that insofar as any part of the consignment contains
						dangerous goods.
						<strong>
							I hereby certify that the contents of this consignment are fully
							and accurately describe above by proper shipping name and are
							classified, packaged, marked and labeled,and in proper condition
							for carriage by air according to applicable national government
							regulations.
						</strong>
					</p>
				</div>
				<div className={cl`
					${styles.flex} 
					${styles.business_text}
					${styles.font_style}
				`}
				>
					<p style={{ fontSize: 14 }}>
						{' '}
						{taskItem?.customer_name}
					</p>
				</div>
				<div className={cl`
					${styles.flex_row} 
					${styles.signature_text} 
				`}
				>
					<p style={{ fontSize: 9 }}>Signature of Shipper or his Agent</p>
				</div>
			</div>
			<div className={cl`
				${styles.block_col} 
				${styles.right_container} 
			`}
			>
				<div className={cl`
					${styles.flex_col} 
					${styles.place_container} 
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.place_sub_container} 
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.place_container_outer_text} 
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.place_container_text} 
						`}
						>
							<p className={styles.font_style} style={{ fontSize: 14 }}>
								{`${formatDate(new Date())}`}
							</p>
						</div>
						<div
							className={cl`
							${styles.flex} 
							${styles.place_value} 
							${styles.font_style}
						`}
							style={{ pointerEvents: 'none' }}
						>
							{formData.place}
						</div>
					</div>
					<div className={cl`
						${styles.flex_row} 
						${styles.date_container} 
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.date_text} 
						`}
						>
							<p style={{ fontSize: 8 }}>Executed on (date)</p>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.place_text} 
						`}
						>
							<p style={{ fontSize: 8 }}>at (place)</p>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.signature_value} 
						`}
						>
							<p style={{ fontSize: 8 }}>Signature of Issuing Carrier or its Agent</p>
						</div>
					</div>
				</div>
				<div className={cl`
						${styles.flex_row} 
						${styles.down_container} 
					`}
				>
					<div className={cl`
							${styles.flex_col} 
							${styles.down_container_block} 
						`}
					>
						<div className={cl`
							${styles.flex_row} 
							${styles.collected_container} 
						`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.collected_block} 
							`}
							/>
							<div className={cl`
								${styles.flex} 
								${styles.collecte_block_text} 
								${styles.trapezium}
							`}
							>
								<p style={{ fontSize: 9 }}>Total Collected</p>
							</div>
							<div className={cl`
								${styles.flex} 
								${styles.collecte_end_block} 
							`}
							/>
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.collecte_block_end} 
							`}
						/>
					</div>
					<div className={cl`
								${styles.flex} 
								${styles.end_final} 
							`}
					>
						<p className={styles.font_style} style={{ fontSize: 18 }}>
							{taskItem?.awbNumber}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default OtherChargeDetails;
