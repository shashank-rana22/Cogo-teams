import { Flex } from '@cogoport/front/components';
import React from 'react';
import { IcMPlus } from '@cogoport/icons-react';
import { ServiceName, AvgMargin, IconWrapper, Container } from './styles';

const SuggestedServices = () => {
	return (
		<Container>
			<Flex direction="column" justifyContent="center">
				<ServiceName>Vessel Traffic Service</ServiceName>
				<AvgMargin>Average Margin $20</AvgMargin>
			</Flex>

			<IconWrapper>
				<IcMPlus />
			</IconWrapper>
		</Container>
	);
};

export default SuggestedServices;
