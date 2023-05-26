import { ShipmentDetailContext } from '@cogoport/context';
import { upperCase } from '@cogoport/utils';
import { useState, useContext } from 'react';

import useGetServiceChargeCodes from '../../hooks/useGetServiceChargeCodes';

import EditLineItems from './EditLineItems';
import styles from './styles.module.css';

function EditServiceCharges(props) {
	const { shipment_data = {}, primary_service = {} } = useContext(ShipmentDetailContext);
	const { controls, service_name = '', customValues = {}, shipment_id = '' } = props || {};

	const [q, setQ] = useState('');

	const { data = {}, loading } = useGetServiceChargeCodes({
		service_name,
		shipment_id,
	});

	const options = (data?.list || [])
		.filter((item) => item?.code?.includes(q) || item?.name?.includes(q) || (item?.code)?.includes(upperCase(q)))
		.map((item) => ({
			value : item?.code,
			label : (
				<div className={styles.label}>
					<div>{`${item?.code || ''} - ${item?.name || ''}`}</div>

					<div>{item?.sac_code}</div>
				</div>
			),
			...item,
		}));

	const finalControls = (controls || []).map((item) => {
		if (item?.name === 'code') {
			return {
				...item,
				options,
				onSearch: (val) => setQ(val),
			};
		}

		return item;
	});

	return (
		<div>
			{!loading ? (
				<EditLineItems
					{...props}
					controls={finalControls}
					customValues={customValues}
				/>
			) : null}
		</div>
	);
}

export default EditServiceCharges;
