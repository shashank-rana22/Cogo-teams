import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function WeightChargeDetails({ data = {} }) {
	return (
		<div className={cl`
				${styles.block_col} 
				${styles.weight_charge_container} 
			`}
		>
			<div className={cl`
				${styles.flex_col} 
				${styles.common_border_bottom}
				${styles.common_flex} 
			`}
			>
				<div className={cl`
					${styles.flex_row} 
					${styles.prepaid_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.prepaid_sub_block}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.prepaid_sub_devision}
						${styles.common_border_bottom}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 9 }}>Prepaid</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.collect_block}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.weight_charge_sub_block}
						${styles.common_border_bottom}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 9 }}>Weight Charge</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.collect_block}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.collect_sub_block}
						${styles.common_border_bottom}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 9 }}>Collect</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.prepaid_sub_block}
					`}
					/>
				</div>

				<div className={cl`
					${styles.flex_row} 
					${styles.total_price_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.total_price_sub_block}
						${styles.common_flex}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 13 }}>{data?.total_charge?.toFixed(2)}</p>
					</div>
					<div style={{ flex: 1 }} />
				</div>
			</div>
			<div className={cl`
				${styles.flex_col} 
				${styles.common_border_bottom}
				${styles.common_flex} 
			`}
			>
				<div className={cl`
					${styles.flex_row} 
					${styles.prepaid_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.valuable_charge_sub_block}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.valuable_charge_text_block}
						${styles.common_border_bottom}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 9 }}>Valuation Charge</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.valuable_charge_end_block}
					`}
					/>
				</div>

				<div className={cl`
					${styles.flex_row} 
					${styles.total_price_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.common_flex}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.common_flex}
					`}
					/>
				</div>
			</div>
			<div className={cl`
				${styles.flex_col} 
				${styles.common_border_bottom}
				${styles.common_flex} 
			`}
			>
				<div className={cl`
					${styles.flex_row} 
					${styles.prepaid_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.tax_sub_block}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.tax_text_block}
						${styles.common_border_bottom}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 9 }}>Tax</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.tax_end_block}
					`}
					/>
				</div>

				<div className={cl`
					${styles.flex_row} 
					${styles.total_price_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.common_flex}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.common_flex}
					`}
					/>
				</div>
			</div>
			<div className={cl`
				${styles.flex_col} 
				${styles.common_border_bottom}
				${styles.common_flex} 
			`}
			>
				<div className={cl`
					${styles.flex_row} 
					${styles.prepaid_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.total_other_charge_sub_block}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.total_other_charge_text_block}
						${styles.common_border_bottom}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 9 }}>Total Other Charges Due Agent</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.total_other_charge_final_block}
					`}
					/>
				</div>
				<div className={cl`
					${styles.flex_row} 
					${styles.total_price_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.total_other_charge_text_value_block}
						${styles.common_flex}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 13 }}>{data?.agent_charge?.toFixed(2)}</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.common_flex}
					`}
					/>
				</div>
			</div>
			<div className={cl`
				${styles.flex_col}
				${styles.carrier_container}
				${styles.common_border_bottom}
				${styles.common_flex} 
			`}
			>
				<div className={cl`
					${styles.flex_row} 
					${styles.prepaid_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.carrier_sub_block}
						${styles.common_border_right}
					`}
					/>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.carrier_text_block}
						${styles.common_border_bottom}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 9 }}>Total Other Charges Due Carrier</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.carrier_end_block}
					`}
					/>
				</div>

				<div className={cl`
					${styles.flex_row} 
					${styles.total_price_block}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.carrier_final_sub_block}
						${styles.common_flex}
						${styles.common_border_right}
					`}
					>
						<p style={{ fontSize: 13 }}>{data?.carrier_charge?.toFixed(2)}</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.common_flex}
					`}
					/>
				</div>
			</div>
			<div className={cl`
					${styles.flex_row} 
					${styles.total_prepaid_container}
				`}
			>
				<div className={cl`
						${styles.flex} 
						${styles.common_flex}
						${styles.common_border_right}
					`}
				/>
				<div className={cl`
						${styles.flex} 
						${styles.common_flex}
					`}
				/>
			</div>
			<div className={cl`
					${styles.flex_row} 
					${styles.total_prepaid_container}
				`}
			>
				<div className={cl`
					${styles.flex_col}
					${styles.common_flex}
					${styles.common_border_right} 
				`}
				>
					<div className={cl`
						${styles.flex_row} 
						${styles.prepaid_block}
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.prepaid_sub_block}
							${styles.common_border_right}
						`}
						/>
						<div className={cl`
							${styles.flex} 
							${styles.common_justify_center}
							${styles.prepaid_total_text_block}
							${styles.common_border_bottom}
							${styles.common_border_right}
						`}
						>
							<p style={{ fontSize: 9 }}>Total Prepaid</p>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.prepaid_sub_block}
						`}
						/>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.common_justify_center}
						${styles.prepaid_total_value}
					`}
					>
						<p style={{ fontSize: 13 }}>{data?.final_charge?.toFixed(2)}</p>
					</div>
				</div>

				<div className={cl`
					${styles.flex_col}
					${styles.common_flex}
				`}
				>
					<div className={cl`
						${styles.flex_row} 
						${styles.prepaid_block}
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.prepaid_sub_block}
							${styles.common_border_right}
						`}
						/>
						<div className={cl`
							${styles.flex} 
							${styles.common_justify_center}
							${styles.prepaid_collect_text_block}
							${styles.common_border_bottom}
							${styles.common_border_right}
						`}
						>
							<p style={{ fontSize: 9 }}>Total Collect</p>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.prepaid_sub_block}
						`}
						/>
					</div>
					<div className={cl`
							${styles.flex} 
							${styles.collect_prepaid_end}
						`}
					/>

				</div>
			</div>

			<div className={cl`
				${styles.flex_row} 
				${styles.total_prepaid_container}
			`}
			>
				<div className={cl`
					${styles.flex_col}
					${styles.common_flex}
					${styles.common_border_right} 
				`}
				>
					<div className={cl`
						${styles.flex_row} 
						${styles.prepaid_block}
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.Conversion_outer_text_block}
							${styles.common_border_right}
						`}
						/>
						<div className={cl`
							${styles.flex} 
							${styles.common_justify_center}
							${styles.conversion_text_block}
							${styles.common_border_bottom}
							${styles.common_border_right}
						`}
						>
							<p style={{ fontSize: 9 }}>Currency Conversion Rates</p>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.conversion_end_block}
						`}
						/>
					</div>
					<div className={cl`
							${styles.flex} 
							${styles.conversion_end}
						`}
					/>
				</div>
				<div className={cl`
					${styles.flex_col}
					${styles.common_flex}
				`}
				>
					<div className={cl`
						${styles.flex_row} 
						${styles.prepaid_block}
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.currency_outer_text_block}
							${styles.common_border_right}
						`}
						/>
						<div className={cl`
							${styles.flex} 
							${styles.common_justify_center}
							${styles.currency_text_block}
							${styles.common_border_bottom}
							${styles.common_border_right}
						`}
						>
							<p style={{ fontSize: 9 }}>CC Charges in Dest. Currency</p>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.currency_final_end_block}
						`}
						/>
					</div>
					<div className={cl`
							${styles.flex} 
							${styles.currency_end}
						`}
					/>
				</div>
			</div>
			<div className={cl`
				${styles.flex_row} 
				${styles.destination_container}
			`}
			>
				<div className={cl`
					${styles.flex} 
					${styles.common_justify_center}
					${styles.destination_text}
					${styles.common_flex}
					${styles.common_border_right}
				`}
				>
					<p style={{ fontSize: 9 }}>
						For Carrier&apos;s Use only at
						<div className={cl`
							${styles.flex} 
							${styles.common_justify_center}
						`}
						>
							<p style={{ fontSize: 9 }}>Destination</p>
						</div>
					</p>
				</div>
				<div className={cl`
					${styles.flex_col}
					${styles.common_flex}
				`}
				>
					<div className={cl`
						${styles.flex_row} 
						${styles.prepaid_block}
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.prepaid_sub_block}
							${styles.common_border_right}
						`}
						/>
						<div className={cl`
							${styles.flex} 
							${styles.charges_container_text}
							${styles.common_border_bottom}
							${styles.common_border_right}
						`}
						>
							<p style={{ fontSize: 9 }}>Charges at Destination</p>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.prepaid_sub_block}
						`}
						/>
					</div>
					<div className={cl`
							${styles.flex} 
							${styles.charges_container_end}
						`}
					/>
				</div>
			</div>
		</div>
	);
}
export default WeightChargeDetails;
