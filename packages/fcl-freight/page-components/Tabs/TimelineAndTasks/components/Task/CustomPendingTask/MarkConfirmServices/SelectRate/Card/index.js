import React from 'react';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { startCase } from '@cogoport/front/utils';
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
} from './styles';

const getBuyPrice = (dataObj, source) => {
	if (source === 'system_rate') {
		const firstvalidty = dataObj?.validities?.[0] || {};
		const price = firstvalidty?.price || firstvalidty.min_price;
		const currency = dataObj?.validities?.[0].currency;
		return `${currency} ${price}`;
	}

	if (source === 'flash_booking') {
		const price = dataObj?.line_items?.[0]?.price;
		const currency = dataObj?.line_items?.[0]?.currency;
		return `${currency} ${price}`;
	}

	const price = dataObj?.charges?.line_items?.[0]?.price;
	const currency = dataObj?.charges?.line_items?.[0]?.currency;
	return `${currency} ${price}`;
};

const Card = ({
	item,
	priority,
	setStep,
	setSelectedCard,
	updateConfirmation,
}) => {
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];

	const handleProceed = async () => {
		await updateConfirmation(item);
		setSelectedCard(item);
		setStep(2);
	};

	return (
		<Container>
			<Header>
				<Row>
					<PriorityText>({priority} Priority) </PriorityText>
					<PriorityText className="purple">
						{`${startCase(item.source)} Booking Note`}
					</PriorityText>
				</Row>
			</Header>
			<Body>
				{(dataArr || []).map((dataObj) => {
					return (
						<SpaceBetween>
							<Item>
								<Heading>Supplier Name</Heading>
								<SubHeading>
									{dataObj?.service_provider?.business_name}
								</SubHeading>
							</Item>
							{dataObj?.airline?.business_name ? (
								<Item>
									<Heading>Carrier</Heading>
									<SubHeading>
										{dataObj?.operator?.business_name ||
											dataObj?.airline?.business_name}
									</SubHeading>
								</Item>
							) : null}
							<Item>
								<Heading>Source of Rate</Heading>
								<SubHeading>{startCase(item?.source)}</SubHeading>
							</Item>
							<Item>
								<Heading>Buy Rate</Heading>
								<SubHeading>{getBuyPrice(dataObj, item.source)}</SubHeading>
							</Item>
							<Item>
								<Heading>Sailing Date</Heading>
								<SubHeading>
									{formatDate({
										date: new Date(),
										dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType: 'date',
									})}
								</SubHeading>
							</Item>
						</SpaceBetween>
					);
				})}
				<ButtonWrap>
					<CustomButton
						onClick={() => {
							handleProceed();
						}}
					>
						Proceed
					</CustomButton>
				</ButtonWrap>
			</Body>
		</Container>
	);
};

export default Card;
