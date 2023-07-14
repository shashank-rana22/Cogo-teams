import { Button } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateShipmentTradePartner from '../../../../../hooks/useCreateShipmentTradePartner';

import styles from './styles.module.css';

const removeEmptyKeyValuePair = (obj) => {
	const NEW_OBJ = {};
	Object.keys(obj || {}).forEach((k) => {
		if (obj[k])NEW_OBJ[k] = obj[k];
	});
	return NEW_OBJ;
};

function CreateNotifyingPary({
	tradePartnerList = [], shipment_id = '', tradePartnerTrigger = () => {},
	setShow = () => {},
}) {
	const [submitDisable, setSubmitDiable] = useState(true);

	const createRefetch = () => {
		tradePartnerTrigger();
		setShow(true);
	};

	const { apiTrigger:createTrigger, loading:createLoading } = useCreateShipmentTradePartner({
		shipment_id,
		refetch: createRefetch,
	});

	const DISABLED_MAPPING = {};

	tradePartnerList.forEach((item) => {
		if (!Object.keys(DISABLED_MAPPING).includes(item.trade_party_type)) {
			DISABLED_MAPPING[item.trade_party_type] = !isEmpty(item?.trade_partner_details?.poc_data);
		}
	});

	const { control, handleSubmit, watch } = useForm({ defaultValues: { ...DISABLED_MAPPING } });
	const formValues = watch();

	const onSubmit = (val) => {
		const selected = removeEmptyKeyValuePair(val);
		const params = {
			dependent_trade_party_type : Object.keys(selected),
			trade_party_type           : 'notifying_party',
		};
		createTrigger(params);
	};

	useEffect(() => {
		const selected = removeEmptyKeyValuePair(formValues);
		if (!isEmpty(selected)) { setSubmitDiable(false); } else { setSubmitDiable(true); }
	}, [formValues]);

	return (
		<div>
			<form>
				<div className={styles.row}>

					<CheckboxController
						name="self"
						control={control}
						disabled={!DISABLED_MAPPING.self}
					/>
					<label>Booking Party</label>
				</div>
				<div className={styles.row}>
					<CheckboxController
						name="shipper"
						control={control}
						disabled={!DISABLED_MAPPING.shipper}
					/>
					<label>Shipper</label>
				</div>
				<div className={styles.row}>

					<CheckboxController
						name="consignee"
						control={control}
						disabled={!DISABLED_MAPPING.consignee}
					/>
					<label>Consignee</label>
				</div>

				<div className={styles.submit}>
					<Button onClick={handleSubmit(onSubmit)} disabled={submitDisable || createLoading}>Submit</Button>
				</div>
			</form>
		</div>
	);
}

export default CreateNotifyingPary;
