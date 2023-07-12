import { useEffect } from 'react';

import getElementController from '../../../../../configs/getElementController';
import getControls from '../controls';

import styles from './styles.module.css';

const removeTypeField = (element) => {
	const { type, ...rest } = element;
	return rest;
};

function RenderFields({ control, errors, watch, setValue }) {
	const controls = getControls({});
	const watchOperationType = watch('operation_type');

	useEffect(() => {
		if (watchOperationType === 'manual') {
			setValue('is_rating_schema_in_percentage', 'yes');
		}
	}, [setValue, watchOperationType]);

	return (
		<div className={styles.form}>
			{(controls || []).map((formControl) => {
				const { group, subControls } = formControl || {};

				if (group === 'mid_controls') return null;

				return (
					<div key={group} className={styles.form}>
						{(subControls || []).map((subControlItem) => {
							const { name, type, label } = subControlItem || {};

							if (!type) return null;

							const DynamicController = getElementController(type);

							if (name === 'is_target_achieved_manually' && watchOperationType !== 'manual') {
								return null;
							}

							// if (watchOperationType === 'manual') {
							// 	setValue('is_rating_schema_in_percentage', 'yes');
							// }

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
						})}

					</div>
				);
			})}
		</div>

	);
}

function EndComponent({ control, errors, watch, setValue }) {
	return (
		<div className={styles.render_form}>
			<RenderFields control={control} errors={errors} watch={watch} setValue={setValue} />
		</div>

	);
}

export default EndComponent;
