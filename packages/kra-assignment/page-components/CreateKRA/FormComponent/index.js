import { Button } from '@cogoport/components';

import getElementController from '../../../configs/getElementController';

import getControls from './controls';
import DropDownComponent from './DropDownComponent';
import EndComponent from './EndComponent';
import styles from './styles.module.css';
import useCreateKRA from './useCreateKRA';

function FormComponent() {
	const {
		control,
		errors,
		handleSubmit,
		onClickSubmitButton,
		watch,
		showSelectedValue,
		setSelectedValue,
	} = useCreateKRA();

	const controls = getControls({ setSelectedValue });
	return (
		<div className={styles.container}>
			<div>
				Hello,
			</div>

			<div style={{ width: '85%' }}>
				Before requesting a new KRA creation request,
				we urge you to kindly go through the list of KRAS we have active currently.
				If you feel the KRA you want to be created is not part of the system already,
				please go ahead and create a new KRA request.
			</div>

			<div className={styles.form}>
				{ (controls || []).map((formControl) => {
					const { group, subControls } = formControl || {};

					if (group !== 'top_controls') return null;

					return (subControls || []).map((controlItem) => {
						const { name, type, label } = controlItem || {};
						const DynamicController = getElementController(type);

						return (
							<div key={name} className={styles.form_container}>
								<div key={name} className={styles.single_field}>
									<div className={styles.label}>
										{label}
									</div>

									<div className={styles.controller_wrapper}>
										<DynamicController
											{...controlItem}
											control={control}
											name={name}
										/>
									</div>
								</div>
								{errors[name] ? (
									<div className={styles.error_message}>
										{' '}
										{errors[name]?.message}
									</div>
								) : null}
							</div>

						);
					});
				})}
			</div>

			<div className={styles.form}>
				<DropDownComponent
					control={control}
					errors={errors}
					watch={watch}
					setSelectedValue={setSelectedValue}
					showSelectedValue={showSelectedValue}
				/>
			</div>

			<div>
				<EndComponent control={control} errors={errors} />
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button onClick={handleSubmit(onClickSubmitButton)}>Submit</Button>
			</div>

		</div>

	);
}

export default FormComponent;
