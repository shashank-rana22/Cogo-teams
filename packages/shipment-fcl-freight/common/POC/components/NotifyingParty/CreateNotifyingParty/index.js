import { CheckboxController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function CreateNotifyingPary({ tradePartnerList = [] }) {
	const disabled_mapping = {};

	tradePartnerList.forEach((item) => {
		if (!Object.keys(disabled_mapping).includes(item.trade_party_type)) {
			disabled_mapping[item.trade_party_type] = !isEmpty(item?.trade_partner_details?.poc_data);
		}
	});

	const { control } = useForm({ defaultValues: { ...disabled_mapping } });

	return (
		<div>
			<form>
				<div className={styles.row}>

					<CheckboxController
						name="self"
						control={control}
						disabled={!disabled_mapping.self}
					/>
					<label>Booking Party</label>
				</div>
				<div className={styles.row}>
					<CheckboxController
						name="shipper"
						control={control}
						disabled={!disabled_mapping.shipper}
					/>
					<label>Shipper</label>
				</div>
				<div className={styles.row}>

					<CheckboxController
						name="consignee"
						control={control}
						disabled={!disabled_mapping.consignee}
					/>
					<label>Consignee</label>
				</div>
			</form>
		</div>
	);
}

export default CreateNotifyingPary;
