import { useEffect } from 'react';

import { getFieldController } from '../../../../../../../../../common/Form/getFieldController';
// eslint-disable-next-line max-len
import getOrganizationalDetailsControls from '../../../../../../../configurations/get-organizational-details-form-controls';

import styles from './styles.module.css';

function OrganizationalDetails(props) {
	const { control, watch, resetField, disabled } = props;

	const watchCountries = watch('countries');
	const watchStates = watch('states');
	const watchCities = watch('cities');

	const controls = getOrganizationalDetailsControls(
		{ watchCountries, watchStates, watchCities, disabled },
	);

	useEffect(() => {
		const subscription = watch((value, { name: controlName }) => {
			if (controlName === 'cities') {
				resetField('pincodes');
			}
			if (controlName === 'states') {
				resetField('cities');
			}
			if (controlName === 'countries') {
				resetField('states');
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, resetField]);

	return (
		<div className={styles.container}>
			<h4>2. Organizational Details</h4>

			<div className={styles.form_container}>
				{controls.map((formElement) => {
					const { name, label, type, ...rest } = formElement;

					const Element = getFieldController(type);

					if (!Element) return null;

					return (
						<div className={styles.element_container} key={name}>
							<p>{label}</p>

							<Element
								key={name}
								name={name}
								control={control}
								{...rest}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default OrganizationalDetails;
