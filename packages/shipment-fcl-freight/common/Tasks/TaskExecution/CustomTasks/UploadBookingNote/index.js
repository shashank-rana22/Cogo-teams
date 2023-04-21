import { ShipmentDetailContext } from '@cogoport/context';
import { useContext, useState } from 'react';

import Step0 from './components/Step0';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import useGetStep0Data from './helpers/useGetStep0Data';
import useGetStep1Data from './helpers/useGetStep1Data';
import useGetStep2Data from './helpers/useGetStep2Data';
import useGetStep3Data from './helpers/useGetStep3Data';

function UploadBookingNote({ task, onCancel }) {
	const { primary_service, shipment_data, servicesList } = useContext(ShipmentDetailContext);

	let initialStep = 0;
	let skipStep0 = false;

	if (primary_service?.trade_type === 'import') {
		initialStep = 1;
		skipStep0 = true;
	}

	if (task?.tags && task?.tags?.length) initialStep = Number(task.tags[0]) + 1;

	const [step, setStep] = useState(initialStep);

	const step0_data = useGetStep0Data({ shipment_data, task, servicesList, setStep });

	const step1_data = useGetStep1Data({});

	const step2_data = useGetStep2Data({ primary_service, shipment_data });

	const step3_data = useGetStep3Data({ primary_service, servicesList, shipment_data });

	return (
		<div>
			{step === 0 ? (
				<Step0
					data={step0_data}
					onCancel={onCancel}
					setStep={setStep}
				/>
			) : null}

			{step === 1 ? (
				<Step1
					data={step1_data}
					skipStep0={skipStep0}
					setStep={setStep}
				/>
			) : null}

			{
				step === 2 ? (
					<Step2
						data={step2_data}
						setStep={setStep}
						step1_data={step1_data}
					/>
				) : null
			}

			{
				step === 3 ? (
					<Step3
						data={step3_data}
						setStep={setStep}
					/>
				) : null
			}
		</div>
	);
}

export default UploadBookingNote;
