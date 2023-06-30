import { Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';

import LABEL_MAPPING from '../../page-components/ServiceDiscovery/SpotSearch/components/Routes/label-mapping.json';

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

	const { label = {}, placeholder = {} } = LABEL_MAPPING[serviceType] || {};

	const controls = getFormControls({ mode: serviceType, label, placeholder });

	if (singleLocationServices.includes(serviceType)) {
		const [locationControls, typeControls, serviceControls] = controls;

		return (
			<div className={styles.container}>
				<div className={styles.form_item} style={{ width: `${getFlex(locationControls.span)}%` }}>
					<div className={styles.label}>
						{label?.location || ''}
						{' '}
						<div className={styles.required_mark}>*</div>
					</div>

					<AsyncSelect
						{...locationControls}
						value={formValues?.location}
						onChange={(val) => setFormValues((prev) => ({ ...prev, location: val }))}
					/>

				</div>

				<div className={styles.form_item} style={{ width: `${getFlex(typeControls.span)}%` }}>
					<div className={styles.label}>
						{label?.type || ''}
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
						{label?.service || ''}
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
					value={formValues?.origin}
					onChange={(val) => setFormValues((prev) => ({ ...prev, origin: val }))}
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
					value={formValues?.destination}
					onChange={(val) => setFormValues((prev) => ({ ...prev, destination: val }))}
				/>

			</div>

		</div>
	);
}

export default RouteForm;
