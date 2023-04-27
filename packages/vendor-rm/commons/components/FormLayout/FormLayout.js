import { isEmpty } from '@cogoport/utils';

import { getElementController } from '../../../utils/get-element-controller';

import styles from './styles.module.css';

function FormLayout({
	fields = [],
	control = {},
	errors = {},
	customStyle,
}) {
	return (
		<div className={styles.form_container} style={customStyle?.formContainer || {}}>
			{fields.map((controlItem) => {
				const element = { ...controlItem };

				const Element = getElementController(element.type);

				if (!Element) return null;

				return (
					<div key={controlItem.name} className={styles.form_group} style={customStyle || element?.style}>
						<div className={styles.form_label}>
							{element.label}
							{isEmpty(controlItem?.rules)
								? <span className={styles.optional_tag}> (optional) </span>
								: null}
						</div>
						<div>
							<Element
								{...element}
								key={element.name}
								control={control}
								id={`onboard_vendor_form_${element.name}_input`}
							/>

							{errors?.[element.name]?.message ? (
								<div className={styles.error_message}>
									{errors?.[element.name]?.message}
								</div>
							) : null}
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default FormLayout;
