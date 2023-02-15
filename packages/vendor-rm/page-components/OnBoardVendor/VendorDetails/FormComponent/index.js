// eslint-disable-next-line import/no-cycle
import ButtonLayout from '../../../../commons/components/ButtonLayout/ButtonLayout';
import FormLayout from '../../../../commons/components/FormLayout/FormLayout';
import { getElementController } from '../../../../utils/get-element-controller';
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

					const Element = getElementController(el.type);

					if (!Element) return null;

					return (
					// eslint-disable-next-line max-len
					// <div className={styles.form_group} style={style}>
					// 	<div className={styles.form_label}>{el.label}</div>
					// 	<div>
					// 		<Element
					// 			{...el}
					// 			key={el.name}
					// 			control={control}
					// 			id={`onboard_vendor_form_${el.name}_input`}
					// 		/>
					// 		<div className={styles.error_message}>
					// 			{errors?.[el.name]?.message}
					// 		</div>
					// 	</div>
					// </div>
						<FormLayout element={el} control={control} errors={errors} style={style} />
					);
				})}
			</div>
			<ButtonLayout
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				loading={loading}
				handleSubmit={handleSubmit}
				onSubmit={createVendor}
			/>
		</div>
	);
}

export default FormComponent;
