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
	Remarks,
} from './styles';

const getBuyPrice = (dataObj, source) => {
	if (source === 'system_rate') {
		const price = dataObj?.validities?.[0]?.price;
		const currency = dataObj?.validities?.[0]?.currency;
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
	setFileUrl,
	jumpStep1,
	updateConfirmation,
	// selectedRate,
}) => {
	const dataArr = Array.isArray(item?.data) ? item?.data : [item?.data];

	const handleProceed = async ({ updateData = true, rate }) => {
		if (updateData) {
			await updateConfirmation(item);
		}
		const updateItem = rate || item;

		if (updateItem.source === 'bn_salvage') {
			setStep(2);
			setSelectedCard(updateItem);
			const fileUrlArr = [];
			(item?.data || []).forEach((obj) => {
				fileUrlArr.push({ url: obj.url });
			});
			setFileUrl(fileUrlArr);
		}
		if (updateItem.source === 'flash_booking') {
			setStep(1);
			setSelectedCard(updateItem);
		}
		if (updateItem.source === 'system_rate') {
			if (jumpStep1) {
				setStep(2);
			} else {
				setStep(1);
			}

			setSelectedCard(updateItem);
		}
	};

	// if (selectedRate) {
	// 	handleProceed({ updateData: false, rate: selectedRate });
	// }

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
							<Item>
								<Heading>Shipping Line</Heading>
								<SubHeading>
									{dataObj?.reverted_shipping_line?.business_name ||
										dataObj?.operator?.business_name ||
										dataObj?.shipping_line.business_name}
								</SubHeading>
							</Item>
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
				<ButtonWrap
					className={
						dataArr[0]?.remarks || dataArr[0]?.supplier_contract_no
							? 'remarks'
							: ''
					}
				>
					{dataArr[0]?.remarks ? (
						<Remarks>
							<b>Supply Remarks </b>: {dataArr[0].remarks}{' '}
						</Remarks>
					) : null}
					{dataArr[0]?.supplier_contract_no ? (
						<Remarks>
							<b>Supplier Contract No. </b>: {dataArr[0].supplier_contract_no}{' '}
						</Remarks>
					) : null}
					<CustomButton
						onClick={() => {
							handleProceed({ updateData: true });
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
