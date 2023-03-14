import { React, useState } from 'react';
import { startCase } from '@cogoport/front/utils';
import Select from '@cogo/business-modules/form/components/Business/Select';
import useUpdatePrefrence from '../hooks/useUpdatePreference';
import cardValues from './cardValues';
import {
	Container,
	SpaceBetween,
	SubHeading,
	Heading,
	Header,
	PriorityText,
	Row,
	Body,
	Item,
	ButtonWrap,
	CustomButton,
	Text,
} from './styles';

const Card = ({ item, priority, handleUpdateTask }) => {
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];
	const [serviceProvider, setServiceProvider] = useState(
		item?.data?.[0]?.service_provider_id,
	);

	const { handleProceed, loading } = useUpdatePrefrence({
		item,
		serviceProvider,
		handleUpdateTask,
	});

	return (
		<Container>
			<Header>
				<Row>
					<PriorityText>({priority} Priority) </PriorityText>
					<PriorityText className="purple">
						{`${startCase(item?.source)} Booking Note`}
					</PriorityText>
				</Row>
			</Header>
			<Body>
				<SpaceBetween>
					{(dataArr || []).map((dataObj) => {
						return cardValues(dataObj, item)?.map((eachItem) => {
							return (
								<Item>
									<Heading>{eachItem?.label}</Heading>
									<SubHeading>{eachItem?.value}</SubHeading>
								</Item>
							);
						});
					})}
				</SpaceBetween>

				<Text>Choose Service Provider (Fcl Freight Local)</Text>
				<Select
					className="primary lg service_provider"
					placeholder="Select Service Provider"
					value={serviceProvider}
					optionsListKey="verified-service-providers"
					onChange={(value) => setServiceProvider(value)}
				/>

				<ButtonWrap>
					<CustomButton onClick={() => handleProceed()} disabled={loading}>
						Confirm This Prefernce
					</CustomButton>
				</ButtonWrap>
			</Body>
		</Container>
	);
};

export default Card;
