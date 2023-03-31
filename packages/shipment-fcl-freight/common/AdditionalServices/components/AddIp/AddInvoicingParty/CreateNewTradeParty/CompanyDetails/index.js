import { Button } from '@cogoport/components';

import useCompanyDetails from '../hooks/useCompanyDetails';

import Form from './Form';
import styles from './styles.module.css';

function CompanyDetails({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) {
	const {
		errors = {},
		control,
		handleSubmit,
		register,
		setValue,
		onSubmitOfCompanyDetails,
	} = useCompanyDetails({
		filledDetails,
		setFilledDetails,
		setCurrentStep,
	});

	return (
		<div className={styles.container}>
			<Form
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
					onClick={handleSubmit(onSubmitOfCompanyDetails)}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default CompanyDetails;
