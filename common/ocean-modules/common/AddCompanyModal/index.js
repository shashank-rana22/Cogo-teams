import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import TRADE_PARTY_MAPPING from '../../constants/TRADE_PARTY_MAPPING';
import useCreateShipmentTradePartner from '../../hooks/useCreateShipmentTradePartner';
import { convertObjectMappingToArray } from '../../utils/convertObjectMappingToArray';

import getCreateTradePartnerParams from './helpers/getCreateTradePartnerParams';
import { ModalBodyContent } from './ModalBodyContent';
import { ModalFooterContent } from './ModalFooterContent';
import styles from './styles.module.css';
import tradePartyTypeMapping from './tradePartyTypeMapping';

function AddCompanyModal({
	tradePartnersData = {},
	addCompany = {},
	setAddCompany = () => {},
	tradePartnerTrigger = () => {},
	shipment_id = '',
	importer_exporter_id = '',
	withModal = true,
	shipment_data = {},
	primary_service = {},
	stakeholdersTrigger = () => {},
	getShipmentRefetch = () => {},
}) {
	const formRef = useRef(null);
	const { trade_party_type = '', organization_id } = addCompany || {};
	const { trade_type } = primary_service || {};

	const [role, setRole] = useState(trade_party_type);
	const [companyType, setCompanyType] = useState('trade_partner');

	const options = tradePartyTypeMapping(role, trade_type);
	const tradePartyOptions = convertObjectMappingToArray(TRADE_PARTY_MAPPING);

	const onClose = () => {
		setAddCompany(null);
	};

	const createRefetch = () => {
		onClose();
		tradePartnerTrigger();
		stakeholdersTrigger();
		getShipmentRefetch();
	};

	const { apiTrigger:createTrigger, loading:createLoading } = useCreateShipmentTradePartner({
		shipment_id,
		refetch: createRefetch,
	});

	useEffect(() => {
		setRole(trade_party_type);
	}, [trade_party_type]);

	const onSubmit = (formValues) => {
		const params = getCreateTradePartnerParams({
			...formValues,
			trade_party_type,
			importer_exporter_id,
			organization_id,
			companyType,
		});
		createTrigger(params);
	};

	const formSubmit = () => formRef?.current?.handleSubmit(onSubmit)();

	const modalBodyProps = {
		trade_party_type,
		options,
		tradePartyOptions,
		setRole,
		role,
		setCompanyType,
		companyType,
		tradePartnersData,
		ref: formRef,
		importer_exporter_id,
		shipment_id,
		organization_id,
		shipment_data,
		primary_service,
	};

	if (withModal) {
		return (
			<Modal show={!isEmpty(addCompany)} placement="top" size="lg" onClose={onClose}>
				<Modal.Header title="Add Company" />

				<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
					<ModalBodyContent {...modalBodyProps} />
				</Modal.Body>

				<Modal.Footer>
					<ModalFooterContent formSubmit={formSubmit} onClose={onClose} createLoading={createLoading} />
				</Modal.Footer>

			</Modal>
		);
	}

	return (
		<div>
			<ModalBodyContent {...modalBodyProps} />

			<div className={styles.footer}>
				<ModalFooterContent formSubmit={formSubmit} onClose={onClose} createLoading={createLoading} />
			</div>
		</div>
	);
}

export default AddCompanyModal;
