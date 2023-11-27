import {
	AsyncSelectController,
	InputController,
	SelectController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import POC_TYPE_OPTION_LIST from '../../../../../../../../../constants/POC_TYPE_OPTION_LIST';

import styles from './styles.module.css';

function CompanyDetails({
	onTradePartnerChange = () => {},
	trade_party_type = null,
	Error = () => {},
	control = {},
	errors = {},
	onShipmentChange = () => {},
}) {
	return (
		<>
			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>POC TYPE</label>
					<SelectController
						name="trade_party_type"
						control={control}
						size="sm"
						rules={{
							required: { value: true, message: 'POC TYPE is required' },
						}}
						placeholder="Select Poc Type"
						options={POC_TYPE_OPTION_LIST}
					/>
					{Error('trade_party_type', errors)}
				</div>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Shipment ID</label>
					<AsyncSelectController
						size="sm"
						name="shipment_id"
						placeholder="Shipment ID"
						control={control}
						rules={{ required: { value: true, message: 'Shipment is Required' } }}
						asyncKey="list_shipments"
						onChange={onShipmentChange}
					/>
					{Error('shipment_id', errors)}
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Select Company (Optional)</label>
					<AsyncSelectController
						size="sm"
						name="trade_party_number"
						placeholder="Select Company"
						control={control}
						disabled={isEmpty(trade_party_type)}
						asyncKey="list_organization_trade_parties"
						params={{ billing_addresses_data_required: true }}
						onChange={onTradePartnerChange}
						isClearable
					/>
					{Error('trade_party_id', errors)}
				</div>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Company Name</label>
					<InputController
						size="sm"
						name="business_name"
						placeholder="Company Name"
						control={control}
						rules={{ required: { value: true, message: 'Company is required' } }}
					/>
					{Error('business_name', errors)}
				</div>

			</div>
			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Select Country</label>
					<AsyncSelectController
						size="sm"
						name="country_id"
						placeholder="Select Country"
						control={control}
						asyncKey="list_locations"
						isClearable
						params={{ filters: { type: 'country' } }}
						rules={{ required: { value: true, message: 'Country is required' } }}
					/>
					{Error('country_id', errors)}
				</div>
			</div>
		</>

	);
}

export default CompanyDetails;
