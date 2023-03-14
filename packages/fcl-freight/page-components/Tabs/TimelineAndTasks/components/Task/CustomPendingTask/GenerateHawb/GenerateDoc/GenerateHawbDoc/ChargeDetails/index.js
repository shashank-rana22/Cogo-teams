import React from 'react';
import Text from '@cogoport/front/components/Text';
import { FlexRow, Block } from './styles';
import WeightChargeDetails from './WeightChargeDetails';
import OtherChargeDetails from './OtherChargeDetails';

const ChargeDetails = ({ docData }) => {
	return (
		<div>
			<FlexRow className="charge_container">
				<WeightChargeDetails />
				<OtherChargeDetails docData={docData} />
			</FlexRow>

			<Block>
				<Text size={13}>ORIGINAL 1 (FOR ISSUING CARRIER)</Text>
			</Block>
		</div>
	);
};
export default ChargeDetails;
