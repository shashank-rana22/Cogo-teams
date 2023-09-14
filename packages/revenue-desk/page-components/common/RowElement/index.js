import { Button, InputNumber } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function RowElement({
	data = {}, list = [],
	column_width = '', disabledInput = false, maxHeight: max,
	apiTrigger = () => {},
	deskValue = {},
	setOpenForm = () => {},
	openForm = false,
	addWeightage = false,
}) {
	const shipmentParameters = deskValue?.shipment_parameters;
	const serviceType = deskValue?.service_type;

	const { fulfillment_ratio = {}, ...rest } = data || {};

	const {
		overall_weightage,
		_2_day,
		_7_day,
		_30_day,
	} = fulfillment_ratio;

	const current_weightage = {
		...rest,
		overall_weightage,
		_2_day,
		_7_day,
		_30_day,
	};
	const INITIAL_WEIGHT = {};
	list.map((item) => {
		const row = item?.key;
		INITIAL_WEIGHT[row] = GLOBAL_CONSTANTS.zeroth_index;
		return null;
	});
	const [weightageList, setWeightageList] = useState(INITIAL_WEIGHT);

	const setValue = ({ val, keyValue }) => {
		setWeightageList((prev) => ({ ...prev, [keyValue]: (val || GLOBAL_CONSTANTS.zeroth_index) }));
	};

	const handelWeightages = () => {
		apiTrigger({ shipmentParameters, serviceType, weightageList, setOpenForm, openForm, deskValue });
	};

	const isFulfillType = (item) => {
		const key = item?.key;
		return ['_2_day', '_7_day', '_30_day'].includes(key);
	};

	return (
		<>
			<div className={styles.table} style={{ maxHeight: max, overflow: 'scroll' }}>
				{list.map((item) => (
					<div className={styles.row} key={item}>
						<div
							style={{ width: column_width }}
						>
							<div className={!isFulfillType(item) ? null : styles.row_subitem}>
								{isFulfillType(item) ? <IcMArrowRotateRight /> : null}
								<div className={isFulfillType(item) ? styles.text : null}>{item.label}</div>
							</div>
						</div>
						{!addWeightage && (
							<div style={{ width: column_width }} className={styles.row_item}>
								{current_weightage?.[item?.key] || GLOBAL_CONSTANTS.zeroth_index}
								%
							</div>
						)}
						<div style={{ width: column_width }} className={styles.row_item}>
							<InputNumber
								size="sm"
								placeholder="0.00%"
								max={100}
								step={0.1}
								disabled={!disabledInput && !addWeightage}
								onChange={(val) => setValue({ val, keyValue: item?.key })}
							/>
						</div>
					</div>
				))}
			</div>
			<div className={styles.button}>
				<Button onClick={handelWeightages} type="submit">Save</Button>
			</div>
		</>
	);
}
export default RowElement;
