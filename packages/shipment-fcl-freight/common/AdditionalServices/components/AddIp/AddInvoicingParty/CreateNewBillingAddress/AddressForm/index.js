import { Button, Checkbox } from '@cogoport/components';

import useGetBusiness from '../../hooks/useGetBusiness';
import AsyncGstListController from '../AsyncGstListController';

import Form from './Form';
import styles from './styles.module.css';

function AddressForm({
	control,
	useFieldArray,
	register = () => {},
	errors,
	handleSubmit = () => {},
	registrationNumber,
	setValue = () => {},
	companyDetails = {},
	setCurrentStep = () => {},
	onSubmit = () => {},
	gstNumber,
	setGstNumber = () => {},
	isAddressRegisteredUnderGst,
	setShowComponent = () => {},
	setIsAddressRegisteredUnderGst = () => {},
}) {
	const { dataa } = useGetBusiness({ gstNumber, setValue });

	const handleCancel = () => {
		setCurrentStep('company_details');
		setShowComponent(null);
	};

	return (
		<div className={styles.container}>
			<Checkbox
				label="Not Registered Under GST Law"
				checked={isAddressRegisteredUnderGst}
				onChange={() => setIsAddressRegisteredUnderGst(!isAddressRegisteredUnderGst)}
			/>

			{isAddressRegisteredUnderGst && (
				<div className={styles.text}>
					Addresses not registered under GST will be added in
					&quot;Other Addresses&quot; for the organisation and&nbsp;
					<b>will not be available for GST Invoicing</b>
					.
				</div>
			)}

			{isAddressRegisteredUnderGst ? (
				<Form
					control={control}
					useFieldArray={useFieldArray}
					register={register}
					handleSubmit={handleSubmit}
					errors={errors}
				/>
			)
				: (
					<>
						<h3>Billing Address</h3>

						<AsyncGstListController
							gstNumber={gstNumber}
							setGstNumber={setGstNumber}
							registrationNumber={registrationNumber || companyDetails?.registration_number}
						/>

						{gstNumber ? (
							<Form
								control={control}
								useFieldArray={useFieldArray}
								register={register}
								handleSubmit={handleSubmit}
								errors={errors}
							/>
						) : null}

					</>
				)}

			<div className={styles.button_container}>
				<Button onClick={handleCancel}>Cancel</Button>
				<Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}

export default AddressForm;
