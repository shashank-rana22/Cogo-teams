import { Checkbox } from '@cogoport/components';
import { useForm, useFieldArray } from '@cogoport/forms';
// import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import { useState } from 'react';

import useGetBusiness from '../hooks/useGetBusiness';

import AddressForm from './AddressForm';
import AsyncGstListController from './AsyncGstListController';
import styles from './styles.module.css';

// const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

function CreateNewBillingAddress({
	setShowComponent = () => {},
	organizationDetails = {},
	refetch = () => {},
	invoiceToTradePartyDetails,
	setInvoiceToTradePartyDetails,
}) {
	const [isUnderGst, setIsUnderGst] = useState(false);
	const [gstNumber, setGstNumber] = useState('');
	const {
		id = '',
		registration_number: organizationRegistrationNumber = '',
		country_id: organizationCountryId = '',
	} = organizationDetails;

	const {
		registrationNumber = '',
		countryId = '',
		tradePartyId = '',
	} = invoiceToTradePartyDetails;

	const countryIdForAddressForm = countryId || organizationCountryId;

	const {
		handleSubmit,
		control,
		register,
		setValue,
		formState: { errors },
	} = useForm();

	const { data } = useGetBusiness({ gstNumber, setValue });

	return (
		<div className={styles.container}>
			<Checkbox
				label="Not Registered Under GST Law"
				value="isAddressRegisteredUnderGst"
				checked={isUnderGst}
				onChange={() => setIsUnderGst(!isUnderGst)}
			/>

			{isUnderGst && (
				<div className={styles.text}>
					Addresses not registered under GST will be added in
					&quot;Other Addresses&quot; for the organisation and&nbsp;
					<b>will not be available for GST Invoicing</b>
					.
				</div>
			)}

			{isUnderGst ? (
				<AddressForm
					isUnderGst={isUnderGst}
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
							registrationNumber={registrationNumber}
						/>

						{gstNumber ? (
							<AddressForm
								isUnderGst={isUnderGst}
								control={control}
								useFieldArray={useFieldArray}
								register={register}
								handleSubmit={handleSubmit}
								errors={errors}
							/>
						) : null}

					</>
				)}

			{/* <AddressForm
				organizationId={id}
				tradePartyId={tradePartyId}
				isAddressRegisteredUnderGst={false}
				addressData={{}}
				addressType="billingAddress"
				showInvoiceTradeParty={false}
				onSuccess={() => {
					setShowComponent('view_billing_addresses');
					refetch?.();
					setInvoiceToTradePartyDetails({});
				}}
				onFailure={({ error }) => {
					Toast.error(error.data);
				}}
				saveAddressData
				showSavedPOC={false}
				formState={{}}
				submitButtonLabel="Submit"
				optionalButtons={[
					{
						className : 'secondary',
						label     : 'Back',
						onClick   : () => {
							setShowComponent('view_billing_addresses');
							setInvoiceToTradePartyDetails({});
						},
					},
				]}
				loading={false}
				validateGst={countryIdForAddressForm === INDIA_COUNTRY_ID}
				registrationNumber={
					registrationNumber || organizationRegistrationNumber
				}
			/> */}
		</div>
	);
}

export default CreateNewBillingAddress;
