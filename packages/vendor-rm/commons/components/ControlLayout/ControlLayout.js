import { getElementController } from '../../../utils/get-element-controller';

import styles from './styles.module.css';

function ControlLayout({ element = {}, control = {}, errors = {}, style = {} }) {
	const Element = getElementController(element.type);

	if (!Element) return null;

	return (
		<div className={styles.form_group} style={style}>
			<div className={styles.form_label}>{element.label}</div>
			<div>
				<Element
					{...element}
					key={element.name}
					control={control}
					id={`onboard_vendor_form_${element.name}_input`}
				/>
				<div className={styles.error_message}>
					{errors?.[element.name]?.message}
				</div>
			</div>
		</div>
	);
}

export default ControlLayout;
