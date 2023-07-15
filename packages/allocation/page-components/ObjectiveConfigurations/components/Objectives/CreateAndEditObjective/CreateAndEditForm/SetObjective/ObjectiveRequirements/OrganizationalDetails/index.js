import { useEffect } from 'react';

import { getFieldController } from '../../../../../../../../../common/Form/getFieldController';
// eslint-disable-next-line max-len
import getOrganizationalDetailsControls from '../../../../../../../configurations/get-organizational-details-form-controls';

import styles from './styles.module.css';

function OrganizationalDetails(props) {
	const { control, watch, resetField } = props;

	const watchCountryIds = watch('country_ids');
	const watchStateIds = watch('state_ids');
	const watchCityIds = watch('city_ids');

	const controls = getOrganizationalDetailsControls(
		{ watchCountryIds, watchStateIds, watchCityIds },
	);

	useEffect(() => {
		const subscription = watch((value, { name: controlName }) => {
			if (controlName === 'city_ids') {
				resetField('pincode_ids');
			}
			if (controlName === 'state_ids') {
				resetField('city_ids');
			}
			if (controlName === 'country_ids') {
				resetField('state_ids');
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
