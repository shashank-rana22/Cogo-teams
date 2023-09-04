import { Modal, Button } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	SelectController,
	TextAreaController,
	UploadController,
	useForm,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useContext } from 'react';

import getAdvanceDocumentPayload from '../../../../helpers/getAdvanceDocumentPayload';
import useAdvanceDocument from '../../../../hooks/useAdvanceDocument';
import useGetEntities from '../../../../hooks/useGetEntities';

import formControls from './controls';
import { getCollectionPartyDetails } from './getCollectionPartyDetails';
import styles from './styles.module.css';

const ONE_OPTION = 1;

const controlTypeMapping = {
	text        : InputController,
	select      : SelectController,
	textarea    : TextAreaController,
	number      : InputController,
	asyncSelect : AsyncSelectController,
	upload      : UploadController,
	datepicker  : DatepickerController,
};

function FormElement({ name, label, type, errors, showElements, ...rest }) {
	const Element = controlTypeMapping[type];
	const show = !isEmpty(showElements[name]) ? showElements[name] : true;

	return (Element && show) ? (
		<div>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

const getCollectionPartyParams = (organization_id) => ({
	documents_data_required         : true,
	other_addresses_data_required   : true,
	poc_data_required               : true,
	billing_addresses_data_required : true,
	filters                         : {
		organization_id,
		trade_party_type: ['collection_party', 'self'],
	},
});

function NewRequestModal({
	showRequestModal = false,
	setShowRequestModal = () => {},
}) {
	const { profile } = useSelector((state) => state);
	const { partner, user } = profile || {};

	const { loading, apiTrigger } = useAdvanceDocument(setShowRequestModal);
	const { listEntities } = useGetEntities();

	const { primary_service, shipment_data } = useContext(ShipmentDetailContext);
	const serial_id = shipment_data?.serial_id;

	const organization_id = primary_service?.service_provider?.id || '';
	const { handleModifiedOptions } = getCollectionPartyDetails();
	const PARAMS = getCollectionPartyParams(organization_id);

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

	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
		setValue,
	} = useForm();

	const formValues = watch();

	const controls = formControls({
		listEntities,
		billingParty,
		setBillingParty,
		setBillingPartyAddress,
		setValue,
		handleModifiedOptions,
		PARAMS,
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
				{(controls || []).map((item) => (
					<FormElement
						key={item?.name}
						control={control}
						errors={errors}
						{...item}
						showElements={showElements}
					/>
				))}
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
