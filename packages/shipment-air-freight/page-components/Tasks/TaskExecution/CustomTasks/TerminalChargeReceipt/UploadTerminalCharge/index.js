import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import {
	useForm,
} from '@cogoport/forms';

import useCreateShipmentAirCSRSheet from '../../../../../../hooks/useCreateShipmentAirCSRSheet';

import styles from './styles.module.css';
import uploadTerminalChargeControl from './uploadTerminalChargeControl';

function UploadTerminalCharge({
	index = 0, type = 'terminal', setTerminalChargeState = () => {},
	mainServicesData = {}, setSheetData = () => {},
}) {
	const { createShipmentAirCSRSheet, csrCreateLoading = false } = useCreateShipmentAirCSRSheet({
		index,
		setTerminalChargeState,
		mainServicesData,
		setSheetData,
	});

	const { formState:{ errors }, control, handleSubmit } = useForm();

	const handleUpload = (values) => {
		createShipmentAirCSRSheet(values);
	};

	return (
		<div className={styles.upload_layout_container}>
			<Layout
				fields={uploadTerminalChargeControl({ type })}
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
