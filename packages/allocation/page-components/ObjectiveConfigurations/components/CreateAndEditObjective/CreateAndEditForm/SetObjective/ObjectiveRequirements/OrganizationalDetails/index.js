import { useEffect } from 'react';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';
// eslint-disable-next-line max-len
import getOrganizationalDetailsControls from '../../../../../../configurations/get-organizational-details-form-controls';

import styles from './styles.module.css';

function OrganizationalDetails(props) {
	const { control, watch, setValue, disabled } = props;

	const watchCountries = watch('country');
	const watchStates = watch('state');
	const watchCities = watch('city');

	const controls = getOrganizationalDetailsControls(
		{ watchCountries, watchStates, watchCities, disabled },
	);

	useEffect(() => {
		const subscription = watch((value, { name: controlName }) => {
			if (controlName === 'city') {
				setValue('pincode', []);
			}
			if (controlName === 'state') {
				setValue('city', []);
			}
			if (controlName === 'country') {
				setValue('state', []);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, setValue]);

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
