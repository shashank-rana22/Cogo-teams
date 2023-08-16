// import { Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getFormControls from './getControls';
import styles from './styles.module.css';

// const singleLocationServices = ['customs', 'locals'];

const DEFAULT_SPAN = 12;
const PERCENT_FACTOR = 100;
const FLEX_OFFSET = 2;

// const getFlex = (span) => {
// 	const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;
// 	return flex;
// };

function RouteForm({ mode = '', setFormValues = () => {}, formValues = {} }) {
	const serviceType = mode;

	const controls = getFormControls(serviceType);

	// if (singleLocationServices.includes(serviceType)) {
	// 	const [locationControls, typeControls, serviceControls] = controls;

	// 	return (
	// 		<div className={styles.container}>
	// 			<div className={styles.form_item} style={{ width: `${getFlex(locationControls.span)}%` }}>
	// 				<div className={styles.label}>
	// 					{locationControls?.label || ''}
	// 					{' '}
	// 					<div className={styles.required_mark}>*</div>
	// 				</div>

	// 				<AsyncSelect
	// 					{...locationControls}
	// 					value={formValues?.location?.id}
	// 					onChange={(val, obj) => setFormValues((prev) => ({ ...prev, location: obj }))}
	// 				/>
	// 			</div>

	// 			<div className={styles.form_item} style={{ width: `${getFlex(typeControls.span)}%` }}>
	// 				<div className={styles.label}>
	// 					{typeControls?.label || ''}
	// 					{' '}
	// 					<div className={styles.required_mark}>*</div>
	// 				</div>

	// 				<Select
	// 					{...typeControls}
	// 					value={formValues?.type}
	// 					onChange={(val) => setFormValues((prev) => ({ ...prev, type: val }))}
	// 				/>
	// 			</div>

	// 			<div className={styles.form_item} style={{ width: `${getFlex(serviceControls.span)}%` }}>
	// 				<div className={styles.label}>
	// 					{serviceControls?.label || ''}
	// 					{' '}
	// 					<div className={styles.required_mark}>*</div>
	// 				</div>

	// 				<Select
	// 					{...serviceControls}
	// 					value={formValues?.service}
	// 					onChange={(val) => setFormValues((prev) => ({ ...prev, service: val }))}
	// 				/>
	// 			</div>
	// 		</div>
	// 	);
	// }

	return (
		<div className={styles.container}>

			{(controls || []).map((controlItem) => {
				const { label, span, name } = controlItem;

				const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;

				const key = name.split('_')?.[GLOBAL_CONSTANTS.zeroth_index];

				return (
					<div
						key={name}
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
					</div>
				);
			})}
		</div>
	);
}

export default RouteForm;
