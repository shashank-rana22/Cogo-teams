import getElementController from '../../../../configs/getElementController';
import getControls from '../controls';

import styles from './styles.module.css';

const removeTypeField = (element) => {
	const { type, ...rest } = element;
	return rest;
};

function RenderFields({ control, errors }) {
	const controls = getControls({});
	return (
		<div className={styles.form}>
			{(controls || []).map((formControl) => {
				const { group, subControls } = formControl || {};

				if (group !== 'end_controls') return null;

				return (subControls || []).map((subControlItem) => {
					const { name, type, label } = subControlItem || {};
					const DynamicController = getElementController(type);

					return (
						<div key={name} className={styles.form_container}>
							<div key={name} className={styles.single_field}>
								<div className={styles.label}>
									{label}
								</div>

								<div className={styles.controller_wrapper}>
									<DynamicController
										{...(type === 'radioGroup'
											? removeTypeField(subControlItem) : { ...subControlItem })}
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

	);
}

function EndComponent({ control, errors }) {
	return (

		<div className={styles.render_form}>
			<RenderFields control={control} errors={errors} />
		</div>

	);
}

export default EndComponent;
