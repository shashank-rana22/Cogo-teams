import { Toast } from '@cogoport/components';
import { AsyncSelectController, SelectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import AccordianView from '../../../common/Accordianview';

import RenderLabel from './RenderLabel';
import styles from './styles.module.css';
import collectionPartyBankDetails from './utils/collectionPartyBankDetails';
import { getCollectionPartyDetails } from './utils/getCollectionPartyDetails';

const ONE_OPTION = 1;

function CollectionPartyDetails({
	control,
	collectionParty = {},
	setCollectionParty = () => {},
	setValue = () => {},
	watch = () => {},
	serviceProvider = {},
	collectionPartyAddresses = [],
	errors = {},
	errMszs = {},
	purchaseInvoiceValues = {},
	open,
	setShowCollectionParty = () => {},
	setShowBankForm = () => {},
	formValues = {},
}) {
	const organization_id = serviceProvider?.service_provider_id;

	const PARAMS = {
		documents_data_required         : true,
		other_addresses_data_required   : true,
		poc_data_required               : true,
		billing_addresses_data_required : true,
		page_limit                      : 50,
		filters                         : {
			organization_id,
			trade_party_type: ['collection_party', 'self'],
		},
	};

	const bilingAddressGst = watch('collection_party_address');

	const collectionPartyAddress = collectionPartyAddresses?.find(
		(item) => item?.id === bilingAddressGst,
	);

	const COLLECTION_PARTY_BANK_OPTIONS = [];

	const bank_details = (collectionParty.documents || []).filter(
		(item) => item?.document_type === 'bank_account_details',
	);
	(bank_details || []).forEach((bank) => {
		if (
			['pending', 'verified'].includes(bank?.verification_status)
			&& bank?.status === 'active'
		) {
			COLLECTION_PARTY_BANK_OPTIONS.push({
				...bank,
				label : bank?.data?.bank_name,
				value : bank?.data?.bank_account_number,
			});
		}
	});

	const bankOptions = JSON.stringify(COLLECTION_PARTY_BANK_OPTIONS || []);

	const stringifycollectionPartyAddresses = JSON.stringify(collectionPartyAddresses || []);

	const { handleModifiedOptions } = getCollectionPartyDetails();

	const bankAccountNumber = watch('collection_party_bank_details');

	const collectionPartyBank = COLLECTION_PARTY_BANK_OPTIONS?.find(
		(item) => item?.value === bankAccountNumber,
	);

	const COLLECTION_PARTY_BANK_DETAILS = collectionPartyBankDetails(
		{ collectionPartyAddress, collectionPartyBank, collectionParty },
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
					|| address?.id === purchaseInvoiceValues?.collection_party_address
				) {
					newCollectionParty = cp;
					collectionPartyAdd = address;
				}
			});
		});

		if (newCollectionParty) {
			setValue('collection_party_address', collectionPartyAdd?.id);
			setValue('collection_party_bank_details', purchaseInvoiceValues?.collection_party_bank_details);
			setCollectionParty({
				...newCollectionParty,
				collection_party_address      : collectionPartyAdd?.id,
				collection_party_bank_details : purchaseInvoiceValues?.collection_party_bank_details,
			});
		}
	};

	const handleCollectionParty = (v, obj) => {
		if (obj?.verification_status === 'pending') {
			setValue('collection_party', undefined);
			Toast.error('Cannot select KYC pending collection party!');
		} else {
			setCollectionParty(obj);
			setValue('collection_party', v);
		}
		if (collectionPartyAddresses?.length === ONE_OPTION) {
			setValue('collection_party_address', collectionPartyAddresses?.[GLOBAL_CONSTANTS.zeroth_index].id);
		} else {
			setValue('collection_party_address', '');
		}
		if (COLLECTION_PARTY_BANK_OPTIONS?.length === ONE_OPTION) {
			setValue(
				'collection_party_bank_details',
				COLLECTION_PARTY_BANK_OPTIONS?.[GLOBAL_CONSTANTS.zeroth_index]?.data?.bank_account_number,
			);
		} else {
			setValue('collection_party_bank_details', '');
		}
	};

	useEffect(() => {
		setValue('collection_party_bank_details', purchaseInvoiceValues?.collection_party_bank_details);
	}, [bankOptions, setValue, purchaseInvoiceValues]);

	useEffect(() => {
		const parseOptions = JSON.parse(bankOptions || []);
		if (parseOptions?.length === ONE_OPTION) {
			setValue(
				'collection_party_bank_details',
				parseOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.data?.bank_account_number,
			);
		}
	}, [bankOptions, setValue]);

	useEffect(() => {
		const parseOptions = JSON.parse(stringifycollectionPartyAddresses || []);
		if (parseOptions?.length === ONE_OPTION) {
			setValue('collection_party_address', parseOptions?.[GLOBAL_CONSTANTS.zeroth_index].id);
		}
	}, [stringifycollectionPartyAddresses, setValue]);

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
						handleChange={(v, obj) => { handleCollectionParty(v, obj); }}
						value={collectionParty.registration_number || purchaseInvoiceValues?.collection_party}
						params={PARAMS}
						initialCall
						rules={{ required: true }}
					/>
					{errors?.collection_party ? (
						<div className={styles.errors}>
							Collection Party is Required
						</div>
					) : null}
				</div>
				{!isEmpty(formValues?.collection_party) ? (
					<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
						<div className={styles.label}>Select Collection Party Address</div>
						<SelectController
							control={control}
							name="collection_party_address"
							placeholder="Enter Collection Party Address"
							options={collectionPartyAddresses}
							rules={{ required: true }}
						/>
						{errors?.collection_party_address ? (
							<div className={styles.errors}>
								Collection Party Address is Required
							</div>
						) : null}
					</div>
				) : null}
				<div className={`${styles.selectcontainer} ${styles.marginleft}`}>
					{!isEmpty(COLLECTION_PARTY_BANK_OPTIONS) ? (
						<div>
							<div className={styles.label}>Select Bank Details</div>
							<SelectController
								control={control}
								name="collection_party_bank_details"
								placeholder="Select Bank Details"
								options={COLLECTION_PARTY_BANK_OPTIONS}
								renderLabel={(bank) => <RenderLabel bank={bank} />}
								rules={{ required: true }}
							/>
							{errors?.collection_party_bank_details ? (
								<div className={styles.errors}>
									Collection Party Bank Details is Required
								</div>
							) : null}
						</div>
					) : null}
					{!isEmpty(formValues?.collection_party) ? (
						<div
							className={styles.link}
							role="presentation"
							onClick={() => { setShowBankForm(true); }}
						>
							+ Add Bank Details
						</div>
					) : null}
				</div>
				<div className={`${styles.marginTop} ${styles.circle}`}>
					<IcMPlusInCircle height={20} width={20} onClick={() => { setShowCollectionParty(true); }} />
				</div>
			</div>
			{collectionPartyBank ? (
				<div className={styles.address}>
					{COLLECTION_PARTY_BANK_DETAILS.map(({ label = '', value = '' }) => (
						<div className={styles.flex} key={label}>
							<span className={styles.key}>{label}</span>
							<span className={styles.value}>
								{value}
							</span>
						</div>
					))}
				</div>
			) : null}
		</AccordianView>
	);
}

export default CollectionPartyDetails;
