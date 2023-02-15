import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import ControlLayout from '../../../../commons/components/ControlLayout/ControlLayout';
import useCreateVendorContact from '../hooks/useCreateVendorContact';

import styles from './styles.module.css';

function FormComponent({ activeStepper = {} }) {
	const {
		fields = [],
		control,
		errors,
	} =	useCreateVendorContact();
	return (
		<div className={styles.form_container}>
			{fields.map((controlItem) => {
				const el = { ...controlItem };

				const { style } = controlItem;

				return (<ControlLayout element={el} control={control} errors={errors} style={style} />);
			})}
			<ButtonLayout
				activeStepper={activeStepper}
			/>
		</div>
	);
}

export default FormComponent;
