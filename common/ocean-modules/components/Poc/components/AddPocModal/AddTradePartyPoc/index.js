import { Button, Modal, RadioGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import useCreateOrganizationPoc from '../../../../../hooks/useCreateOrganizationPoc';
import useCreateOrganizationTradePartyPoc from '../../../../../hooks/useCreateOrganizationTradePartyPoc';

import CreateNewPOC from './CreateNewPOC';
import ExistingPOC from './ExistingPOC';
import getCreateOrgPocParams from './helpers/getCreateOrgPocParams';
import styles from './styles.module.css';

function AddTradePartyPoc({
	addPoc = {},
	setAddPoc = () => {},
	tradePartnerTrigger = () => {},
	importer_exporter_id = '',
	shipment_id = '',
}) {
	const formRef = useRef(null);
	const { business_name, trade_party_type, service_provider_id = '', trade_party_id } = addPoc || {};

	const [typeOfPOC, setTypeOfPOC] = useState('create_new');
	const [existingPocData, setExistingPocData] = useState([]);

	const onClose = () => setAddPoc(null);

	const createRefetch = () => {
		onClose();
		tradePartnerTrigger();
	};

	const { apiTrigger, loading } = useCreateOrganizationTradePartyPoc({
		shipment_id,
		organization_id : importer_exporter_id,
		refetch         : createRefetch,
	});

	const { apiTrigger:createOrgPocTrigger, loading:orgPocLoading } = useCreateOrganizationPoc({
		shipment_id,
		organization_id : service_provider_id,
		refetch         : createRefetch,
	});

	const radioOptions = [
		{
			value : 'existing',
			label : 'Existing POC',
		},
		{
			value : 'create_new',
			label : 'Create New POC',
		},
	];

	const title = (
		<header className={styles.modal_header}>
			<div>ADD POC</div>
			<div>
				(Company Name:&nbsp;
				<span>{business_name}</span>
				)
			</div>
		</header>
	);

	const onSubmit = (formValues) => {
		if (trade_party_type === 'service_provider') {
			const params = getCreateOrgPocParams({ formValues, existingPocData });
			createOrgPocTrigger(params);
			return;
		}

		const params = getCreateOrgPocParams({ formValues, existingPocData, trade_party_type, trade_party_id });
		apiTrigger(params);
	};

	const formSubmit = () => {
		formRef?.current?.handleSubmit(onSubmit)();
	};

	return (
		<Modal show={!isEmpty(addPoc)} onClose={onClose} placement="top" size="lg">
			<Modal.Header title={title} />

			<Modal.Body style={{ maxHeight: '500px' }}>
				<div>
					<RadioGroup options={radioOptions} value={typeOfPOC} onChange={setTypeOfPOC} />
				</div>

				<div>
					{typeOfPOC === 'existing'
						? (
							<ExistingPOC
								ref={formRef}
								setExistingPocData={setExistingPocData}
								importer_exporter_id={importer_exporter_id}
								service_provider_id={service_provider_id}
								trade_party_type={trade_party_type}
								trade_party_id={trade_party_id}
							/>
						)
						: <CreateNewPOC ref={formRef} />}
				</div>

			</Modal.Body>

			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}><Button themeType="secondary" onClick={onClose}>Cancel</Button></div>
					<div>
						<Button
							themeType="accent"
							onClick={formSubmit}
							disabled={loading || orgPocLoading}
						>
							Submit
						</Button>

					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default AddTradePartyPoc;
