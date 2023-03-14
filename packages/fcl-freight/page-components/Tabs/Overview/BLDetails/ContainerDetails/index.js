import Grid, { Tag } from '@cogoport/components';
import React from 'react';

import {
	ContainerDescription,
	SerialNumber,
	ContainerNumber,
	Container,
	ContainerItem,
	TagWrapper,
} from './styles';

const { Row, Col } = Grid;

function ConatinerDetails({ containerDetails = [] }) {
	let even = false;
	if (containerDetails?.length / 2 === 0) {
		even = true;
	}

	const className = !even ? 'no-border' : '';

	return (
		<Row>
			<Container>
				{containerDetails?.map((item, index) => (
					<Col md={6} className={`${className} random`}>
						<ContainerItem>
							<ContainerDescription>
								<SerialNumber>{index + 1}</SerialNumber>

								<ContainerNumber>{item?.container_number}</ContainerNumber>

								<TagWrapper>
									<Tag>{item?.container_type}</Tag>
								</TagWrapper>

								<TagWrapper>
									<Tag>{item?.container_size}</Tag>
									{' '}
								</TagWrapper>
							</ContainerDescription>
						</ContainerItem>
					</Col>
				))}
			</Container>
		</Row>
	);
}

export default ConatinerDetails;
