import { Button, Checkbox } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect } from 'react';

import useGetBusiness from '../../../../../../hooks/useGetBusiness';
import AsyncGstListController from '../CreateNewBillingAddress/AsyncGstListController';

import Form from './Form';
import styles from './styles.module.css';

const POC_DETAILS_DEFAULT_VALUES = [{ name: '', email: '', mobile_country_code: '', mobile_number: '' }];

function AddressForm({
	registrationNumber = '',
	companyDetails = {},
	setCurrentStep = () => {},
	showComponent = '',
	onSubmit = () => {},
	gstNumber = '',
	setGstNumber = () => {},
	isAddressNotRegisteredUnderGst = false,
	setShowComponent = () => {},
	setIsAddressNotRegisteredUnderGst = () => {},
	source = '',
	refetch = () => {},
}) {
	const data = useGetBusiness({ gstNumber });

	const {
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			poc_details: POC_DETAILS_DEFAULT_VALUES,
		},
	});

	const {
		addresses = [],
		trade_name = '',
		business_name = '',
	} = data || {};

	const { firstPincode, firstAddress } = addresses?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	useEffect(() => {
		setValue('name', trade_name || business_name || '');
		setValue('pincode', firstPincode || '');
		setValue('address', firstAddress || '');
	}, [setValue, firstPincode, firstAddress, business_name, trade_name]);

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
				checked={isAddressNotRegisteredUnderGst}
				onChange={() => setIsAddressNotRegisteredUnderGst(!isAddressNotRegisteredUnderGst)}
			/>

			{isAddressNotRegisteredUnderGst && (
				<span className={styles.text}>
					Addresses not registered under GST will be added in
					&quot;Other Addresses&quot; for the organization and
					<strong> will not be available for GST Invoicing</strong>
					.
				</span>
			)}

			{isAddressNotRegisteredUnderGst ? (
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

				<Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}

export default AddressForm;
