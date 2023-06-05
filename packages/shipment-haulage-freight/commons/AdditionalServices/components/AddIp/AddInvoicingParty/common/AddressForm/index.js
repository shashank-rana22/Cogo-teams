import { Button, Checkbox } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useGetBusiness from '../../../../../../../hooks/useGetBusiness';
import AsyncGstListController from '../../CreateNewBillingAddress/AsyncGstListController';

import Form from './Form';
import styles from './styles.module.css';

function AddressForm({
	registrationNumber,
	companyDetails = {},
	setCurrentStep = () => {},
	showComponent = '',
	onSubmit = () => {},
	gstNumber,
	setGstNumber = () => {},
	isAddressRegisteredUnderGst,
	setShowComponent = () => {},
	setIsAddressRegisteredUnderGst = () => {},
	source = '',
	refetch = () => {},
}) {
	const { data } = useGetBusiness({ gstNumber });

	const {
		addresses = [],
		trade_name = '',
		business_name = '',
	} = data || {};
	const { pincode: firstPincode, address: firstAddress } = addresses?.[0] || {};

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			poc_details: [{
				name                : '',
				email               : '',
				mobile_country_code : '',
				mobile_number       : '',
			},
			],
		},
		shouldUnregister : true,
		values           : {
			name    : trade_name || business_name || '',
			pincode : firstPincode || '',
			address : firstAddress || '',
		},
	});

	const handleCancel = () => {
		if (source === 'create_trade_party') {
			setCurrentStep('company_details');
		}

		setShowComponent('view_billing_addresses');
		refetch();
	};

	return (
		<div className={styles.container}>
			<Checkbox
				label="Not Registered Under GST Law"
				checked={isAddressRegisteredUnderGst}
				onChange={() => setIsAddressRegisteredUnderGst(!isAddressRegisteredUnderGst)}
			/>

			{isAddressRegisteredUnderGst ? (
				<div className={styles.text}>
					Addresses not registered under GST will be added in
					&quot;Other Addresses&quot; for the organisation and&nbsp;
					<b>will not be available for GST Invoicing</b>
					.
				</div>
			) : null}

			{isAddressRegisteredUnderGst ? (
				<section className={styles.section}>
					<Form
						control={control}
						errors={errors}
						showComponent={showComponent}
					/>
				</section>
			)
				: (
					<section className={styles.section}>
						<h3>Billing Address</h3>

						<AsyncGstListController
							gstNumber={gstNumber}
							setGstNumber={setGstNumber}
							registrationNumber={registrationNumber || companyDetails?.registration_number}
						/>

						{gstNumber ? (
							<Form
								control={control}
								errors={errors}
								showComponent={showComponent}
							/>
						) : null}

					</section>
				)}

			<div className={styles.button_container}>
				<Button onClick={handleCancel}>
					{source === 'create_trade_party' ? 'Back' : 'Cancel'}
				</Button>

				<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}

export default AddressForm;
