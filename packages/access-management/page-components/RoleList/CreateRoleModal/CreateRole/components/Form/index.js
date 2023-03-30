import React from 'react';

import functionSubFunctionMapping from '../../../../../../configurations/function-sub-function-mapping';
import { getElementController } from '../../../../../../utils/get-element-controller';

import styles from './styles.module.css';

function Form({ controls = () => [], formProps = {} }) {
	const { control, watch, formState: { errors } } = formProps;

	const type = watch('role_functions') || [];

	const subRoleFunctionOptions = [];

	type?.forEach((subType) => {
		subRoleFunctionOptions.push(...(functionSubFunctionMapping[subType] || []));
	});

	return (
		<section className={styles.form_container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };
				const Element = getElementController(el.type);

				if (el.name === 'role_sub_functions') {
					el.options = subRoleFunctionOptions;
				}

				if (!Element) return null;

				return (
					<div className={styles.form_group}>
						<span>{el.label}</span>
						<div className={styles.input_group}>
							<Element
								{...el}
								key={el.name}
								control={control}
								id={`rnp_role_list_create_role_form_${el.name}_input`}
							/>
							<div className={styles.error_message}>
								{errors?.[el.name]?.message}
							</div>
						</div>
					</div>
				);
			})}
		</section>
	);
}

export default Form;
