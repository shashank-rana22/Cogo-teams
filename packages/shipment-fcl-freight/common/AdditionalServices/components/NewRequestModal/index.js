import { Layout } from '@cogoport/air-modules';
import { Modal, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useContext } from 'react';

import getAdvanceDocumentPayload from '../../../../helpers/getAdvanceDocumentPayload';
import useAdvanceDocument from '../../../../hooks/useAdvanceDocument';
import useGetEntities from '../../../../hooks/useGetEntities';

import getFormControls from './controls';
import { getCollectionPartyDetails } from './getCollectionPartyDetails';
import styles from './styles.module.css';

const ONE_OPTION = 1;
const BANK_VERIFICATION_STATUS = ['pending', 'verified'];

const getCollectionPartyParams = (orgIdList = []) => ({
	documents_data_required         : true,
	other_addresses_data_required   : true,
	poc_data_required               : true,
	billing_addresses_data_required : true,
	filters                         : {
		organization_id  : orgIdList,
		trade_party_type : ['collection_party', 'self'],
	},
});

function NewRequestModal({
	showRequestModal = false,
	setShowRequestModal = () => {},
	getShipmentRefetch = () => {},
	collectionPartyList = [],
}) {
	const { partner, user } = useSelector(({ profile }) => profile);

	const refetchAdvanceDocument = () => {
		setShowRequestModal(false);
		getShipmentRefetch();
	};

	const { loading = false, apiTrigger = () => {} } = useAdvanceDocument({ refetchAdvanceDocument });
	const { listEntities = {} } = useGetEntities();

	const {
		shipment_data: { serial_id = '', shipment_type = '' },
	} = useContext(ShipmentDetailContext);

	const { handleModifiedOptions = () => {} } = getCollectionPartyDetails();

	const orgIdList = collectionPartyList?.map((item) => item?.service_provider_id);
	const cpParams = getCollectionPartyParams(orgIdList);

	const [billingParty, setBillingParty] = useState({});
	const [billingPartyAddress, setBillingPartyAddress] = useState({});
	const [collectionParty, setCollectionParty] = useState({});
	const [collectionPartyAddress, setCollectionPartyAddress] = useState({});
	const [collectionPartyBankDetails, setCollectionPartyBankDetails] = useState({});

	const { billing_addresses: billingAddresses = [], other_addresses: otherAddresses = [] } = collectionParty || {};
	const allAddresses = [...billingAddresses, ...otherAddresses];
	const collectionPartyAddresses = (allAddresses || []).map((address) => ({
		...address,
		label : `${address?.address} / ${address?.tax_number}`,
		value : address?.id,
	}));
	const stringifyCollectionPartyAddresses = JSON.stringify(collectionPartyAddresses || []);

	const COLLECTION_PARTY_BANK_OPTIONS = [];
	const bank_details = (collectionParty?.documents || []).filter(
		(item) => item?.document_type === 'bank_account_details',
	);
	(bank_details || []).forEach((bank) => {
		if (
			BANK_VERIFICATION_STATUS.includes(bank?.verification_status)
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

	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useForm();

	const formValues = watch();

	const controls = getFormControls({
		listEntities,
		billingParty,
		setBillingParty,
		setBillingPartyAddress,
		setValue,
		handleModifiedOptions,
		cpParams,
		setCollectionParty,
		collectionPartyAddresses,
		COLLECTION_PARTY_BANK_OPTIONS,
		setCollectionPartyAddress,
		setCollectionPartyBankDetails,
	});

	const onSubmit = () => {
		const payload = getAdvanceDocumentPayload({
			performedById : user?.id || '',
			serial_id,
			shipment_type,
			formValues,
			billingParty,
			billingPartyAddress,
			collectionParty,
			cogoEntityId  : partner?.id,
			collectionPartyAddress,
			collectionPartyBankDetails,
		});
		apiTrigger(payload);
	};

	const showElements = {
		billing_address : !!watch('billing_party'),
		cp_address      : !!watch('collection_party'),
		cp_bank_details : !!watch('cp_address'),
	};

	useEffect(() => {
		const parseOptions = JSON.parse(bankOptions || []);
		if (parseOptions?.length === ONE_OPTION) {
			setValue(
				'cp_bank_details',
				parseOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.data?.bank_account_number,
			);
			setCollectionPartyBankDetails(parseOptions?.[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [bankOptions, setValue]);

	useEffect(() => {
		const parseOptions = JSON.parse(stringifyCollectionPartyAddresses || []);
		if (parseOptions?.length === ONE_OPTION) {
			setValue('cp_address', parseOptions?.[GLOBAL_CONSTANTS.zeroth_index]?.id || '');
			setCollectionPartyAddress(parseOptions?.[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}, [stringifyCollectionPartyAddresses, setValue]);

	return (
		<Modal
			className={styles.modal_container}
			show={showRequestModal}
			onClose={() => setShowRequestModal(false)}
		>
			<Modal.Header title="Request Advance Payment" />
			<Modal.Body>
				<Layout
					control={control}
					fields={controls}
					errors={errors}
					showElements={showElements}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Send For Approval
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NewRequestModal;
