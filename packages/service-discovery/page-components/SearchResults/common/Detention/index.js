import { Button, Toast } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useRemoveDetentionDumurrage from '../../hooks/useRemoveDetentionDemurrage';
import useUpdateDestinationDemurrageDays from '../../hooks/useUpdateDestinationDemurrageDays';

import FormItem from './FormItem';
import styles from './styles.module.css';

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
	...rest
}) {
	const { service_details = {} } = detail || {};

	const { onSubmit = () => {}, loading: updateLoading = false } = useUpdateDestinationDemurrageDays({
		services: rateCardData?.service_rates || service_details,
		refetch,
		spot_search_id,
		setShow,
	});

	const { handleDeleteService, loading: removeLoading = false } = useRemoveDetentionDumurrage({
		service_details,
		refetch,
		setShow,
		services: alreadyAddedServicesCodes,
	});

	const { control, handleSubmit, setValue } = useForm({ defaultValues });

	const SUBMIT_BUTTON_FUNCTION_MAPPING = {
		update : onSubmit,
		filter : handleSave,
	};

	const onClickSave = (formValues) => {
		const fnc = SUBMIT_BUTTON_FUNCTION_MAPPING[action];
		let isInValid = true;
		Object.values(formValues).forEach((val) => {
			if (val && !isEmpty(val)) isInValid = false;
		});
		if (isInValid) {
			Toast.error('Enter atleast one value');
			return;
		}
		fnc(formValues);
	};

	useEffect(() => {
		Object.keys(defaultValues).forEach((key) => setValue(key, defaultValues?.[key]));
	}, [defaultValues, setValue]);

	return (
		<div className={styles.container}>
			{rest.heading ? (
				<strong className={styles.heading}>{rest.heading}</strong>
			) : null}

			<div className={styles.form}>

				<FormItem name="detention" control={control} howMuchToShowInDnD={howMuchToShowInDnD} />

				<FormItem name="demurrage" control={control} howMuchToShowInDnD={howMuchToShowInDnD} />

				{action === 'filter' ? (
					<CheckboxController
						name="save_for_later"
						control={control}
						label="Save these preferences for future."
					/>
				) : null}
			</div>

			<div className={styles.button_container}>
				{showReset ? (
					<Button
						type="button"
						size="md"
						themeType="secondary"
						className={styles.button}
						onClick={handleDeleteService}
						loading={removeLoading}
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
				>
					{rest.buttonTitle || 'Save'}
				</Button>
			</div>
		</div>
	);
}

export default Detention;
