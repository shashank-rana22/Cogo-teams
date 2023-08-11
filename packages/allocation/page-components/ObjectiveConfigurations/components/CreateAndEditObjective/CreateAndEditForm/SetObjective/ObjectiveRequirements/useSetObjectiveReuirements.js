import { useForm } from '@cogoport/forms';

import CREATE_FORM_STEPPER_KEYS_MAPPING from '../../../../../constants/create-form-stepper-keys-mapping';
import getAttachedIdData from '../../../../../helpers/get-attached-id-data';
import getSeparatedIdData from '../../../../../helpers/get-separated-id-data';

const { REVIEW_OBJECTIVE } = CREATE_FORM_STEPPER_KEYS_MAPPING;

const useSetObjectiveRequirements = (props) => {
	const { formValues, setFormValues, setActiveStep, generalConfigFormState } = props;

	const {
		objectiveRequirements: {
			stats_details,
			organization_details,
			service_requirements: serviceRequirements,
		} = {},
	} = formValues;

	const {
		country: filledCountries,
		state: filledStates,
		city: filledCities,
		pincode: filledPincodes,
		segments: filledSegments,
	} = organization_details || {};

	const { control, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm({
		defaultValues: {
			service_requirements: serviceRequirements ? serviceRequirements.map(
				(requirement) => (
					{
						...requirement,
						origin_location      : getAttachedIdData({ values: requirement.origin_location }),
						destination_location : getAttachedIdData({ values: requirement.destination_location }),
					}
				),
			) : [{}],
			country  : getAttachedIdData({ values: filledCountries }),
			state    : getAttachedIdData({ values: filledStates }),
			city     : getAttachedIdData({ values: filledCities }),
			pincode  : getAttachedIdData({ values: filledPincodes }),
			segments : filledSegments,
			...(stats_details || {}),
		},
	});

	const onSubmit = (values) => {
		const {
			country,
			state,
			city,
			pincode,
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
							country, state, city, pincode,
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

	return {
		control, watch, setValue, handleSubmit, resetForm: reset, onSubmit, errors,
	};
};

export default useSetObjectiveRequirements;
