import { Toast } from '@cogoport/components';
import { AsyncSelectController, SelectController } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import AccordianView from '../../../common/Accordianview';

import styles from './styles.module.css';

function CollectionPartyDetails({
	control,
	collectionParty = {},
	setCollectionParty,
	setValue,
	watch,
	serviceProvider,
	collectionPartyAddresses,
	errors,
	errMszs,
	purchaseInvoiceValues,
	open,
	setShowCollectionParty,
	setShowBankForm,
	formValues,
}) {
	const organization_id = serviceProvider?.service_provider_id;

	const bilingAddressGst = watch('collection_party_address');

	const collectionPartyAddress = collectionPartyAddresses?.find(
		(item) => item?.tax_number === bilingAddressGst,
	);

	const collectionPartyBankOptions = [];

	const bank_details = (collectionParty.documents || []).filter(
		(item) => item.document_type === 'bank_account_details',
	);
	(bank_details || []).forEach((bank) => {
		if (
			['pending', 'verified'].includes(bank.verification_status)
			&& bank.status === 'active'
		) {
			collectionPartyBankOptions.push({
				...bank,
				label : bank?.data?.bank_name,
				value : bank?.data?.bank_account_number,
			});
		}
	});

	const handleModifiedOptions = ({ options }) => options.map((option) => ({
		...option,
		display_name:
	<div className={styles.spacebetween}>
		<div>{option?.display_name}</div>
		<div className={styles.verification_status}>{startCase(option.verification_status)}</div>
	</div>,
		registration_number: option?.registration_number,
	}));

	const bankAccountNumber = watch('collection_party_bank_details');

	const collectionPartyBank = collectionPartyBankOptions?.find(
		(item) => item?.value === bankAccountNumber,
	);

	const handleOption = (option) => {
		let newCollectionParty = null;
		let collectionPartyAdd = null;
		(option || []).forEach((cp) => {
			const allAddresses = [
				...(cp?.billing_addresses || []),
				...(cp?.other_addresses || []),
			];
			(allAddresses || []).forEach((address) => {
				if (
					address?.address
					=== purchaseInvoiceValues?.collection_party_address
					|| address?.tax_number === purchaseInvoiceValues?.collection_party_address
				) {
					newCollectionParty = cp;
					collectionPartyAdd = address;
				}
			});
		});

		if (newCollectionParty) {
			setValue('collection_party_address', collectionPartyAdd?.tax_number);
			setValue('collection_party_bank_details', purchaseInvoiceValues?.collection_party_bank_details);
			setCollectionParty({ ...newCollectionParty, collection_party_address: collectionPartyAdd?.tax_number });
		}
	};

	return (
		<AccordianView title="Collection Party Details" fullwidth showerror={errMszs.collectionPartyErr} open={open}>
			<div className={styles.flex}>
				<div className={styles.selectcontainer}>
					<div className={styles.label}>Collection Party/Bank Details</div>
					<AsyncSelectController
						control={control}
						name="collection_party"
						placeholder="Select Collection Party"
						asyncKey="list_organization_trade_parties"
						getModifiedOptions={handleModifiedOptions}
						onOptionsChange={handleOption}
						handleChange={(v, obj) => {
							if (obj?.verification_status === 'pending') {
								setValue('collection_party', undefined);
								setValue('collection_party_address', '');
								setValue('collection_party_bank_details', '');
								Toast.error('Cannot select KYC pending collection party!');
							} else {
								setCollectionParty(obj);
								setValue('collection_party', v);
							}
						}}
						value={collectionParty.registration_number || purchaseInvoiceValues?.collection_party}
						params={{
							documents_data_required         : true,
							other_addresses_data_required   : true,
							poc_data_required               : true,
							billing_addresses_data_required : true,
							page_limit                      : 50,
							filters                         : {
								organization_id,
								trade_party_type: ['collection_party', 'self'],
							},
						}}
						rules={{ required: true }}
					/>
					{errors?.collection_party && (
						<div className={`${styles.errors}`}>
							Collection Party is Required
						</div>
					)}
				</div>
				{!isEmpty(formValues?.collection_party) && (
					<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
						<div className={styles.label}>Select Collection Party Address</div>
						<SelectController
							control={control}
							name="collection_party_address"
							placeholder="Enter Collection Party Address"
							options={collectionPartyAddresses}
							rules={{ required: true }}
							value={purchaseInvoiceValues?.collection_party_address}
						/>
						{errors?.collection_party_address && (
							<div className={`${styles.errors}`}>
								Collection Party Address is Required
							</div>
						)}
					</div>
				)}
				{!isEmpty(formValues?.collection_party) && (
					<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
						<div className={styles.label}>Select Bank Details</div>
						<SelectController
							control={control}
							name="collection_party_bank_details"
							placeholder="Select Bank Details"
							options={collectionPartyBankOptions}
							renderLabel={(bank) => (
								<div className={styles.flex}>
									{bank?.data?.bank_name}
									{' '}
									/
									{' '}
									{bank?.data?.branch_name}
									<div className={styles.verification_status}>
										{startCase(bank.verification_status)}
									</div>
								</div>
							)}
							rules={{ required: true }}
							value={purchaseInvoiceValues?.collection_party_bank_details}
						/>
						{errors?.collection_party_bank_details && (
							<div className={`${styles.errors}`}>
								Collection Party Bank Details is Required
							</div>
						)}
						<div
							className={styles.link}
							role="presentation"
							onClick={() => { setShowBankForm(true); }}
						>
							{' '}
							+ Add Bank Details

						</div>
					</div>
				)}
				<div className={`${styles.marginTop} ${styles.circle}`}>
					<IcMPlusInCircle height={20} width={20} onClick={() => { setShowCollectionParty(true); }} />
				</div>
			</div>
			{collectionPartyBank && (
				<div className={styles.address}>
					<div className={`${styles.flex} ${styles.margintop}`}>
						<span className={styles.key}>BankDetails</span>
						<span className={styles.value}>
							:
							{' '}
							{`${collectionPartyBank?.data?.bank_name || '-'}
							/ ${collectionPartyBank?.data?.branch_name || '-'
								}`}
						</span>
						<div className={styles.flex}>
							<span className={styles.key}>AccountNumber</span>
							<span className={styles.value}>
								:
								{collectionPartyBank?.data?.bank_account_number || '-'}
							</span>
						</div>
						<div className={styles.flex}>
							<span className={styles.key}>IFSC</span>
							<span className={styles.value}>
								:
								{collectionPartyBank?.data?.ifsc_number || '-'}
							</span>
						</div>
					</div>
					<div className={`${styles.flex} ${styles.margintop}`}>
						<div>
							<span className={styles.key}>PAN Number</span>
							<span className={styles.value}>
								:
								{collectionParty?.registration_number}
							</span>
						</div>
						<div>
							<span className={styles.key}>GST Number</span>
							<span className={styles.value}>
								:
								{' '}
								{collectionPartyAddress?.tax_number}
							</span>
						</div>
					</div>
				</div>
			)}
		</AccordianView>
	);
}

export default CollectionPartyDetails;
