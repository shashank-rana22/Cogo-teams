import { cl } from '@cogoport/components';

import FieldArray from './FieldArray';
import FormElement from './FormElement';
import getWidthPercent from './getWidthPercent';
import styles from './styles.module.css';

function Layout(
	{
		controls = [],
		control = {},
		errors = {},
		showElements = {},
		formValues = {},
		customFieldArrayControls = {},
		setValue = () => {},
	},
) {
	const finalControls = controls.filter((c) => {
		if (c.name in showElements) {
			return showElements[c.name];
		}
		return true;
	});

	return (
		<div className={styles.container}>
			{finalControls.map((ctrl) => {
				const {
					type = '', label = '', span = 6, removeLabelMargin = false,
					handleFieldArrayAddCheck = () => true, rules = {}, ...restCtrl
				} = ctrl || {};

				if (type === 'fieldArray') {
					return (
						<FieldArray
							ctrl={ctrl}
							key={ctrl.name}
							control={control}
							error={errors?.[ctrl.name]}
							formValues={formValues}
							handleFieldArrayAddCheck={handleFieldArrayAddCheck}
							customFieldArrayControls={customFieldArrayControls}
							setValue={setValue}
						/>
					);
				}

				const width = getWidthPercent(span);

				return (
					<div
						key={restCtrl.name}
						className={styles.element_container}
						style={{ width: `${width}%` }}
					>
						{label ? (
							<div
								className={cl`${styles.label} ${removeLabelMargin ? styles.removeLabelMargin : ''}`}
							>
								{label}

								{rules?.required ? (
									<sup style={{
										marginLeft : '4px',
										color      : '#f00',
									}}
									>
										*
									</sup>
								) : null}
							</div>
						) : null}

						{type ? <FormElement control={control} rules={rules} {...restCtrl} type={type} /> : null}

						{errors?.[restCtrl.name]
							? <div className={styles.errors}>{errors[restCtrl.name]?.message}</div>
							: null}
					</div>
				);
			})}
		</div>
	);
}

export default Layout;
