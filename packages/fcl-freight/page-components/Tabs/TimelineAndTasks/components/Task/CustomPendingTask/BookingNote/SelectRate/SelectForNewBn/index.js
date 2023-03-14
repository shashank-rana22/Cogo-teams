import { useState } from 'react';
import {
	Container,
	SelectWrap,
	Label,
	ModeWrapper,
	Value,
	ButtonWrap,
	FlexRow,
	CustomButton,
	ServiceProviders,
	ErrorText,
} from './styles.js';

const SelectForNewBn = ({
	Select,
	fields,
	setStep,
	jumpStep1,
	services,
	handleSubmit,
	source = '',
}) => {
	const [errors, setErrors] = useState({});

	const onError = (err) => {
		setErrors({ ...err });
	};

	const setStepForOne = () => {
		setStep(1);
	};

	const getSource = () => {
		if (source) {
			return source
				.split('_')
				.map((ele) => ele.toUpperCase())
				.join(' ');
		}
		return 'NORMAL BOOKING';
	};
	return (
		<Container>
			<ModeWrapper>
				<Label>Mode of booking</Label>
				<Value>{getSource()}</Value>
			</ModeWrapper>

			<FlexRow>
				<SelectWrap>
					<Label>
						Shipping Line (Fcl Freight) :
						<ServiceProviders>
							{(services || []).find(
								(serviceObj) =>
									serviceObj?.service_type === 'fcl_freight_service',
							)?.shipping_line?.business_name || ''}
						</ServiceProviders>
					</Label>
					<Select {...fields.shipping_line_id_fcl_main} />
					<ErrorText>{errors?.shipping_line_id_fcl_main?.message}</ErrorText>
				</SelectWrap>
				<SelectWrap>
					<Label>
						Service Provider (Fcl Freight) :
						<ServiceProviders>
							{
								(services || []).find(
									(serviceObj) =>
										serviceObj?.service_type === 'fcl_freight_service',
								)?.service_provider?.business_name
							}
						</ServiceProviders>
					</Label>
					<Select {...fields.service_provider_id_fcl_main} />
					<ErrorText>{errors?.service_provider_id_fcl_main?.message}</ErrorText>
				</SelectWrap>
			</FlexRow>
			<FlexRow>
				<SelectWrap>
					<Label>Shipping Line (Fcl Freight local)</Label>
					<Select {...fields.shipping_line_id_fcl_local} />
					<ErrorText>{errors?.shipping_line_id_fcl_local?.message}</ErrorText>
				</SelectWrap>
				<SelectWrap>
					<Label>
						Service Provider (Fcl Freight Local) :
						<ServiceProviders>
							{
								(services || []).find(
									(serviceObj) =>
										serviceObj?.service_type === 'fcl_freight_local_service',
								)?.service_provider?.business_name
							}
						</ServiceProviders>
					</Label>
					<Select {...fields.service_provider_id_fcl_local} />
					<ErrorText>
						{errors?.service_provider_id_fcl_local?.message}
					</ErrorText>
				</SelectWrap>
			</FlexRow>
			<ButtonWrap>
				<CustomButton
					onClick={() => {
						if (jumpStep1) {
							setStep(2);
						} else {
							handleSubmit(setStepForOne, onError)();
						}
					}}
				>
					Proceed
				</CustomButton>
			</ButtonWrap>
		</Container>
	);
};

export default SelectForNewBn;
