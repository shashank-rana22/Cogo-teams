import { Button, Modal, RadioGroup, Select } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import TRADE_PARTY_MAPPING from '../../constants/TRADE_PARTY_MAPPING';
import useCreateShipmentTradePartner from '../../hooks/useCreateShipmentTradePartner';
import { convertObjectMappingToArray } from '../../utils/convertObjectMappingToArray';

import Form from './Form';
import getCreateTradePartnerParams from './helpers/getCreateTradePartnerParams';
import styles from './styles.module.css';
import tradePartyTypeMapping from './tradePartyTypeMapping';

function AddCompanyModal({
	tradePartnersData = {},
	addCompany = {},
	setAddCompany = () => {},
	tradePartnerTrigger = () => {},
	shipment_id = '',
	importer_exporter_id = '',
	throughPoc = true,
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

	const modalBodyContent = (
		<div className={styles.modal_body_container}>
			{trade_party_type
				? (
					<div className={styles.role_container}>
						<b>Role:</b>
						{' '}
						<span>{startCase(trade_party_type)}</span>
					</div>
				)
				: (
					<div className={styles.role_container}>
						<label>Role</label>
						<Select
							options={tradePartyOptions}
							value={role}
							size="sm"
							disabled={trade_party_type}
							onChange={(val) => setRole(val)}
						/>
					</div>
				) }
			<div className={styles.radio_container}>
				<RadioGroup
					options={options}
					onChange={(val) => setCompanyType(val)}
					value={companyType}
				/>
			</div>
			<Form
				companyType={companyType}
				tradePartyType={role}
				tradePartnersData={tradePartnersData}
				ref={formRef}
				importer_exporter_id={importer_exporter_id}
				shipment_id={shipment_id}
				organization_id={organization_id}
				shipment_data={shipment_data}
				primary_service={primary_service}
			/>
		</div>
	);

	const modalFooterContent = (
		<div className={styles.actions}>
			<div className={styles.cancel}>
				<Button
					themeType="secondary"
					onClick={onClose}
					disabled={createLoading}
				>
					Cancel
				</Button>
			</div>
			<div>
				<Button
					themeType="accent"
					onClick={formSubmit}
					disabled={createLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);

	if (throughPoc) {
		return (
			<Modal show={!isEmpty(addCompany)} placement="top" size="lg" onClose={onClose}>
				<Modal.Header title="Add Company" />

				<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
					{ modalBodyContent}
				</Modal.Body>

				<Modal.Footer>
					{ modalFooterContent}
				</Modal.Footer>

			</Modal>
		);
	}

	return (
		<div>
			{modalBodyContent}
			<div className={styles.footer}>{modalFooterContent}</div>
		</div>
	);
}

export default AddCompanyModal;
