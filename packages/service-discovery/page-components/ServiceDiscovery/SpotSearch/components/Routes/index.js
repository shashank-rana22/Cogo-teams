import { Button, Toast, cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import RouteForm from '../../../../../common/RouteForm';
import MODES from '../../configurations/modes.json';

import styles from './styles.module.css';

const isFormValid = (values, setErrors) => {
	let isValid = true;
	setErrors({});

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
	mode = '',
	formValues = {},
	setFormValues = () => {},
	organization = {},
	createSearch = () => {},
	createSearchLoading = false,
	setErrors = () => {},
	errors = {},
}) {
	const router = useRouter();

	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [ftlFormData, setFtlFormData] = useState({
		typeOfJourney : 'one_way',
		touchPoints   : {
			one_way : [],
			round   : [],
		},
		haltTime: {},
	});

	const onClickSearch = async () => {
		const valuesToBeChecked = {
			...organization,
		};

		let errorMessage = '';

		if (!isFormValid(valuesToBeChecked, setErrors)) {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			errorMessage = 'Please fill all required fields!';
		}

		if (formValues?.origin?.id === formValues?.destination?.id) {
			errorMessage = 'Origin and Destination cannot be same';
		}

		if (errorMessage) {
			Toast.error(errorMessage);
			return;
		}

		const spot_search_id = await createSearch({
			action : 'default',
			values : {
				service_type: mode,
				...organization,
				...formValues,
				setButtonDisabled,
				ftlFormData,
			},
		});

		if (spot_search_id && typeof spot_search_id === 'string') {
			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
		}
	};

	useEffect(() => {
		let canContinue = false;

		const condition = formValues && !isEmpty(formValues)
		&& Object.values(formValues)?.every((val) => val && !isEmpty(val));

		if (condition) {
			canContinue = true;
		}

		setButtonDisabled(!canContinue);
	}, [formValues]);

	const label = MODES.find(({ value }) => value === mode)?.label;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.route_form} ${styles[mode]}`}>
				<div className={styles.heading}>{`Enter ${label} Details`}</div>

				<RouteForm
					mode={mode}
					formValues={formValues}
					setFormValues={setFormValues}
					organization={organization}
					intent="rate_search"
					setFtlFormData={setFtlFormData}
					ftlFormData={ftlFormData}
					errors={errors}
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
