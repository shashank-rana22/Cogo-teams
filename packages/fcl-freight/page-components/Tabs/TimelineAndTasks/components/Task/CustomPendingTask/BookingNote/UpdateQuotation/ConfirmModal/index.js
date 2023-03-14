import React from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { Button, toast } from '@cogoport/front/components/admin';
import { IcMInfo } from '@cogoport/icons-react';
import SelectController from '@cogo/business-modules/form/components/Controlled/SelectController';
import controls from './controls';
import {
	ModalStyled,
	Heading,
	Container,
	Title,
	Info,
	ButtonDiv,
	Description,
	Header,
	Controller,
	ControllerService,
	Lable,
} from './styles';

const ConfirmModal = ({
	confirmModal,
	setConfirmModal,
	airInput,
	localAirInput,
	handleSubmit,
	onCreate,
	reallocationFunc = () => {},
	confirmLoading,
	watchServiceProvider,
}) => {
	const { fields } = useFormCogo(controls(airInput, localAirInput));

	const isCogoXpress =
		(watchServiceProvider?.normal_service_provider &&
			watchServiceProvider?.local_service_provider) ===
		'536abfe7-eab8-4a43-a4c3-6ff318ce01b5';

	const isAnyCarrier =
		(watchServiceProvider?.normal_airline &&
			watchServiceProvider?.local_airline) ===
		'30798ff1-992c-48f0-aabd-eb92e98df747';

	const handleFinalSubmit = async () => {
		if (isCogoXpress) {
			toast.error('Please Select another Service Provider than CogoXpress');
		} else if (isAnyCarrier) {
			toast.error('Please Select another Airline than Any Carrier');
		} else {
			handleSubmit(onCreate)();
			reallocationFunc();
		}
		setConfirmModal(false);
	};

	return (
		<>
			{' '}
			<ModalStyled
				show={confirmModal}
				onClose={() => setConfirmModal(false)}
				className="secondary lg"
				position="secondary lg"
				onOuterClick={() => setConfirmModal(false)}
			>
				<Header>
					<IcMInfo width={24} height={24} fill="#CB6464" />

					<Heading>Please confirm your input</Heading>
				</Header>
				<Container>
					<Title>For Air Freight</Title>
					{airInput?.airline_id && (
						<Info>
							<Description>
								<Lable>Airline:</Lable>
								<Controller>
									<SelectController {...fields.airline_id} />
								</Controller>
							</Description>
						</Info>
					)}
					<Info>
						<Description>
							<Lable>Service Provider:</Lable>
							<ControllerService>
								<SelectController {...fields.service_provider_id} />
							</ControllerService>
						</Description>
					</Info>

					{localAirInput?.airline_id && (
						<>
							<Title>For Air Freight Local</Title>
							<Info>
								<Description>
									<Lable>Airline:</Lable>
									<Controller>
										<SelectController {...fields.local_airline_id} />
									</Controller>
								</Description>
							</Info>
							<Info>
								<Description>
									<Lable>Service Provider:</Lable>
									<ControllerService>
										<SelectController {...fields.local_service_provider_id} />
									</ControllerService>
								</Description>
							</Info>
						</>
					)}
					<ButtonDiv>
						<Button
							className="secondary md cancel"
							onClick={() => {
								setConfirmModal(false);
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								handleFinalSubmit();
							}}
							disabled={confirmLoading}
						>
							Confirm
						</Button>
					</ButtonDiv>
				</Container>
			</ModalStyled>
		</>
	);
};

export default ConfirmModal;
