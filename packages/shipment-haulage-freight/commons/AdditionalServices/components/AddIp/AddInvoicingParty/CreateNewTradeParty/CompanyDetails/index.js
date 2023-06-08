import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Form from './Form';
import styles from './styles.module.css';

function CompanyDetails({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
	setShowComponent = () => {},
}) {
	const { registration_number, business_name, company_type, country_id } = filledDetails;

	const {
		formState: { errors },
		handleSubmit,
		control,
		watch,
	} = useForm({ defaultValues: { registration_number, business_name, company_type, country_id } });

	const onSubmitOfCompanyDetails = (values = {}) => {
		setFilledDetails({ ...values });
		setCurrentStep('billing_address');
	};

	return (
		<div className={styles.container}>
			<Form watch={watch} control={control} errors={errors} />

			<div className={styles.button_container}>
				<Button
					onClick={() => setShowComponent('view_billing_addresses')}
					themeType="secondary"
				>
					Cancel
				</Button>

				<Button onClick={handleSubmit(onSubmitOfCompanyDetails)}>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default CompanyDetails;
