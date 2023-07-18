import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useContext, useState } from 'react';

import Step0 from './components/Step0';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import getFormattedRates from './helpers/getFormattedRates';
import useGetStep0Data from './helpers/useGetStep0Data';
import useGetStep1Data from './helpers/useGetStep1Data';
import useGetStep2Data from './helpers/useGetStep2Data';
import useGetStep3Data from './helpers/useGetStep3Data';

function UploadBookingNote({
	task = {},
	onCancel = () => {},
	taskListRefetch = () => {},
}) {
	const THREE = 3;
	const ONE = 1;
	const TWO = 2;
	const { primary_service, shipment_data, servicesList } = useContext(ShipmentDetailContext);

	let initialStep = 0;
	let skipStep0 = false;

	if (primary_service?.trade_type === 'import') {
		initialStep = THREE;
		skipStep0 = true;
	}

	if (task.tags && task.tags?.length) initialStep = Number(task.tags[GLOBAL_CONSTANTS.zeroth_index]) + ONE;

	const [step, setStep] = useState(initialStep);
	const [fileUrl, setFileUrl] = useState();

	const step0_data = useGetStep0Data({ shipment_data, task, servicesList });
	let selectedRate = step0_data.selectedServiceProvider || undefined;

	if (initialStep === THREE) {
		const selected_priorities = (step0_data.listBookingPreferences || [])
			.filter((item) => item.priority === item.selected_priority);
		selectedRate = selected_priorities;
	}

	const formattedRate = getFormattedRates(selectedRate, task.service_type);

	const step1_data = useGetStep1Data({ setFileUrl });

	const step2_data = useGetStep2Data({
		primary_service,
		shipment_data,
		task,
		step0_data,
		formattedRate,
		fileUrl,
		servicesList,
		setStep,
	});

	const step3_data = useGetStep3Data({
		primary_service,
		servicesList,
		shipment_data,
		onCancel,
		task,
		taskListRefetch,
		formattedRate,
	});
	const { serviceQuotationLoading = true } = step3_data || {};

	return (

		<div>
			{step === GLOBAL_CONSTANTS.zeroth_index ? (
				<Step0
					data={step0_data}
					onCancel={onCancel}
					setStep={setStep}
					servicesList={servicesList}
					task={task}
					step={step}
				/>
			) : null}

			{step === ONE ? (
				<Step1
					data={step1_data}
					skipStep0={skipStep0}
					setStep={setStep}
				/>
			) : null}

			{
				step === TWO ? (
					<Step2
						data={step2_data}
						setStep={setStep}
						step1_data={step1_data}
					/>
				) : null
			}

			{
				step === THREE && !serviceQuotationLoading ? (
					<Step3
						data={step3_data}
						setStep={setStep}
						shipment_id={task?.shipment_id}
					/>
				) : null
			}
		</div>
	);
}

export default UploadBookingNote;
