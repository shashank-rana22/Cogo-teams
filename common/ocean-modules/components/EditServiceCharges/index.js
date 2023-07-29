import { Loader } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { upperCase } from '@cogoport/utils';
import { useState, useEffect, useMemo, useContext } from 'react';

import useGetServiceChargeCodes from '../../hooks/useGetServiceChargeCodes';

import EditLineItems from './EditLineItems';
import styles from './styles.module.css';

function EditServiceCharges(props) {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const shipment_id = shipment_data?.id;

	const {
		controls, service_name = '', customValues = {},
		onOptionsChange = () => {}, value,
	} = props || {};

	const [q, setQ] = useState('');

	const { data = {}, loading } = useGetServiceChargeCodes({
		service_name,
		shipment_id,
	});

	const chargeCodes = (data?.list || []).map((item) => item.code);

	const miscCharges = value
		.filter((charge) => !chargeCodes.includes(charge.code))
		.map((charge) => ({
			...charge,
			value : charge.code,
			label : `${charge.code} ${charge.name || ''}`,
			name  : charge.name || '',
		}));

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

	const allOptions = useMemo(() => [...options, ...miscCharges], [miscCharges, options]);

	useEffect(() => {
		if (allOptions.length && onOptionsChange) {
			onOptionsChange({ [service_name]: allOptions });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onOptionsChange, service_name]);

	if (loading) {
		return (
			<section className={`${styles.loading_wrapper} loading_wrapper`}>
				<Loader />
				Loading Line Items...
			</section>
		);
	}

	return (
		<EditLineItems
			{...props}
			controls={finalControls}
			customValues={customValues}
		/>

	);
}

export default EditServiceCharges;
