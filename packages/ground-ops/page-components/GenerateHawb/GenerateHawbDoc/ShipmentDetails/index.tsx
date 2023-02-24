import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

interface Props {
	formData?: any;
	primary_service?: any;
}

function ShipmentDetails({ formData = {}, primary_service = {} }:Props) {
	return (
		<div style={{ pointerEvents: 'none' }}>
			<div className={styles.flex}>
				<div className={cl`
					${styles.block_col} 
					${styles.blockcol_in_flex}
					${styles.blockcol_minheight}
					${styles.carrier_information}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.flex_padding_left} 
						${styles.flex_border_solid} 
						${styles.flex_in_flex_b} 
						${styles.input_issuing_agent} 
					`}
					>
						<p style={{ fontSize: 10 }}>Issuing Carrier&apos;s Agent Name and City</p>
						<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold} 
						${styles.input_issuing_agent} 
					`}
						>
							<div style={{ paddingLeft: '2px' }}>
								{formData.agent_name}
								<br />
								{formData.city}
							</div>
						</div>
					</div>
					<div className={cl`
					${styles.block_row} 
					${styles.blockrow_left_padding}
					${styles.blockrow_border}
					${styles.agent_iata_accounting_info}
				`}
					>
						<div className={cl`
						${styles.flex} 
						${styles.flex_border_right} 
						${styles.flex_in_flex} 
					`}
						>
							<p style={{ fontSize: 10 }}>
								{' '}
								Agent&apos;s IATA Code
								<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold} 
					`}
								>
									{formData.iata_code}

								</div>
							</p>
						</div>
						<div className={cl`
						${styles.flex} 
						${styles.flex_padding_left}
						${styles.flex_in_flex}
					`}
						>
							<p style={{ fontSize: 10 }}> Account No.</p>
						</div>
					</div>
				</div>
				<div className={cl`
					${styles.block_row} 
					${styles.agent_iata_accounting_info}
					${styles.accounting_information}
				`}
				>
					<div className={cl`
						${styles.flex} 
						${styles.flex_padding_left}
						${styles.flex_in_flex}
					`}
					>
						<p style={{ fontSize: 10 }}>Accounting Information</p>
					</div>
					<div className={cl`
						${styles.flex} 
						${styles.flex_padding_left}
						${styles.flex_font_bold}
						${styles.flex_justify_center}
						${styles.flex_in_flex}
					`}
					>
						{formData.accounting_information}
					</div>
				</div>
			</div>
			<div className={styles.flex}>
				<div className={cl`
					${styles.block_col} 
					${styles.blockcol_in_flex}
					${styles.blockcol_minheight}
				`}
				>
					<div className={cl`
					${styles.block} 
					${styles.departure_airport}
				`}
					>
						<p style={{ fontSize: 10 }}>
							Airport of Departure (Addr. of First Carrier) and Requested
							Routing
							<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold}
					`}
							>
								<p style={{ fontSize: 12.5 }}>{formData?.origin}</p>
							</div>
						</p>
					</div>

					<div className={cl`
					${styles.block_row} 
					${styles.blockrow_border}
					${styles.currency_declared_value_to_by_flight}
				`}
					>
						<div className={cl`
					${styles.block_row} 
					${styles.blockrow_left_padding}
					${styles.blockrow_border}
					${styles.blockrow_in_flex}
					${styles.to_by_first_carrier}
				`}
						>
							<div className={cl`
						${styles.flex} 
						${styles.flex_border_right}
						${styles.destination_portcode}
					`}
							>
								<p style={{ fontSize: 8 }}>
									To
									<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold}
					`}
									>
										<p style={{ fontSize: 13 }}>
											{primary_service?.destination_airport?.port_code}
										</p>
									</div>
								</p>
							</div>
							<div className={cl`
						${styles.flex_row} 
						${styles.first_carrier}
					`}
							>
								<div className={cl`
						${styles.flex} 
						${styles.by_first_carrier}
					`}
								>
									<div className={cl`
						${styles.flex} 
						${styles.flex_padding_left}
					`}
									>
										<p style={{ fontSize: 9 }}>
											By First Carrier
											{' '}
											<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold}
					`}
											>
												<p style={{ fontSize: 12 }}>
													{primary_service.airline?.iata_code}
												</p>
											</div>
										</p>
									</div>
								</div>
								<div className={cl`
						${styles.flex} 
						${styles.routing_and_destination}
					`}
								>
									<div className={cl`
						${styles.flex} 
						${styles.flex_border_solid}
						${styles.flex_border_right}
					`}
									>
										<p style={{ fontSize: 9 }}>Routing and Destination</p>
									</div>
								</div>
							</div>
						</div>
						<div className={cl`
						${styles.block_row} 
						${styles.blockrow_border}
						${styles.to_by_to}
					`}
						>
							<div className={cl`
						${styles.flex} 
						${styles.flex_border_right}
						${styles.flex_padding_left}
						${styles.to_by}
					`}
							>
								<p style={{ fontSize: 9 }}>to</p>
							</div>
							<div className={cl`
						${styles.flex} 
						${styles.flex_border_right}
						${styles.flex_padding_left}
						${styles.to_by}
					`}
							>
								<p style={{ fontSize: 9 }}>by</p>
							</div>
							<div className={cl`
						${styles.flex} 
						${styles.flex_border_right}
						${styles.flex_padding_left}
						${styles.to_by}
					`}
							>
								<p style={{ fontSize: 9 }}>to</p>
							</div>
							<div className={cl`
						${styles.flex} 
						${styles.flex_padding_left}
						${styles.to_by}
					`}
							>
								<p style={{ fontSize: 9 }}>by</p>
							</div>
						</div>
					</div>

					<div className={cl`
						${styles.block_row} 
						${styles.blockrow_left_padding}
						${styles.blockrow_border}
						${styles.blockrow_in_flex}
					`}
					>
						<div className={cl`
						${styles.flex} 
						${styles.flex_justify_center}
						${styles.flex_border_right}
						${styles.flex_in_flex}
					`}
						>
							<p style={{ fontSize: 9 }}>
								Airport of Destination
								{' '}
								<div className={cl`
						${styles.flex} 
						${styles.flex_font_bold}
						${styles.flex_justify_center}
					`}
								>
									<p style={{ fontSize: 14 }}>{formData?.destination}</p>
								</div>
							</p>
						</div>
						<div className={cl`
						${styles.block_col} 
						${styles.blockcol_in_flex}
						${styles.blockcol_border}
					`}
						>
							<div className={cl`
						${styles.flex_row} 
						${styles.referrence_optional_flight_date_top}
					`}
							>
								<div className={cl`
						${styles.flex} 
						${styles.flex_border_right}
						${styles.requested_flight_date_top_left}
					`}
								/>
								<div className={cl`
						${styles.flex} 
						${styles.flex_border_right}
						${styles.flex_in_flex}
						${styles.flex_border_solid}
					`}
								>
									<div className={cl`
					${styles.flex} 
					${styles.requested_flight_date_text}
				`}
									>
										<p style={{ fontSize: 9 }}>Requested Flight/Date</p>
									</div>
								</div>
								<div className={cl`
					${styles.flex} 
					${styles.requested_flight_date_top_right}
				`}
								/>
								<div className={cl`
					${styles.flex_row} 
					${styles.requested_wtval_other}
				`}
								>
									<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.flex_in_flex}
				`}
									/>
									<div className={cl`
					${styles.flex} 
					${styles.flex_in_flex}
				`}
									/>

								</div>
							</div>
						</div>
					</div>

					<div className={cl`
					${styles.block_col} 
					${styles.blockcol_in_flex}
					${styles.blockcol_minheight}
					${styles.optional_shipping_information}

				`}
					>

						<div className={cl`
					${styles.block_col} 
					${styles.blockcol_border}
					${styles.referrence_optional}
				`}
						>
							<div className={cl`
					${styles.flex_row} 
					${styles.referrence_optional_flight_date_top}
				`}
							>
								<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.flex_in_flex}
				`}
								>
									<div className={cl`
					${styles.flex} 
					${styles.flex_padding_left}
				`}
									>
										<p style={{ fontSize: 9 }}>Reference Number</p>
									</div>
								</div>
								<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.flex_in_flex}
					${styles.flex_border_solid}
				`}
								>
									<div className={cl`
					${styles.flex} 
					${styles.optional_shipping_text}
				`}
									/>
									<p style={{ fontSize: 8 }}>Optional Shipping Information</p>
								</div>
								<div className={cl`
					${styles.flex} 
					${styles.flex_in_flex}
				`}
								>
									<p style={{ fontSize: 9 }} />
								</div>
							</div>
							<div className={cl`
					${styles.flex_row} 
					${styles.referrence_optional_bottom}
				`}
							>
								<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.flex_in_flex_c}
				`}
								>
									<p style={{ fontSize: 9 }} />
								</div>
								<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.referrence_optional_bottom_middle}
				`}
								>
									<p style={{ fontSize: 9 }} />
								</div>
								<div className={cl`
					${styles.flex} 
					${styles.flex_in_flex_c}
				`}
								>
									<p style={{ fontSize: 9 }} />
								</div>
							</div>
						</div>
						<div className={cl`
					${styles.block_row} 
					${styles.blockrow_border}
					${styles.currency_declared_value_to_by_flight}
				`}
						>
							<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.flex_in_flex_c}
					${styles.currency_section}
				`}
							>
								<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.currency_top_chgs}
				`}
								>
									<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_border_right}
					${styles.currency}
				`}
									>
										<div className={cl`
					${styles.flex} 
					${styles.currency_top_chgs}
				`}
										>
											<p style={{ fontSize: 9 }}>Currency</p>
										</div>
										<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.flex_in_flex_d}
				`}
										>
											<p style={{ fontSize: 13 }}>{formData.currency}</p>
										</div>
									</div>
									<div className={cl`
					${styles.flex} 
					${styles.chgs}
				`}
									>
										<p style={{ fontSize: 8 }}>CHGS</p>
									</div>
								</div>
								<div className={cl`
					${styles.flex} 
					${styles.flex_in_flex_d}
				`}
								>
									<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_border_right}
					${styles.flexcol_in_flex}
				`}
									>
										<div className={cl`
					${styles.flex} 
					${styles.flex_border_solid}
					${styles.optional_shipping_text}
					${styles.wtval_top}
				`}
										>
											<p style={{ fontSize: 9 }}>WT/VAL</p>
										</div>
										<div className={cl`
					${styles.flex_row} 
					${styles.requested_wtval_other}
				`}
										>
											<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_border_right}
					${styles.flexcol_in_flex}
				`}
											>
												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.wtval_other_bottom_left_ppd_coll}
				`}
												>
													<p style={{ margin: '2px 0px', fontSize: 7 }}>
														PPD
													</p>
												</div>
												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.flex_in_flex_b}
				`}
												>
													<p style={{ fontSize: 12 }}>P</p>
												</div>
											</div>
											<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_in_flex}
				`}
											>
												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.flex_in_flex}
				`}

												>
													<p style={{ margin: '2px 0px', fontSize: 7 }}>
														COLL
													</p>
												</div>
												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.flex_in_flex_b}
				`}
												>
													<p style={{ fontSize: 8 }} />
												</div>
											</div>
										</div>
									</div>
									<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_in_flex}
				`}
									>
										<div className={cl`
					${styles.flex} 
					${styles.flex_border_solid}
					${styles.optional_shipping_text}
					${styles.other_top}
				`}
										>
											<p style={{ fontSize: 9 }}>Other</p>
										</div>
										<div className={cl`
					${styles.flex_row} 
					${styles.requested_wtval_other}
				`}
										>

											<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_border_right}
					${styles.flexcol_in_flex}
				`}
											>

												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.wtval_other_bottom_left_ppd_coll}
				`}
												>
													<p style={{ margin: '2px 0px', fontSize: 7 }}>
														PPD
													</p>
												</div>
												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.flex_in_flex_b}
				`}
												>
													<p style={{ fontSize: 12 }}>P</p>
												</div>
											</div>
											<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_in_flex}
				`}
											>
												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.wtval_other_bottom_left_ppd_coll}
				`}
												>

													<p style={{ margin: '2px 0px', fontSize: 7 }}>
														COLL
													</p>
												</div>
												<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.flex_in_flex_b}
				`}
												>
													<p style={{ fontSize: 8 }} />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className={cl`
					${styles.flex} 
					${styles.flex_border_right}
					${styles.declared_carriage}
					${styles.declared_carriage_box}
				`}
							>
								<p style={{ fontSize: 8.3 }}>Declared Value for Carriage</p>
								{formData.declared_value_for_carriage}
							</div>
							<div className={cl`
					${styles.flex} 
					${styles.flex_padding_left}
					${styles.flex_in_flex_c}
				`}
							>
								<div className={styles.flex_col}>
									<p style={{ fontSize: 8.3 }}>Declared Value for Customs</p>
									{formData.value_for_custom}
								</div>
							</div>
						</div>
						<div className={cl`
					${styles.block_row} 
					${styles.blockrow_border}
					${styles.blockrow_in_flex}
				`}
						>
							<div className={cl`
					${styles.flex_col} 
					${styles.flexcol_border_right}
					${styles.amount_of_insurance}
				`}
							>
								<div className={cl`
					${styles.flex} 
					${styles.flex_justify_center}
					${styles.amount_of_insurance_top}
				`}
								>
									<p style={{ fontSize: 9 }}>Amount of Insurance</p>
								</div>
								<div className={cl`
					${styles.flex} 
					${styles.flex_font_bold}
					${styles.flex_justify_center}
					${styles.amount_of_insurance_bottom}
				`}
								>
									<p style={{ fontSize: 15 }}>NIL</p>
								</div>
							</div>
							<div className={cl`
					${styles.flex} 
					${styles.flex_padding_left}
					${styles.insurance}
				`}
							>
								<p style={{ fontSize: 8 }} className="text">
									INSURANCE - If carrier offers insurance, and such insurance is
									requested in accordance with the conditions thereof, indicate
									amount to be insured in figures in box marked “Amount of
									Insurance”.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ShipmentDetails;
