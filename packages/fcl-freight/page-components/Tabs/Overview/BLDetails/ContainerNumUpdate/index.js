import { Input, Button } from '@cogoport/components';
import React, { useState } from 'react';

import useContainerNumUpdate from '../../../../hooks/useContainerNumUpdate';

import {
	Container,
	Heading,
	RenderContainer,
	ButtonContainer,
	ContainerNum,
} from './styles';

function ContainerNmUpdate({
	setEditContainerNum = () => {},
	shipment_data = {},
	refetch = () => {},
}) {
	const [containerValue, setContainerValue] = useState({});

	const { handleSubmit, containerDetails, loading } = useContainerNumUpdate(
		containerValue,
		setEditContainerNum,
		shipment_data,
		refetch,
	);

	const handleChange = (e, container_id) => {
		setContainerValue({ ...containerValue, [container_id]: e.target?.value });
	};

	return (
		<Container>
			<Heading>Update Container Number</Heading>

			{(containerDetails?.list || []).map((container) => (
				<RenderContainer>
					<ContainerNum>{container?.container_number}</ContainerNum>

					<Input
						width="100%"
						value={containerValue[container?.id]}
						onChange={(e) => handleChange(e, container?.id)}
					/>
				</RenderContainer>
			))}

			<ButtonContainer>
				<Button
					className="secondary md"
					onClick={() => setEditContainerNum(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					className="primary md"
					onClick={handleSubmit}
					disabled={loading}
				>
					Submit
				</Button>
			</ButtonContainer>
		</Container>
	);
}

export default ContainerNmUpdate;
