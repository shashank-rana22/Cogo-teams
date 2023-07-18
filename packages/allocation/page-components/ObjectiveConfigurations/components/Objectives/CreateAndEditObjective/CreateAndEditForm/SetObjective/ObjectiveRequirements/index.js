import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRef, forwardRef, useImperativeHandle } from 'react';

import getSeparatedIdData from '../../../../../../helpers/get-separated-id-data';

import AccountTransactionFunnel from './AccountTransactionFunnel';
import OrganizationalDetails from './OrganizationalDetails';
import ServiceRequirements from './ServiceRequirements';
import styles from './styles.module.css';

const ObjectiveRequirements = forwardRef((props, ref) => {
	const { formValues, setFormValues, disabled } = props;

	const divRef = useRef({});

	const { control, watch, reset, resetField, handleSubmit } = useForm({
		defaultValues: {
			service_requirements: [{}],
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
				service_requirements,
			},
		}));
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
					resetField={resetField}
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
