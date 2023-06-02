import { Button, toast } from '@cogoport/components';
import { useState } from 'react';

import useFTLFreightRateCards from './hooks/useFTLFreightRateCards';
import useUpdateBulkServices from './hooks/useUpdateBulkServices';
import useUpdateRate from './hooks/useUpdateRate';
import styles from './styles.module.css';
import UpdateRate from './UpdateRate';
import UpdateServiceProvider from './UpdateServiceProvider';

const handleTruckServices = (allTruckDetails) => {
	const result = [];

	Object.keys(allTruckDetails).forEach((key) => {
		Object.keys(allTruckDetails[key]).forEach((truckItem) => {
			const perTruck = allTruckDetails[key][truckItem];

			perTruck.map((item) => result.push(item));
		});
	});

	return result;
};

const handleServiceIdForTruck = (formatProps, services) => {
	const temp = formatProps;

	services.forEach((serviceItem) => {
		for (let i = 0; i < temp.length; i += 1) {
			const truckItem = temp[i];
			if (
				truckItem.truck_type === serviceItem.truck_type
				&& !truckItem?.isSelect
			) {
				truckItem.service_id = serviceItem.id;
				truckItem.isSelect = true;
				break;
			}
		}
	});

	return temp;
};

function ConfirmationBooking(props) {
	const { services, onCancel, shipment_data } = props;

	const [finalFormatForHook2, setFinalFormatForHook2] = useState([]);

	const [currentStep, setCurrentStep] = useState('update_service_provider');

	const step0HookData = useFTLFreightRateCards({ shipment_data, services });

	const { allTruckDetails, serviceProviderData } = step0HookData;

	const formattedPropsFor2 = handleTruckServices(allTruckDetails);

	const formatedProps = { ...props, serviceProviderData, allTruckDetails };

	formatedProps.newServiceCharges = finalFormatForHook2;

	const step2HookData = useUpdateRate(formatedProps);

	const { useEditQuoteData } = step2HookData;

	const { handleSubmit: handleSubmitEditQuote, onCreate } = useEditQuoteData;

	const { updateBulkShipment, handleBulkPayload } = useUpdateBulkServices({
		shipment_data,
	});

	const totalTrucks = (services || []).filter(
		(item) => item.service_type !== 'subsidiary_service',
	).length;

	const handleCheckDetail = () => {
		if (formattedPropsFor2.length !== totalTrucks) {
			return toast.error('Please select required number of trucks');
		}

		setFinalFormatForHook2(
			handleServiceIdForTruck(formattedPropsFor2, services),
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
		update_rate             : <UpdateRate {...step2HookData} />,
		update_service_provider : (
			<UpdateServiceProvider {...props} {...step0HookData} />
		),
	};

	return (
		<div>
			{steps[currentStep]}
			<div className={styles.button_div}>
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
			</div>
		</div>
	);
}

export default ConfirmationBooking;
