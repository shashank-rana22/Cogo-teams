import { Button, Toast, ButtonIcon } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { IcMCross } from '@cogoport/icons-react';
import { useEffect } from 'react';

import useRemoveDetentionDumurrage from '../../hooks/useRemoveDetentionDemurrage';
import useUpdateDestinationDemurrageDays from '../../hooks/useUpdateDestinationDemurrageDays';

import FormItem from './FormItem';
import styles from './styles.module.css';

const DEFAULT_DAYS_VALUE = 0;
const TOTAL_COUNT_OF_DND_SERVICES = 4;

const SERVICES_MAPPING = {
	origin_detention      : 'EDT',
	destination_detention : 'DET',
	origin_demurrage      : 'EDE',
	destination_demurrage : 'DEA',
};

const getErrorMessage = (formValues = {}, alreadyAddedServicesCodes = []) => {
	const ERROR_MAPPING = {
		all_empty                         : 'Enter atleast one value',
		already_added_but_changed_to_zero : 'Cannot change to 0 days',
	};

	let error = '';
	const SERVICES_WITH_ZERO_VALUES = Object.entries(formValues).reduce((acc, [key, value]) => {
		if (!value || !Number(value)) return [...acc, key];
		return acc;
	}, []);

	Object.entries(SERVICES_MAPPING).forEach(([serviceName, serviceCode]) => {
		if (alreadyAddedServicesCodes.includes(serviceCode)) {
			if (!formValues[serviceName] || !Number(formValues[serviceName])) {
				error = 'already_added_but_changed_to_zero';
			}
		}
	});

	if (SERVICES_WITH_ZERO_VALUES.length === TOTAL_COUNT_OF_DND_SERVICES) error = 'all_empty';

	return ERROR_MAPPING[error] || '';
};

function Detention({
	defaultValues = {},
	howMuchToShowInDnD = {
		origin_detention      : true,
		origin_demurrage      : true,
		destination_detention : true,
		destination_demurrage : true,
	},
	handleSave = () => {},
	loading = false,
	showReset = false,
	action = 'update',
	spot_search_id = '',
	rateCardData = {},
	refetch = () => {},
	setShow = () => {},
	detail = {},
	alreadyAddedServicesCodes = [],
	showDnd = true,
	minDays = {},
	...rest
}) {
	const { service_details = {} } = detail || {};

	const { onSubmit = () => {}, loading: updateLoading = false } = useUpdateDestinationDemurrageDays({
		services: rateCardData?.service_rates || service_details,
		refetch,
		spot_search_id,
		setShow,
		defaultValues,
	});

	const { handleDeleteService, loading: removeLoading = false } = useRemoveDetentionDumurrage({
		service_details,
		refetch,
		setShow,
		services: alreadyAddedServicesCodes,
	});

	const { control, handleSubmit, setValue, formState:{ errors } } = useForm({ defaultValues });

	const SUBMIT_BUTTON_FUNCTION_MAPPING = {
		update : onSubmit,
		filter : handleSave,
	};

	const onClickSave = (formValues) => {
		const errorMessage = getErrorMessage(formValues, alreadyAddedServicesCodes);
		if (errorMessage) {
			Toast.error(errorMessage);
			return;
		}

		const currentFunction = SUBMIT_BUTTON_FUNCTION_MAPPING[action];
		currentFunction(formValues);
	};

	useEffect(() => {
		Object.keys(SERVICES_MAPPING).forEach((key) => setValue(key, defaultValues?.[key] || DEFAULT_DAYS_VALUE));
	}, [defaultValues, setValue]);

	return (
		<div className={styles.container}>
			<ButtonIcon
				className={styles.close_button}
				size="md"
				icon={<IcMCross />}
				themeType="primary"
				onClick={() => setShow(false)}
			/>

			{rest.heading ? (
				<strong className={styles.heading}>{rest.heading}</strong>
			) : null}

			<div className={styles.form}>
				{['detention', 'demurrage'].map((name) => (
					<FormItem
						key={name}
						name={name}
						control={control}
						howMuchToShowInDnD={howMuchToShowInDnD}
						errors={errors}
						minDays={minDays}
						source={rest.source}
					/>
				))}

				{action === 'filter' ? (
					<CheckboxController
						name="save_for_later"
						control={control}
						label="Save these preferences for future."
					/>
				) : null}
			</div>

			<p className={styles.info}>*Some shipping lines don’t provide additional free days.</p>

			<div className={styles.button_container}>
				{showReset ? (
					<Button
						type="button"
						size="md"
						themeType="secondary"
						className={styles.button}
						onClick={handleDeleteService}
						loading={removeLoading}
						disabled={updateLoading || loading}
					>
						Reset
					</Button>
				) : null}

				<Button
					type="button"
					size="md"
					themeType="accent"
					onClick={handleSubmit(onClickSave)}
					loading={updateLoading || loading}
					disabled={!showDnd || removeLoading}
				>
					{rest.buttonTitle || 'Save'}
				</Button>
			</div>
		</div>
	);
}

export default Detention;
