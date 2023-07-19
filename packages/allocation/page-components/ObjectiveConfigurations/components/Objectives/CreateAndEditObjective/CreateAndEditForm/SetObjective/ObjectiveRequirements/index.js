import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRef, forwardRef, useImperativeHandle } from 'react';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../../../constants/create-form-stepper-keys-mapping';
import getAttachedIdData from '../../../../../../helpers/get-attached-id-data';
import getSeparatedIdData from '../../../../../../helpers/get-separated-id-data';

import AccountTransactionFunnel from './AccountTransactionFunnel';
import OrganizationalDetails from './OrganizationalDetails';
import ServiceRequirements from './ServiceRequirements';
import styles from './styles.module.css';

const { REVIEW_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

const ObjectiveRequirements = forwardRef((props, ref) => {
	const { formValues, setFormValues, disabled, setActiveStep, generalConfigFormState } = props;

	const { objectiveRequirements: { stats_details = {}, organization_details = {} } } = formValues;

	const {
		countries: filledCountries,
		states: filledStates,
		cities: filledCities,
		pincodes: filledPincodes,
		segments: filledSegments,
	} = organization_details;

	const divRef = useRef({});

	const { control, watch, reset, resetField, setValue, handleSubmit } = useForm({
		defaultValues: {
			service_requirements : [{}],
			countries            : getAttachedIdData({ values: filledCountries }),
			states               : getAttachedIdData({ values: filledStates }),
			cities               : getAttachedIdData({ values: filledCities }),
			pincodes             : getAttachedIdData({ values: filledPincodes }),
			segments             : filledSegments,
			...(stats_details || {}),

		},
	});

	useImperativeHandle(ref, () => ({
		container                     : divRef.current,
		resetObjectiveRequirementForm : reset,
	}));

	const onSubmit = (values) => {
		const {
			countries,
			states,
			cities,
			pincodes,
			segments,
			date_range,
			shipment_count,
			quotation_count,
			search_count,
			service_requirements,
		} = values;

		setFormValues((previousValues) => ({
			...previousValues,
			objectiveRequirements: {
				...(previousValues.objectiveRequirements || {}),
				organization_details: {
					...getSeparatedIdData({
						values: {
							countries, states, cities, pincodes,
						},
					}),
					segments,
				},
				stats_details: {
					date_range, shipment_count, quotation_count, search_count,
				},
				service_requirements: service_requirements.map(
					(item) => ({
						...item,
						origin_location      : getSeparatedIdData({ values: item.origin_location }),
						destination_location : getSeparatedIdData({ values: item.destination_location }),
					}),
				),
			},
			generalConfigFormState,
		}));

		setActiveStep(REVIEW_OBJECTIVE);
	};

	return (
		<div ref={divRef} className={styles.container}>
			<div className={styles.heading_container}>
				<h3>Set Objective For Lead Scoring</h3>
				<p>If no field is selected, it will automatically mean for all the inputs in that field</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<ServiceRequirements
					name="service_requirements"
					control={control}
					watch={watch}
					resetField={resetField}
					formValues={formValues}
					setFormValues={setFormValues}
					disabled={disabled}
				/>

				<OrganizationalDetails
					control={control}
					watch={watch}
					setValue={setValue}
					disabled={disabled}
				/>

				<AccountTransactionFunnel
					lifecycleStage={formValues.generalConfiguration?.lifecycle_stage}
					control={control}
					disabled={disabled}
				/>

				<div className={styles.button_container}>
					<Button
						type="submit"
						themeType="primary"
						size="md"
						disabled={disabled}
					>
						Proceed & Review
					</Button>
				</div>
			</form>
		</div>
	);
});

export default ObjectiveRequirements;
