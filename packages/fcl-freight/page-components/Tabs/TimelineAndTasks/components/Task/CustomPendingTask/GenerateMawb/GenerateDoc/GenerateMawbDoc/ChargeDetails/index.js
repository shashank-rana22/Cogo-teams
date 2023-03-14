import React from 'react';
import Text from '@cogoport/front/components/Text';
import { FlexRow, Block } from './styles';
import WeightChargeDetails from './WeightChargeDetails';
import OtherChargeDetails from './OtherChargeDetails';

const ChargeDetails = ({
	data = {},
	shipment_data = {},
	footer_values,
	fields,
	primary_service = {},
}) => {
	return (
		<div>
			<FlexRow className="charge_container">
				<WeightChargeDetails data={data} />
				<OtherChargeDetails
					shipment_data={shipment_data}
					fields={fields}
					primary_service={primary_service}
				/>
			</FlexRow>

			<Block id="footer">
				<Text size={13}>ORIGINAL 1 (FOR ISSUING CARRIER)</Text>
			</Block>
			{footer_values.map((index) => {
				return (
					<div id={`footer${index}`}>
						<Text size={13} />
					</div>
				);
			})}
		</div>
	);
};
export default ChargeDetails;
