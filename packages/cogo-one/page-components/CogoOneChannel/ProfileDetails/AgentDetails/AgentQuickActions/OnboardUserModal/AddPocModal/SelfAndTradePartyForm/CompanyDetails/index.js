import {
	AsyncSelectController,
	ChipsController,
	InputController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import POC_TYPE_OPTION_LIST from '../../../../../../../../../constants/POC_TYPE_OPTION_LIST';

import styles from './styles.module.css';

function CompanyDetails({
	onTradePartnerChange = () => {},
	trade_party_type = null,
	Error = () => {},
	watch = {},
	control = {},
	errors = {},
	onShipmentChange = () => {},
	importerExporterId = '',
}) {
	const { business_name = '', trade_party_id = '', shipment_id = '' } = watch() || {};

	return (
		<>
			<div className={styles.basic_details}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>POC TYPE</label>
					<ChipsController
						name="trade_party_type"
						control={control}
						size="sm"
						rules={{
							required: { value: true, message: 'POC TYPE is required' },
						}}
						placeholder="Select Poc Type"
						options={POC_TYPE_OPTION_LIST}
						enableMultiSelect={false}
					/>
					{Error('trade_party_type', errors)}
				</div>
				<div className={styles.basic_details_item_container}>
					<label className={styles.form_label}>Shipment ID</label>
					<AsyncSelectController
						size="xs"
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
				<div className={styles.select_company}>
					<label className={styles.form_label}>Select Company</label>
					<AsyncSelectController
						size="xs"
						name="trade_party_number"
						placeholder="Select Company"
						control={control}
						disabled={isEmpty(trade_party_type) || isEmpty(shipment_id)}
						asyncKey="list_organization_trade_parties"
						params={{
							billing_addresses_data_required : true,
							filters                         : {
								trade_party_type : ['origin_cha', 'destination_cha'],
								organization_id  : importerExporterId,
							},
						}}
						onChange={onTradePartnerChange}
						isClearable
						rules={{ required: { value: isEmpty(business_name), message: 'Company is required' } }}
					/>
					{Error('trade_party_id', errors)}
				</div>
				<div className={styles.or}>OR</div>
				<div className={styles.trade_party}>
					<div className={styles.select_country}>
						<label className={styles.form_label}>Country</label>
						<AsyncSelectController
							size="xs"
							name="country_id"
							placeholder="Select Country"
							control={control}
							asyncKey="list_locations"
							isClearable
							params={{ filters: { type: 'country' } }}
							rules={{ required: { value: isEmpty(trade_party_id), message: 'Country is required' } }}
							initialCall
						/>
						{Error('country_id', errors)}
					</div>

					<div className={styles.add_company}>
						<label className={styles.form_label}>Company Name</label>
						<InputController
							size="xs"
							name="business_name"
							placeholder="Company Name"
							control={control}
							rules={{ required: { value: isEmpty(trade_party_id), message: 'Company is required' } }}
						/>
						{Error('business_name', errors)}
					</div>
				</div>
			</div>

		</>

	);
}

export default CompanyDetails;
