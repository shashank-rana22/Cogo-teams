import { Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
// import { useEffect } from 'react';

import getFormControls from './getControls';
import styles from './styles.module.css';

const singleLocationServices = ['customs', 'locals'];

const DEFAULT_SPAN = 12;
const PERCENT_FACTOR = 100;
const FLEX_OFFSET = 2;

const getFlex = (span) => {
	const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENT_FACTOR - FLEX_OFFSET;
	return flex;
};

function RouteForm({ mode = '', setFormValues, formValues }) {
	const serviceType = mode;

	const controls = getFormControls(serviceType);

	// useEffect(() => {
	// 	controls.forEach((item) => {
	// 		setFormValues((prev) => ({
	// 			...prev,
	// 			[item.name]: '',
	// 		}));
	// 	});
	// }, []);

	if (singleLocationServices.includes(serviceType)) {
		const [locationControls, typeControls, serviceControls] = controls;

		return (
			<div className={styles.container}>
				<div className={styles.form_item} style={{ width: `${getFlex(locationControls.span)}%` }}>
					<div className={styles.label}>
						{locationControls?.label || ''}
						{' '}
						<div className={styles.required_mark}>*</div>
					</div>

					<AsyncSelect
						{...locationControls}
						value={formValues?.location?.id}
						onChange={(val, obj) => setFormValues((prev) => ({ ...prev, location: obj }))}
					/>

				</div>

				<div className={styles.form_item} style={{ width: `${getFlex(typeControls.span)}%` }}>
					<div className={styles.label}>
						{typeControls?.label || ''}
						{' '}
						<div className={styles.required_mark}>*</div>
					</div>

					<Select
						{...typeControls}
						value={formValues?.type}
						onChange={(val) => setFormValues((prev) => ({ ...prev, type: val }))}
					/>

				</div>

				<div className={styles.form_item} style={{ width: `${getFlex(serviceControls.span)}%` }}>
					<div className={styles.label}>
						{serviceControls?.label || ''}
						{' '}
						<div className={styles.required_mark}>*</div>
					</div>

					<Select
						{...serviceControls}
						value={formValues?.service}
						onChange={(val) => setFormValues((prev) => ({ ...prev, service: val }))}
					/>

				</div>

			</div>
		);

		return null;
	}

	const [originControls, destinationControls] = controls;

	return (
		<div className={styles.container}>
			<div className={styles.form_item} style={{ width: `${getFlex(originControls.span)}%` }}>
				<div className={styles.label}>
					{originControls.label || ''}
					{' '}
					<div className={styles.required_mark}>*</div>
				</div>

				<AsyncSelect
					{...originControls}
					value={formValues?.origin?.id}
					onChange={(val, obj) => setFormValues((prev) => ({ ...prev, origin: obj }))}
				/>

			</div>

			<div className={styles.form_item} style={{ width: `${getFlex(destinationControls.span)}%` }}>
				<div className={styles.label}>
					{destinationControls.label || ''}
					{' '}
					<div className={styles.required_mark}>*</div>
				</div>

				<AsyncSelect
					{...destinationControls}
					value={formValues?.destination?.id}
					onChange={(val, obj) => setFormValues((prev) => ({ ...prev, destination: obj }))}
				/>

			</div>

		</div>
	);
}

export default RouteForm;
