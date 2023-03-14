import React, { useState } from 'react';
import { Button, toast } from '@cogoport/front/components/admin';
import UpdateRate from './UpdateRate';
import useUpdateRate from './hooks/useUpdateRate';
import useBulkUpdate from './hooks/useBulkUpdate';
import { ButtonDiv, Container } from './styles';
import UpdateServiceProvider from './UpdateServiceProvider';
import useTrailerFreightRateCards from './hooks/useTrailerFreightRateCards';

const handleTrailerServices = (allTrailerDetails) => {
	const result = [];

	Object.keys(allTrailerDetails).forEach((key) => {
		Object.keys(allTrailerDetails[key]).forEach((trailerItem) => {
			const perTrailer = allTrailerDetails[key][trailerItem];

			perTrailer.map((item) => result.push(item));
		});
	});
	return result;
};

const handleServiceIdForTrailer = (formatProps, services) => {
	const temp = formatProps;

	services.forEach((serviceItem) => {
		for (let i = 0; i < temp.length; i += 1) {
			const trailerItem = temp[i];
			if (
				trailerItem.trailer_type === serviceItem.trailer_type &&
				!trailerItem?.isSelect
			) {
				trailerItem.service_id = serviceItem.id;
				trailerItem.isSelect = true;
				break;
			}
		}
	});

	return temp;
};

const TrailerConfirmationBooking = (props) => {
	const { services, onCancel, shipment_data, refetch = () => {} } = props;

	const [finalFormatForHook2, setFinalFormatForHook2] = useState([]);

	const [currentStep, setCurrentStep] = useState('update_service_provider');

	const step0HookData = useTrailerFreightRateCards({ shipment_data, services });

	const { allTrailerDetails } = step0HookData;

	const formattedPropsFor2 = handleTrailerServices(allTrailerDetails);

	const formatedProps = { ...props };

	formatedProps.newServiceCharges = finalFormatForHook2;

	const step2HookData = useUpdateRate(formatedProps);

	const { useEditQuoteData } = step2HookData;

	const { handleSubmit: handleSubmitEditQuote, onCreate } = useEditQuoteData;

	const { updateBulkShipment, handleBulkPayload } = useBulkUpdate({
		shipment_data,
		refetch,
	});

	const totalTrailers = (services || []).filter(
		(item) => item.service_type !== 'subsidiary_service',
	).length;

	const handleCheckDetail = () => {
		if (formattedPropsFor2.length !== totalTrailers) {
			return toast.error('Please select required number of trailers');
		}

		setFinalFormatForHook2(
			handleServiceIdForTrailer(formattedPropsFor2, services),
		);

		setCurrentStep('update_rate');

		return {};
	};

	const handleFinalSubmit = async () => {
		try {
			await updateBulkShipment.trigger({
				data: handleBulkPayload(finalFormatForHook2),
			});

			await handleSubmitEditQuote(onCreate)();

			onCancel();
		} catch (err) {
			toast.error(err?.data?.message || err?.error?.message);
		}
	};

	const steps = {
		update_rate: <UpdateRate {...step2HookData} />,
		update_service_provider: (
			<UpdateServiceProvider {...props} {...step0HookData} />
		),
	};

	return (
		<Container>
			{steps[currentStep]}
			<ButtonDiv>
				<Button onClick={() => onCancel()} style={{ marginRight: 10 }}>
					Cancel
				</Button>
				{currentStep === 'update_rate' ? (
					<>
						<Button
							onClick={() => setCurrentStep('update_service_provider')}
							style={{ marginRight: 10 }}
						>
							Prev
						</Button>
						<Button
							onClick={() => {
								handleFinalSubmit();
							}}
						>
							Submit
						</Button>
					</>
				) : (
					<Button onClick={() => handleCheckDetail()}>Next</Button>
				)}
			</ButtonDiv>
		</Container>
	);
};

export default TrailerConfirmationBooking;
