import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import RouteForm from '../../../../../common/RouteForm';

import styles from './styles.module.css';

const isFormValid = (values, setErrors) => {
	let isValid = true;
	Object.keys(values).forEach((key) => {
		if (!values[key] || isEmpty(values[key])) {
			setErrors((prev) => ({
				...prev,
				[key]: true,
			}));
			isValid = false;
		}
	});

	return isValid;
};

function Routes({
	mode = {},
	formValues = {},
	setFormValues = () => {},
	organization,
	createSearch,
	createSearchLoading,
	setErrors,
}) {
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const router = useRouter();

	const service_type = mode.mode_value;

	const onClickSearch = async () => {
		const isValid = isFormValid(organization, setErrors);

		if (!isValid) {
			return;
		}

		const spot_search_id = await createSearch({
			action : 'default',
			values : { service_type, ...organization, ...formValues, setButtonDisabled },
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			router.push(
				'/book/[spot_search_id]/[importer_exporter_id]',
				`/book/${spot_search_id}/${organization.organization_id}`,
			);
		}
	};

	useEffect(() => {
		let canContinue = true;

		if (!formValues || isEmpty(formValues)) {
			canContinue = false;
		} else {
			Object.keys(formValues).forEach((key) => {
				if (!formValues[key] || isEmpty(formValues[key])) {
					canContinue = false;
				}
			});
		}
		setButtonDisabled(!canContinue);
	}, [formValues]);

	return (
		<div className={styles.container}>

			<div className={styles.route_form}>
				<div className={styles.heading}>{`Enter ${mode?.mode_label} Details`}</div>

				<RouteForm
					mode={mode.mode_value}
					formValues={formValues}
					setFormValues={setFormValues}
				/>
			</div>

			<div className={styles.search_button}>
				<Button
					size="xl"
					themeType="accent"
					disabled={buttonDisabled}
					onClick={onClickSearch}
					loading={createSearchLoading}
				>
					Find Rates
				</Button>
			</div>
		</div>
	);
}

export default Routes;
