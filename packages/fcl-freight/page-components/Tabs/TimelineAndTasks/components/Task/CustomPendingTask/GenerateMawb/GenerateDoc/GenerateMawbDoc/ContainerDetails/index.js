import React from 'react';
import Text from '@cogoport/front/components/Text';
import { Block, Flex, FlexRow, FlexCol } from './styles';

const ContainerDetails = ({
	primary_service = {},
	formData = {},
	chargeable_weight,
}) => {
	return (
		<div style={{ pointerEvents: 'none' }}>
			<Flex>
				<Block className="block_flex_border handling_information">
					<FlexCol className="inner_handling_information">
						<Text size={10}>Handling Information</Text>
						<Flex className="flex_font_weight vol_weight_box ">
							{formData.handling_information}
						</Flex>
					</FlexCol>

					<FlexCol className="sci_handling_information">
						<Flex className="sci_text_style">
							<Text size={10}>SCI</Text>
						</Flex>
					</FlexCol>
				</Block>
			</Flex>
			<Flex>
				<Block className="block_flex_border container_section">
					<FlexCol className="border_right_solid block_a_container_section">
						<Flex className="flex_border_solid flex_in_flex block_a_container_section_rcp">
							<Text size={7}>No. of Pieces RCP</Text>
						</Flex>

						<Flex className="flex_font_weight flex_border_solid flex_in_flex_b flex_justify_end">
							<Flex className="block_a_container_top_package ">
								<Text size={13}>{primary_service?.packages_count}</Text>
							</Flex>
							<Flex className="block_a_container_volume vol_weight_box">
								<Flex>
									{' '}
									<Text size={11}>
										<div style={{ width: '90px' }}>Volume Weight:</div>
									</Text>
									<Flex className="vol_weight_box">
										<Text size={11} className="volume_box">
											{`${chargeable_weight} Kgs(Cms)`}
										</Text>
									</Flex>
								</Flex>
								<Flex>
									<Flex className="vol_weight_box">
										<Text size={11} className="volume_box">
											{formData.dimension.map((item) => {
												return `${item.length}x${item.width}x${item.height}/${item.packages} `;
											})}
										</Text>
									</Flex>
								</Flex>
								<Flex className="margin_remarks">
									<Text size={10}>Remarks:</Text>
									<Flex className="vol_weight_box">
										<Text size={12} className="volume_box">
											<div className="remark_box">{formData.remark}</div>
										</Text>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
						<Flex className="flex_font_weight flex_in_flex flex_justify_end block_a_container_bottom_package">
							<Text size={13}>{primary_service?.packages_count}</Text>
						</Flex>
					</FlexCol>

					<FlexCol className="border_right_solid block_b_container_section">
						<Flex className="flex_border_solid flex_in_flex flex_justify_center">
							<Flex className="grossweight_text">
								<Text size={8}>Gross Weight</Text>
							</Flex>
						</Flex>
						<Flex className="flex_font_weight flex_border_solid flex_in_flex_b flex_justify_end">
							<Flex className="block_a_container_bottom_package">
								<Text size={13}>{primary_service?.weight?.toFixed(2)}</Text>
							</Flex>
						</Flex>
						<Flex className="flex_font_weight flex_in_flex flex_justify_end">
							<Flex className="block_a_container_bottom_package">
								<Text size={13}>{primary_service?.weight.toFixed(2)}</Text>
							</Flex>
						</Flex>
					</FlexCol>

					<FlexCol className="border_right_solid block_c_container_section">
						<Flex className="flex_border_solid flex_in_flex_empty_top">
							<Text size={8} />
						</Flex>
						<Flex className="flex_font_weight flex_in_flex_empty_bottom">
							<Text size={13}>K</Text>
						</Flex>
					</FlexCol>
					<FlexRow className="block_dfhjl_container_section">
						<Text size={11}> </Text>
					</FlexRow>

					<FlexCol className="border_right_solid block_egi_container_section">
						<FlexCol className="block_e_container_top_section">
							<Flex className="block_e_container_rateclass_section">
								<Text size={7}>Rate Class</Text>
							</Flex>
							<FlexRow className="block_e_container_commodity_section">
								<Flex className="flex_in_flex_empty_top block_e_container_commodity_empty_section" />
								<Flex className="flex_justify_center flex_border_solid flex_in_flex_empty_bottom block_e_container_commodity_text_section">
									<Text size={7}>
										Commodity
										<Flex className="flex_justify_center">
											<Text size={7}>Item No.</Text>
										</Flex>
									</Text>
								</Flex>
							</FlexRow>
						</FlexCol>

						<FlexRow className="block_e_container_bottom_section">
							<Flex className="flex_font_weight flex_in_flex_empty_top block_e_container_Q_section">
								<Text size={13}>Q</Text>
							</Flex>
							<Flex className="flex_in_flex_empty_bottom">
								<Text size={7} />
							</Flex>
						</FlexRow>
					</FlexCol>
					<FlexRow className="block_dfhjl_container_section">
						<Text size={7}> </Text>
					</FlexRow>

					<FlexCol className="border_right_solid block_egi_container_section">
						<Flex className="flex_border_solid flex_justify_center flex_in_flex_empty_top">
							<Flex className="chargeableweight_text">
								<Text size={8}>
									Chargeable
									<Flex className="flex_justify_center">
										<Text size={8}>Weight</Text>
									</Flex>
								</Text>
							</Flex>
						</Flex>
						<Flex className="flex_font_weight flex_justify_end flex_in_flex_empty_bottom">
							<Flex className="block_a_container_bottom_package">
								<Text size={13}>{chargeable_weight}</Text>
							</Flex>
						</Flex>
					</FlexCol>

					<FlexRow className="block_dfhjl_container_section">
						<Text size={7}> </Text>
					</FlexRow>
					<FlexCol className="border_right_solid block_egi_container_section">
						<Flex className="flex_border_solid flex_justify_center flex_in_flex_empty_top">
							<Flex className="grossweight_text">
								<Text size={9}>Rate / Charge</Text>
							</Flex>
						</Flex>
						<Flex className="flex_font_weight flex_justify_end flex_in_flex_empty_bottom">
							<Flex className="block_a_container_bottom_package">
								<Text size={13}>{formData.rate_per_kg}</Text>
							</Flex>
						</Flex>
					</FlexCol>

					<FlexRow className="block_dfhjl_container_section">
						<Text size={7}> </Text>
					</FlexRow>
					<FlexCol className="border_right_solid block_k_container_section">
						<Flex className="flex_border_solid flex_in_flex flex_justify_center">
							<Flex className="grossweight_text">
								<Text size={9}>Total</Text>
							</Flex>
						</Flex>
						<Flex className="flex_font_weight flex_border_solid flex_in_flex_b flex_justify_end">
							<Flex className="block_a_container_bottom_package">
								<Text size={13}>
									{(chargeable_weight * formData.rate_per_kg).toFixed(2)}
								</Text>
							</Flex>
						</Flex>
						<Flex className="flex_font_weight flex_in_flex flex_justify_end">
							<Flex className="block_a_container_bottom_package">
								{(chargeable_weight * formData.rate_per_kg).toFixed(2)}
							</Flex>
						</Flex>
					</FlexCol>

					<FlexRow className="block_dfhjl_container_section">
						<Text size={7}> </Text>
					</FlexRow>
					<FlexCol className="block_m_container_section">
						<Flex className="flex_border_solid flex_justify_center flex_in_flex_empty_top">
							<Flex className="commodity_text_style">
								<Text size={9}>
									Nature and Quantity of Goods
									<Flex className="flex_justify_center">
										<Text size={9}>(incl. Dimensions or Volume)</Text>
									</Flex>
								</Text>
							</Flex>
						</Flex>

						<Flex className="flex_font_weight flex_in_flex_empty_bottom">
							<div style={{ paddingLeft: '4px' }}>{formData.commodity}</div>
						</Flex>
					</FlexCol>
				</Block>
			</Flex>
		</div>
	);
};
export default ContainerDetails;
