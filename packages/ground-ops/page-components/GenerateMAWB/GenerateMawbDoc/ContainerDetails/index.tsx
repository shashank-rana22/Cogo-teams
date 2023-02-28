/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	formData?: any;
	taskItem?: any;
	chargeableWeight?: any;
}

function ContainerDetails({
	formData = {},
	taskItem = {},
	chargeableWeight,
}:Props) {
	return (
		<div className={styles.container} style={{ pointerEvents: 'none' }}>
			<div className={styles.flex}>
				<div className={cl`
						${styles.block} 
						${styles.block_flex_border} 
						${styles.handling_information} 
					`}
				>
					<div className={cl`
						${styles.flex_col} 
						${styles.inner_handling_information} 
					`}
					>

						<p style={{ fontSize: 10 }}>Handling Information</p>
						<div className={cl`
							${styles.flex} 
							${styles.flex_font_weight}
							${styles.vol_weight_box}
							${styles.font_style}
						`}
						>
							{formData.handlingInformation}
						</div>
					</div>
					<div className={cl`
						${styles.flex_col} 
						${styles.sci_handling_information} 
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.sci_text_style}
						`}
						>
							<p style={{ fontSize: 10 }}>SCI</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={cl`
						${styles.block} 
						${styles.block_flex_border} 
						${styles.container_section} 
					`}
				>
					<div className={cl`
						${styles.flex_col} 
						${styles.border_right_solid}
						${styles.block_a_container_section}
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.flex_border_solid}
							${styles.flex_in_flex}
							${styles.block_a_container_section_rcp}
						`}
						>
							<p style={{ fontSize: 7 }}>No. of Pieces RCP</p>
						</div>

						<div className={cl`
							${styles.flex} 
							${styles.flex_font_weight}
							${styles.flex_border_solid}
							${styles.flex_in_flex_b}
							${styles.flex_justify_end}
						`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_top_package}
							`}
							>
								<p style={{ fontSize: 13 }}>{taskItem?.packagesCount}</p>
							</div>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_volume}
								${styles.vol_weight_box}
							`}
							>
								<div className={cl`
									${styles.flex} 
								`}
								>
									{' '}
									<p className={styles.font_style} style={{ fontSize: 11 }}>
										<div style={{ width: '84px' }}>Volume Weight:</div>
									</p>
									<div className={cl`
										${styles.flex} 
										${styles.vol_weight_box}
										${styles.font_style}
									`}
									>
										<p style={{ fontSize: 11, width: '120px' }} className="volume_box">
											{`${chargeableWeight} Kgs(Cms)`}
										</p>
									</div>
								</div>
								<div className={cl`
									${styles.flex} 
								`}
								>
									<div className={cl`
										${styles.flex} 
										${styles.vol_weight_box}
										${styles.font_style}
									`}
									>
										<p style={{ fontSize: 11 }} className="volume_box">
											{formData.dimension.map((item) => `${item.length}x${item.width}x${item.height}/${item.packages} 
											`)}
										</p>
									</div>
								</div>
								<div className={cl`
									${styles.flex} 
									${styles.margin_remarks}
								`}
								>
									<p className={styles.font_style} style={{ fontSize: 11, marginRight: 4 }}>Remarks:</p>
									<div className={cl`
										${styles.flex} 
										${styles.vol_weight_box}
										${styles.font_style}
									`}
									>
										<p style={{ fontSize: 11 }} className="volume_box">
											<div className="remark_box">{formData.remark}</div>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className={cl`
							${styles.flex} 
							${styles.flex_font_weight}
							${styles.flex_in_flex}
							${styles.flex_justify_end}
							${styles.block_a_container_bottom_package}
						`}
						>
							<p className={styles.font_style} style={{ fontSize: 13 }}>{taskItem?.packagesCount}</p>
						</div>
					</div>

					<div className={cl`
						${styles.flex_col} 
						${styles.border_right_solid}
						${styles.block_b_container_section}
					`}
					>
						<div className={cl`
							${styles.flex} 
							${styles.flex_border_solid}
							${styles.flex_in_flex}
							${styles.flex_justify_center}
						`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.grossweight_text}
							`}
							>
								<p style={{ fontSize: 8 }}>Gross Weight</p>
							</div>
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_border_solid}
								${styles.flex_in_flex_b}
								${styles.flex_justify_end}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_bottom_package}
							`}
							>
								<p className={styles.font_style} style={{ fontSize: 13 }}>{taskItem?.weight}</p>
							</div>
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_in_flex}
								${styles.flex_justify_end}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_bottom_package}
							`}
							>
								<p className={styles.font_style} style={{ fontSize: 13 }}>{taskItem?.weight}</p>
							</div>
						</div>
					</div>

					<div className={cl`
						${styles.flex_col} 
						${styles.border_right_solid}
						${styles.block_c_container_section}
					`}
					>
						<div className={cl`
								${styles.flex} 
								${styles.flex_border_solid}
								${styles.flex_in_flex_empty_top}
							`}
						>
							<p style={{ fontSize: 8 }} />
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_in_flex_empty_bottom}
							`}
						>
							<p className={styles.font_style} style={{ fontSize: 13 }}>K</p>
						</div>
					</div>
					<div className={cl`
						${styles.flex_row} 
						${styles.block_dfhjl_container_section} 
					`}
					>
						<p style={{ fontSize: 11 }}> </p>
					</div>

					<div className={cl`
						${styles.flex_col} 
						${styles.border_right_solid}
						${styles.block_egi_container_section}
					`}
					>
						<div className={cl`
							${styles.flex_col} 
							${styles.block_e_container_top_section}
						`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_e_container_rateclass_section}
							`}
							>
								<p style={{ fontSize: 7 }}>Rate Class</p>
							</div>
							<div className={cl`
								${styles.flex_row} 
								${styles.block_e_container_commodity_section} 
							`}
							>
								<div className={cl`
									${styles.flex} 
									${styles.flex_in_flex_empty_top}
									${styles.block_e_container_commodity_empty_section}
								`}
								/>
								<div className={cl`
									${styles.flex} 
									${styles.flex_justify_center}
									${styles.flex_border_solid}
									${styles.flex_in_flex_empty_bottom}
									${styles.block_e_container_commodity_text_section}
								`}
								>
									<p style={{ fontSize: 7 }}>
										Commodity
										<div className={cl`
											${styles.flex} 
											${styles.flex_justify_center}
										`}
										>
											<p style={{ fontSize: 7 }}>Item No.</p>
										</div>
									</p>
								</div>
							</div>
						</div>

						<div className={cl`
								${styles.flex_row} 
								${styles.block_e_container_bottom_section} 
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_in_flex_empty_top}
								${styles.block_e_container_q_section}

							`}
							>
								<p style={{ fontSize: 13 }}>Q</p>
							</div>
							<div className={cl`
								${styles.flex} 
								${styles.flex_in_flex_empty_bottom}

							`}
							>
								<p style={{ fontSize: 7 }} />
							</div>
						</div>
					</div>
					<div className={cl`
						${styles.flex_row} 
						${styles.block_dfhjl_container_section} 
					`}
					>
						<p style={{ fontSize: 7 }}> </p>
					</div>

					<div className={cl`
							${styles.flex_col} 
							${styles.border_right_solid}
							${styles.block_egi_container_section}
						`}
					>
						<div className={cl`
								${styles.flex} 
								${styles.flex_border_solid}
								${styles.flex_justify_center}
								${styles.flex_in_flex_empty_top}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.chargeableweight_text}
							`}
							>
								<p style={{ fontSize: 8 }}>
									Chargeable
									<div className={cl`
										${styles.flex} 
										${styles.flex_justify_center}
									`}
									>
										<p style={{ fontSize: 8 }}>Weight</p>
									</div>
								</p>
							</div>
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_justify_end}
								${styles.flex_in_flex_empty_bottom}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_bottom_package}
								${styles.font_style}
							`}
							>
								<p style={{ fontSize: 13 }}>{chargeableWeight}</p>
							</div>
						</div>
					</div>

					<div className={cl`
						${styles.flex_row} 
						${styles.block_dfhjl_container_section} 
					`}
					>
						<p style={{ fontSize: 7 }}> </p>
					</div>

					<div className={cl`
							${styles.flex_col} 
							${styles.border_right_solid}
							${styles.block_egi_container_section}
						`}
					>
						<div className={cl`
								${styles.flex} 
								${styles.flex_border_solid}
								${styles.flex_justify_center}
								${styles.flex_in_flex_empty_top}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.grossweight_text}
							`}
							>
								<p style={{ fontSize: 9 }}>Rate / Charge</p>
							</div>
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_justify_end}
								${styles.flex_in_flex_empty_bottom}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_bottom_package}
								${styles.font_style}
							`}
							>
								<p style={{ fontSize: 13 }}>{formData.ratePerKg}</p>
							</div>
						</div>
					</div>

					<div className={cl`
						${styles.flex_row} 
						${styles.block_dfhjl_container_section} 
					`}
					>
						<p style={{ fontSize: 7 }}> </p>
					</div>

					<div className={cl`
							${styles.flex_col} 
							${styles.border_right_solid}
							${styles.block_k_container_section}
						`}
					>
						<div className={cl`
								${styles.flex} 
								${styles.flex_border_solid}
								${styles.flex_in_flex}
								${styles.flex_justify_center}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.grossweight_text}
							`}
							>
								<p style={{ fontSize: 9 }}>Total</p>
							</div>
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_border_solid}
								${styles.flex_in_flex_b}
								${styles.flex_justify_end}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_bottom_package}
								${styles.font_style}
							`}
							>
								<p style={{ fontSize: 13 }}>
									{((chargeableWeight * formData.ratePerKg) || 0.0).toFixed(2)}
								</p>
							</div>
						</div>
						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_in_flex}
								${styles.flex_justify_end}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.block_a_container_bottom_package}
								${styles.font_style}
							`}
							>
								{((chargeableWeight * formData.ratePerKg) || 0.0).toFixed(2)}
							</div>
						</div>
					</div>

					<div className={cl`
						${styles.flex_row} 
						${styles.block_dfhjl_container_section} 
					`}
					>
						<p style={{ fontSize: 7 }}> </p>
					</div>

					<div className={cl`
							${styles.flex_col} 
							${styles.block_m_container_section}
						`}
					>
						<div className={cl`
								${styles.flex} 
								${styles.flex_border_solid}
								${styles.flex_justify_center}
								${styles.flex_in_flex_empty_top}
							`}
						>
							<div className={cl`
								${styles.flex} 
								${styles.commodity_text_style}
							`}
							>
								<p style={{ fontSize: 9 }}>
									Nature and Quantity of Goods
									<div className={cl`
										${styles.flex} 
										${styles.flex_justify_center}
									`}
									>
										<p style={{ fontSize: 9 }}>(incl. Dimensions or Volume)</p>
									</div>
								</p>
							</div>
						</div>

						<div className={cl`
								${styles.flex} 
								${styles.flex_font_weight}
								${styles.flex_in_flex_empty_bottom}
							`}
						>
							<div className={styles.font_style} style={{ paddingLeft: '4px' }}>{formData.commodity}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ContainerDetails;
