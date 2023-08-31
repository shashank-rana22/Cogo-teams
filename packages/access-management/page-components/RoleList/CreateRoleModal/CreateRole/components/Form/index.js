import { useTranslation } from 'next-i18next';
import React from 'react';

import functionSubFunctionMapping from '../../../../../../configurations/function-sub-function-mapping';
import { getElementController } from '../../../../../../utils/get-element-controller';

import styles from './styles.module.css';

function Form({ controls = () => [], formProps = {} }) {
	const { t } = useTranslation(['accessManagement']);
	const { control, watch, formState: { errors } } = formProps;

	const type = watch('role_functions') || [];

	const SUB_ROLE_FUNCTION_OPTIONS_EDIT = [];

	const subFunctionMapping = functionSubFunctionMapping(t);

	type?.forEach((subType) => {
		SUB_ROLE_FUNCTION_OPTIONS_EDIT.push(...(subFunctionMapping[subType] || []));
	});

	return (
		<section className={styles.form_container}>
			{controls.map((controlItem) => {
				const el = { ...controlItem };
				const Element = getElementController(el.type);

				if (el.name === 'role_sub_functions') {
					el.options = SUB_ROLE_FUNCTION_OPTIONS_EDIT;
				}

				if (!Element) return null;

				return (
					<div className={styles.form_group} key={el.name}>
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
