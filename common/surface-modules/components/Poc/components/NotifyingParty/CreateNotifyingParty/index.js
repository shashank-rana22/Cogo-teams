import { Button } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useCreateShipmentTradePartner from '../../../../../hooks/useCreateShipmentTradePartner';

import styles from './styles.module.css';

const removeEmptyKeyValuePair = (obj) => {
	const newObj = {};
	Object.keys(obj || {}).forEach((k) => {
		if (obj[k])newObj[k] = obj[k];
	});
	return newObj;
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

	const disabled_mapping = {};

	tradePartnerList.forEach((item) => {
		if (!Object.keys(disabled_mapping).includes(item.trade_party_type)) {
			disabled_mapping[item.trade_party_type] = !isEmpty(item?.trade_partner_details?.poc_data);
		}
	});

	const { control, handleSubmit, watch } = useForm({ defaultValues: { ...disabled_mapping } });
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

				<div className={styles.submit}>
					<Button onClick={handleSubmit(onSubmit)} disabled={submitDisable || createLoading}>Submit</Button>
				</div>
			</form>
		</div>
	);
}

export default CreateNotifyingPary;
