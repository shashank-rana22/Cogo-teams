import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';

import useCreateShipmentAirCSRSheet from '../../../../../../hooks/useCreateShipmentAirCSRSheet';

import UPLOAD_TERMINAL_CHARGE_CONTROL from './uploadTerminalChargeControl';

function UploadTerminalCharge({ setTerminalChargeState = () => {}, mainServicesData = {}, setSheetData = () => {} }) {
	const { createShipmentAirCSRSheet, csrCreateLoading = false } = useCreateShipmentAirCSRSheet({
		setTerminalChargeState,
		mainServicesData,
		setSheetData,
	});

	const { formState:{ errors }, control, handleSubmit } = useForm();

	const handleUpload = (values) => {
		createShipmentAirCSRSheet(values);
	};

	return (
		<div>
			<div>Upload Terminal Charge Receipt </div>
			<Layout
				fields={UPLOAD_TERMINAL_CHARGE_CONTROL}
				control={control}
				errors={errors}
			/>
			<Button
				onClick={handleSubmit(handleUpload)}
				disabled={csrCreateLoading}
				loading={csrCreateLoading}
			>
				Upload
			</Button>
		</div>

	);
}
export default UploadTerminalCharge;
