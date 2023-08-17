import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENT_FACTOR = 100;
const FLEX_OFFSET = 4;

function LocationControl({ controlItem = {}, formValues = {}, setFormValues = () => {} }) {
	const { label, span, name } = controlItem;

	const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;

	const key = name.split('_')?.[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<section
			key={`${name}_input_control`}
			id={`${name}_input_control`}
			className={styles.form_item}
			style={{ width: `${flex}%` }}
		>
			<div className={styles.label}>
				{label || ''}
				{' '}
				<div className={styles.required_mark}>*</div>
			</div>

			<AsyncSelect
				{...controlItem}
				value={formValues?.[key]?.id}
				onChange={(val, obj) => setFormValues((prev) => ({ ...prev, [key]: obj }))}
			/>
		</section>
	);
}

export default LocationControl;
