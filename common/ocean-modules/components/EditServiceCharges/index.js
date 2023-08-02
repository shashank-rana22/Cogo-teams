import { Loader } from '@cogoport/components';
import { upperCase } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import useGetServiceChargeCodes from '../../hooks/useGetServiceChargeCodes';
import { calcWidth } from '../Layout/helpers/getTotalFields';

import EditLineItems from './EditLineItems';
import styles from './styles.module.css';

function EditServiceCharges(props) {
	const {
		controls, service_name = '', customValues = {}, onOptionsChange = () => {}, value, shipment_id,
	} = props || {};

	const [q, setQ] = useState('');

	const { data = {}, loading } = useGetServiceChargeCodes({
		service_name,
		shipment_id,
	});

	const chargeCodes = (data?.list || []).map((item) => item.code);

	const miscCharges = useMemo(() => value
		.filter((charge) => !chargeCodes.includes(charge.code))
		.map((charge) => ({
			...charge,
			value : charge.code,
			label : `${charge.code} ${charge.name || ''}`,
			name  : charge.name || '',
		})), [chargeCodes, value]);

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
		const newItem = { ...item, flex: calcWidth(item?.span) };

		if (item?.name === 'code') {
			return {
				...newItem,
				options,
				onSearch: (val) => setQ(val),
			};
		}

		return newItem;
	});

	const allOptions = useMemo(() => [...options, ...miscCharges], [miscCharges, options]);

	useEffect(() => {
		if (allOptions.length && onOptionsChange) {
			onOptionsChange({ [service_name]: allOptions });
		}
	}, [allOptions, onOptionsChange, service_name]);

	if (loading) {
		return (
			<section className={`${styles.loading_wrapper} loading_wrapper`}>
				<Loader />
				Loading Line Items...
			</section>
		);
	}

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
