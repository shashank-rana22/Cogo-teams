import React from 'react';
import Text from '@cogoport/front/components/Text';
import { Block, Flex, BlockCol, BlockRow, FlexRow, FlexCol } from './styles';

const ShipmentDetails = ({ formData = {}, primary_service = {} }) => {
	return (
		<div style={{ pointerEvents: 'none' }}>
			{' '}
			<Flex>
				<BlockCol className="blockcol_in_flex blockcol_minheight carrier_information">
					<Flex className="flex_padding_left flex_border_solid flex_in_flex_b input_issuing_agent">
						<Text size={10}>Issuing Carrier&apos;s Agent Name and City</Text>
						<Flex className="flex_font_bold input_issuing_agent">
							<div style={{ paddingLeft: '2px' }}>
								{formData.agent_name}
								<br />
								{formData.city}
							</div>
						</Flex>
					</Flex>

					<BlockRow className="blockrow_left_padding blockrow_border agent_iata_accounting_info">
						<Flex className="flex_border_right flex_in_flex">
							<Text size={10}>
								{' '}
								Agent&apos;s IATA Code
								<Flex className="flex_font_bold">{formData.iata_code}</Flex>
							</Text>
						</Flex>
						<Flex className="flex_padding_left flex_in_flex">
							<Text size={10}> Account No.</Text>
						</Flex>
					</BlockRow>
				</BlockCol>

				<BlockRow className="agent_iata_accounting_info accounting_information">
					<Flex className="flex_padding_left flex_in_flex">
						<Text size={10}>Accounting Information</Text>
					</Flex>
					<Flex className="flex_padding_left flex_font_bold flex_justify_center flex_in_flex">
						{formData.accounting_information}
					</Flex>
				</BlockRow>
			</Flex>
			<Flex>
				<BlockCol className="blockcol_in_flex blockcol_minheight">
					<Block className="departure_airport">
						<Text size={10}>
							Airport of Departure (Addr. of First Carrier) and Requested
							Routing
							<Flex className="flex_font_bold">
								<Text size={12.5}>{formData?.origin_airport}</Text>
							</Flex>
						</Text>
					</Block>

					<BlockRow className="blockrow_border currency_declared_value_to_by_flight">
						<BlockRow className="blockrow_left_padding blockrow_border blockrow_in_flex to_by_first_carrier">
							<Flex className="flex_border_right destination_portcode">
								<Text size={8}>
									To
									<Flex className="flex_font_bold">
										<Text size={13}>
											{primary_service?.destination_airport?.port_code}
										</Text>
									</Flex>
								</Text>
							</Flex>
							<FlexRow className="first_carrier">
								<Flex className="by_first_carrier">
									<Flex className="flex_padding_left">
										<Text size={9}>
											By First Carrier{' '}
											<Flex className="flex_font_bold">
												<Text size={12}>
													{primary_service.airline?.iata_code}
												</Text>
											</Flex>
										</Text>
									</Flex>
								</Flex>
								<Flex className="routing_and_destination">
									<Flex className="flex_border_solid flex_border_right">
										<Text size={9}>Routing and Destination</Text>
									</Flex>
								</Flex>
							</FlexRow>
						</BlockRow>

						<BlockRow className="blockrow_border to_by_to">
							<Flex className="flex_border_right flex_padding_left to_by">
								<Text size={9}>to</Text>
							</Flex>
							<Flex className="flex_border_right flex_padding_left to_by">
								<Text size={9}>by</Text>
							</Flex>
							<Flex className="flex_border_right flex_padding_left to_by">
								<Text size={9}>to</Text>
							</Flex>
							<Flex className="flex_padding_left to_by">
								<Text size={9}>by</Text>
							</Flex>
						</BlockRow>
					</BlockRow>

					<BlockRow className="blockrow_left_padding blockrow_border blockrow_in_flex">
						<Flex className="flex_justify_center flex_border_right flex_in_flex">
							<Text size={9}>
								Airport of Destination{' '}
								<Flex className="flex_font_bold flex_justify_center">
									<Text size={14}>{formData?.destination_airport}</Text>
								</Flex>
							</Text>
						</Flex>
						<BlockCol className="blockcol_in_flex blockcol_border">
							<FlexRow className="referrence_optional_flight_date_top">
								<Flex className="flex_border_right requested_flight_date_top_left" />
								<Flex className="flex_border_right flex_in_flex flex_border_solid">
									<Flex className="requested_flight_date_text">
										<Text size={9}>Requested Flight/Date</Text>
									</Flex>
								</Flex>
								<Flex className="requested_flight_date_top_right" />
							</FlexRow>
							<FlexRow className="requested_wtval_other">
								<Flex className="flex_border_right flex_in_flex" />
								<Flex className="flex_in_flex" />
							</FlexRow>
						</BlockCol>
					</BlockRow>
				</BlockCol>

				<BlockCol className="blockcol_in_flex blockcol_minheight optional_shipping_information">
					<BlockCol className="blockcol_border referrence_optional">
						<FlexRow className="referrence_optional_flight_date_top">
							<Flex className="flex_border_right flex_in_flex ">
								<Flex className="flex_padding_left">
									<Text size={9}>Reference Number</Text>
								</Flex>
							</Flex>
							<Flex className="flex_border_right flex_in_flex flex_border_solid">
								<Flex className="optional_shipping_text" />
								<Text size={8}>Optional Shipping Information</Text>
							</Flex>
							<Flex className="flex_in_flex">
								<Text size={9} />
							</Flex>
						</FlexRow>
						<FlexRow className="referrence_optional_bottom">
							<Flex className="flex_border_right flex_in_flex_c">
								<Text size={9} />
							</Flex>
							<Flex className="flex_border_right referrence_optional_bottom_middle">
								<Text size={9} />
							</Flex>
							<Flex className="flex_in_flex_c">
								<Text size={9} />
							</Flex>
						</FlexRow>
					</BlockCol>
					<BlockRow className="blockrow_border currency_declared_value_to_by_flight">
						<Flex className="flex_border_right flex_in_flex_c currency_section">
							<Flex className="flex_border_right currency_top_chgs">
								<FlexCol className="flexcol_border_right currency">
									<Flex className="currency_top_chgs">
										<Text size={9}>Currency</Text>
									</Flex>
									<Flex className="flex_font_bold flex_justify_center flex_in_flex_d">
										<Text size={13}>{formData.currency}</Text>
									</Flex>
								</FlexCol>
								<Flex className="chgs">
									<Text size={8}>CHGS</Text>
								</Flex>
							</Flex>
							<Flex className="flex_in_flex_d">
								<FlexCol className="flexcol_border_right flexcol_in_flex">
									<Flex className="flex_border_solid optional_shipping_text wtval_top">
										<Text size={9}>WT/VAL</Text>
									</Flex>
									<FlexRow className="requested_wtval_other">
										<FlexCol className="flexcol_border_right flexcol_in_flex">
											<Flex className="flex_font_bold flex_justify_center wtval_other_bottom_left_ppd_coll">
												<Text style={{ margin: '2px 0px' }} size={7}>
													PPD
												</Text>
											</Flex>
											<Flex className="flex_font_bold flex_justify_center flex_in_flex_b">
												<Text size={12}>P</Text>
											</Flex>
										</FlexCol>
										<FlexCol className="flexcol_in_flex">
											<Flex className="flex_font_bold flex_justify_center flex_in_flex">
												<Text style={{ margin: '2px 0px' }} size={7}>
													COLL
												</Text>
											</Flex>
											<Flex className="flex_font_bold flex_justify_center flex_in_flex_b">
												<Text size={8} />
											</Flex>
										</FlexCol>
									</FlexRow>
								</FlexCol>
								<FlexCol className="flexcol_in_flex">
									<Flex className="flex_border_solid optional_shipping_text other_top">
										<Text size={9}>Other</Text>
									</Flex>
									<FlexRow className="requested_wtval_other">
										<FlexCol className="flexcol_border_right flexcol_in_flex">
											<Flex className="flex_font_bold flex_justify_center wtval_other_bottom_left_ppd_coll">
												<Text style={{ margin: '2px 0px' }} size={7}>
													PPD
												</Text>
											</Flex>
											<Flex className="flex_font_bold flex_justify_center flex_in_flex_b">
												<Text size={12}>P</Text>
											</Flex>
										</FlexCol>
										<FlexCol className="flexcol_in_flex">
											<Flex className="flex_font_bold flex_justify_center wtval_other_bottom_left_ppd_coll">
												<Text style={{ margin: '2px 0px' }} size={7}>
													COLL
												</Text>
											</Flex>
											<Flex className="flex_font_bold flex_justify_center flex_in_flex_b">
												<Text size={8} />
											</Flex>
										</FlexCol>
									</FlexRow>
								</FlexCol>
							</Flex>
						</Flex>
						<Flex className="flex_border_right declared_carriage  declared_carriage_box">
							<Text size={8.3}>Declared Value for Carriage</Text>
							{formData.declared_value_for_carriage}
						</Flex>
						<Flex className="flex_padding_left flex_in_flex_c">
							<FlexCol>
								<Text size={8.3}>Declared Value for Customs</Text>
								{formData.value_for_custom}
							</FlexCol>
						</Flex>
					</BlockRow>

					<BlockRow className="blockrow_border blockrow_in_flex">
						<FlexCol className="flexcol_border_right amount_of_insurance">
							<Flex className="flex_justify_center amount_of_insurance_top">
								<Text size={9}>Amount of Insurance</Text>
							</Flex>
							<Flex className="flex_font_bold flex_justify_center amount_of_insurance_bottom">
								<Text size={15}>NIL</Text>
							</Flex>
						</FlexCol>
						<Flex className="flex_padding_left insurance">
							<Text size={8} className="text">
								INSURANCE - If carrier offers insurance, and such insurance is
								requested in accordance with the conditions thereof, indicate
								amount to be insured in figures in box marked “Amount of
								Insurance”.
							</Text>
						</Flex>
					</BlockRow>
				</BlockCol>
			</Flex>
		</div>
	);
};
export default ShipmentDetails;
