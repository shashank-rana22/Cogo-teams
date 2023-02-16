/* eslint-disable import/no-cycle */

import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import ControlLayout from '../../../../commons/components/ControlLayout/ControlLayout';
import useVendorBankDetail from '../hooks/useVendorBankDetail';

import styles from './styles.module.css';

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
			<div className={styles.form_container}>
				{controls.map((controlItem) => {
					const el = { ...controlItem };

					const { style } = controlItem;
					return (<ControlLayout element={el} control={control} errors={errors} style={style} />);
				})}
			</div>
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
