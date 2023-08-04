import { RadioGroup, Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import Form from './Form';
import styles from './styles.module.css';

export function ModalBodyContent({
	trade_party_type = '',
	options = [],
	tradePartyOptions = [],
	setRole = () => {},
	role = '',
	setCompanyType = () => {},
	companyType = '',
	tradePartnersData = {},
	formRef = {},
	importer_exporter_id = '',
	shipment_id = '',
	organization_id = '',
	shipment_data = {},
	primary_service = {},
}) {
	return (
		<div className={styles.modal_body_container}>
			{trade_party_type ? (
				<div className={styles.role_container}>
					<b>Role:</b>
					{' '}
					<span>{startCase(trade_party_type)}</span>
				</div>
			) : (
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
			)}

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
}
