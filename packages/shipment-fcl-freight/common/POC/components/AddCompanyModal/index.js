import { Modal, RadioGroup, Select } from '@cogoport/components';
import { useState } from 'react';

import { TRADE_PARTY_MAPPING } from '../../../../constants/TRADE_PARTY_MAPPING';
import { convertObjectMappingToArray } from '../../../../utils/convertObjectMappingToArray';

import Form from './Form';
import { tradePartyTypeMapping } from './tradePartyTypeMapping';

function AddCompanyModal({ type = 'self', show = false }) {
	const [companyType, setCompanyType] = useState('trade_partner');
	const options = tradePartyTypeMapping(type);
	const tradePartyOptions = convertObjectMappingToArray(TRADE_PARTY_MAPPING);
	console.log({ companyType });
	return (
		<Modal show={show} placement="top" size="lg">
			<Modal.Header title="Add Company" />
			<div>
				<label>Role</label>
				<Select options={tradePartyOptions} value={type} disabled={type} />
			</div>
			<div>
				<RadioGroup options={options} onChange={((val) => setCompanyType(val))} value={companyType} />
			</div>

			<Form companyType={companyType} tradePartyType={type} />

		</Modal>
	);
}

export default AddCompanyModal;
