import React from 'react';
import getField from '@cogo/business-modules/form/components';
import { useFormCogo } from '@cogoport/front/hooks';
import { IcMPlus } from '@cogoport/icons-react';
import {
	Container,
	ServiceName,
	AvgMargin,
	IconWrapper,
	ServiceContainer,
	FlexRow,
} from './styles';

const CheckBox = getField('checkbox');

const controls = [
	{
		name: 'isApplicable',
		type: 'checkbox',
		className: 'primary md',
		options: [{ label: 'Not Applicable', value: true }],
	},
];

const ServiceItem = () => {
	const { fields } = useFormCogo(controls || []);

	return (
		<Container>
			<ServiceContainer>
				<div>
					<ServiceName>Vessel Traffic Service</ServiceName>
					<AvgMargin>Average Margin $20</AvgMargin>
				</div>

				<IconWrapper>
					<IcMPlus />
				</IconWrapper>
			</ServiceContainer>

			<FlexRow>
				<CheckBox {...fields.isApplicable} />
			</FlexRow>
		</Container>
	);
};

export default ServiceItem;
