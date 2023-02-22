/* eslint-disable @typescript-eslint/naming-convention */
import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	formData?: any;
	primary_service?: any;
}

function ShipperConsigneeDetails({ formData = {}, primary_service = {} }:Props) {
	const { master_airway_bill_number = '' } = primary_service;
	return (
		<div style={{ pointerEvents: 'none' }}>
			<div className={cl`
				${styles.flex} 
				${styles.mawb_number} 
			`}
			>
				<div className={cl`
					${styles.flex_row} 
					${styles.mawb_number_division} 
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold} 
						${styles.mawb_number_subdivision} 
					`}
					>
						<p style={{ fontSize: 14 }}>{master_airway_bill_number?.substring(0, 3)}</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold} 
						${styles.mawb_number_subdivision_portcode} 
					`}
					>
						<p style={{ fontSize: 14 }}>{primary_service?.origin_airport?.port_code}</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold} 
						${styles.mawb_number_subdivision_second} 
					`}
					>
						<p style={{ fontSize: 14 }}>{master_airway_bill_number?.substring(4, 13)}</p>
					</div>
				</div>
				<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold} 
					${styles.mawb_bill_number} 
				`}
				>
					<p style={{ fontSize: 14 }}>{master_airway_bill_number}</p>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={cl`
					${styles.block} 
					${styles.shipper_consignee_details} 
				`}
				>
					<div style={{ display: 'flex' }}>
						<div className={cl`
							${styles.flex_row} 
							${styles.shipper_consignee_name_address} 
						`}
						>

							<p style={{ fontSize: 10 }}>Shipper&apos;s Name and Address</p>
						</div>
						<div className={cl`
							${styles.flex_col} 
							${styles.shipper_consignee_account_number} 
						`}
						>

							<p style={{ fontSize: 10 }}>Shipper&apos;s Account Number</p>
						</div>
					</div>
					<div>
						<div className={cl`
							${styles.flex} 
							${styles.flex_font_bold} 
						`}
						>
							<div className={styles.styled_text_area}>

								{formData.shipper_name}
								<br />
								{formData.shipper_address}
							</div>
						</div>
					</div>
				</div>
				<div className={cl`
					${styles.block_col} 
					${styles.issuedby_validation_conditions} 
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.flex_left_padding} 
						${styles.not_negotiable_issuedby} 
					`}
					>
						<p style={{ fontSize: 10 }}>Not Negotiable</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold} 
						${styles.flex_left_padding} 
						${styles.airway_bill} 
					`}
					>
						<p style={{ fontSize: 14.5 }}>Air Waybill</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.flex_left_padding} 
						${styles.not_negotiable_issuedby} 
					`}
					>
						<p style={{ fontSize: 10 }}>Issued By</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold} 
						${styles.flex_left_padding} 
						${styles.business_name} 
					`}
					>

						<p style={{ fontSize: 14.5 }}>{primary_service?.airline?.business_name}</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.flex_left_padding} 
						${styles.same_validity} 
					`}
					>
						<p style={{ fontSize: 10 }}>
							Copies 1, 2 and 3 of this Air Waybill are originals and have the
							same validity.
						</p>
					</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={cl`
					${styles.block} 
					${styles.shipper_consignee_details} 
				`}
				>
					<div style={{ display: 'flex' }}>
						<div className={cl`
							${styles.flex_row} 
							${styles.shipper_consignee_name_address} 
						`}
						>
							<p style={{ fontSize: 10 }}>Consignee&apos;s Name and Address</p>
						</div>
						<div className={cl`
							${styles.flex_col} 
							${styles.shipper_consignee_account_number} 
						`}
						>

							<p style={{ fontSize: 10 }}>Consignee&apos;s Account Number</p>
						</div>
					</div>

					<div>
						<div className={cl`
							${styles.flex} 
							${styles.flex_font_bold} 
						`}
						>
							<div className={styles.styled_text_area}>
								{formData.consignee_name}
								<br />
								{formData.consignee_address}
							</div>
						</div>
					</div>
				</div>
				<div className={cl`
					${styles.block} 
					${styles.issuedby_validation_conditions} 
				`}
				>
					<div className={cl`
							${styles.flex} 
							${styles.flex_left_padding} 
						`}
					>
						<p style={{ fontSize: 9 }} className={styles.text}>
							It is agreed that the goods declared herein are accepted in
							apparent good order and condition (except as noted) for carriage
							SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL
							GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING ROAD OR ANY
							OTHER CARRIER UNLESS SPECIFIC CONTRARY INSTRUCTIONS ARE GIVEN
							HEREON BY THE SHIPPER, AND SHIPPER AGREES THAT THE SHIPMENT MAY BE
							CARRIED VIA INTERMEDIATE STOPPING PLACES WHICH THE CARRIER DEEMS
							APPROPRIATE. THE SHIPPER&apos;S ATTENTION IS DRAWN TO THE NOTICE
							CONCERNING CARRIER&apos;S LIMITATION OF LIABILITY. Shipper may
							increase such limitation of liability by declaring a higher value
							for carriage and paying a supplemental charge if required.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ShipperConsigneeDetails;
