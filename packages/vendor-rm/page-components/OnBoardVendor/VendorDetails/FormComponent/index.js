/* eslint-disable import/no-cycle */
import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import ControlLayout from '../../../../commons/components/ControlLayout/ControlLayout';
import useOnBoardVendor from '../hooks/useOnBoardVendor';

import styles from './styles.module.css';

function FormComponent({ activeStepper = {}, setActiveStepper = () => {} }) {
	const {
		fields = [],
		control,
		errors,
		handleSubmit,
		loading,
		createVendor,
	} =	useOnBoardVendor({ setActiveStepper });
	return (
		<div>
			<div className={styles.form_container}>
				{fields.map((controlItem) => {
					const el = { ...controlItem };

					const { style } = controlItem;
					return (<ControlLayout element={el} control={control} errors={errors} style={style} />);
				})}
			</div>
			<ButtonLayout
				activeStepper={activeStepper}
				loading={loading}
				handleSubmit={handleSubmit}
				onSubmit={createVendor}
			/>
		</div>
	);
}

export default FormComponent;
