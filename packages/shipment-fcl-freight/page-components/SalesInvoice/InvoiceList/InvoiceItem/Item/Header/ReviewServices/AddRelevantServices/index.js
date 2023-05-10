import React from 'react';
import ServiceItem from './ServiceItem';
import { Container, Heading, ServiceContainer } from './styles';

const AddRelevantServices = () => {
	return (
		<Container>
			<Heading>
				Please add all relevant services sold to the customer, or confirm that
				they don’t apply to this shipment.
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

export default AddRelevantServices;
