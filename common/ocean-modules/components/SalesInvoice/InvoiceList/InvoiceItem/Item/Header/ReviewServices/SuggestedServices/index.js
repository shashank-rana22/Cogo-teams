import React from 'react';
import ServiceItem from './ServiceItem';
import { Container, Heading, ServiceContainer } from './styles';

const SuggestedServices = () => {
	return (
		<Container>
			<Heading>
				Recommended Services <span style={{ fontWeight: 400 }}>(optional)</span>
			</Heading>

			<ServiceContainer>
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
				<ServiceItem />
			</ServiceContainer>
		</Container>
	);
};

export default SuggestedServices;
