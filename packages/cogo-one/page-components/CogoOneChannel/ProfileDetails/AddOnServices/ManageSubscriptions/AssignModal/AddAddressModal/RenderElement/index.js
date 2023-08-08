import { getFieldController } from '../../../../../../../../utils/getFieldController';

import styles from './styles.module.css';

function RenderElement({ item = {}, control = {}, errors = {} }) {
	const { label = '', name = '', type = '' } = item || {};
	const Element = getFieldController(type);

	if (!Element) {
		return null;
	}

	return (
		<div className={styles.element_column} key={label}>
			<div className={styles.form_item_styled}>
				{type !== 'checkbox' && <div>{label}</div>}
				<Element
					{...item}
					control={control}
					error={errors?.[item.name]}
				/>
			</div>
			<div className={styles.error_text}>
				{(errors?.[name] && (errors[name]?.message || 'required'))}
			</div>
		</div>
	);
}

export default RenderElement;
