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
	const {
		formState: { errors },
		handleSubmit,
		control,
		register,
		setValue,
		watch,
	} = useForm();

	const onSubmitOfCompanyDetails = (values = {}) => {
		setFilledDetails({ ...values });
		setCurrentStep('billing_address');
	};

	return (
		<div className={styles.container}>
			<Form
				watch={watch}
				control={control}
				register={register}
				handleSubmit={handleSubmit}
				onSubmitOfCompanyDetails={onSubmitOfCompanyDetails}
				errors={errors}
				setValue={setValue}
				filledDetails={filledDetails}
			/>
			<div className={styles.button_container}>
				<Button
					onClick={() => setShowComponent('view_billing_addresses')}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit(onSubmitOfCompanyDetails)}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default CompanyDetails;
