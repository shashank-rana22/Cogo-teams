/* eslint-disable import/no-cycle */

import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';
import useVendorBankDetail from '../hooks/useVendorBankDetail';

function FormComponent({ activeStepper = {}, setActiveStepper = () => {} }) {
	const {
		controls = [],
		control,
		errors,
		handleSubmit,
		loading,
		onSubmit,
	} =	useVendorBankDetail({ setActiveStepper });

	return (
		<div>
			<FormLayout
				fields={controls}
				errors={errors}
				control={control}
			/>
			<ButtonLayout
				activeStepper={activeStepper}
				loading={loading}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default FormComponent;
