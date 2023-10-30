import { cl } from '@cogoport/components';

import DoubleNestedFieldArray from './DoubleNestedArray';
import FieldArray from './FieldArray';
import FormElement from './FormElement';
import getWidthPercent from './getWidthPercent';
import NestedFieldArray from './NestedFieldArray';
import styles from './styles.module.css';

function Layout({
	controls = [], control = {}, errors = {}, showElements = {}, formValues = {},
	customFieldArrayControls = {},
}) {
	const finalControls = controls.filter((c) => {
		if (c.name in showElements) {
			return showElements[c.name];
		}
		return true;
	});

	return (
		<div className={styles.container}>
			{finalControls.map((ctrl, index) => {
				const {
					type = '', label = '', span = 6, removeLabelMargin = false,
					showButtons = true, name, ...restCtrl
				} = ctrl || {};
				if (type === 'doubleNestedFieldArray') {
					return (
						<DoubleNestedFieldArray
							customFieldArrayControls={customFieldArrayControls}
							ctrl={ctrl}
							key={ctrl.name}
							index={index}
							name={ctrl.name}
							control={control}
							error={errors}
							formValues={formValues}
							showElements={showElements}
							showButtons={showButtons}
						/>
					);
				}

				if (type === 'nestedFieldArray') {
					return (
						<NestedFieldArray
							customFieldArrayControls={customFieldArrayControls}
							ctrl={ctrl}
							key={ctrl.name}
							control={control}
							error={errors?.[ctrl.name]}
							formValues={formValues}
							showElements={showElements}
							showButtons={showButtons}
						/>
					);
				}

				if (type === 'fieldArray') {
					return (
						<FieldArray
							customFieldArrayControls={customFieldArrayControls}
							ctrl={ctrl}
							key={ctrl.name}
							control={control}
							error={errors?.[ctrl.name]}
							formValues={formValues}
							showButtons={showButtons}
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
							</div>
						) : null}

						{type ? <FormElement control={control} {...restCtrl} type={type} /> : null}

						{errors?.[restCtrl.name]
							? (
								<div className={styles.errors}>
									{errors[restCtrl.name]?.message}
								</div>
							)
							: null}
					</div>
				);
			})}
		</div>
	);
}

export default Layout;
