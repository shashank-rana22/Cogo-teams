import { upperCase } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import useGetServiceChargeCodes from '../../hooks/useGetServiceChargeCodes';

import EditLineItems from './EditLineItems';
import styles from './styles.module.css';

function EditServiceCharges(props) {
	const { controls = [], service_name = '', shipment_id = '', onOptionsChange = () => {}, value } = props;

	const [q, setQ] = useState('');

	const { data = {}, loading } = useGetServiceChargeCodes({
		service_name,
		shipment_id,
	});

	const chargeCodes = (data?.list || []).map((item) => item.code);

	const miscCharges = (value || [])
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
			value : item.code,
			label : (
				<div
					className={styles.label}
				>
					<div>{`${item?.code || ''} - ${item?.name || ''}`}</div>

					<div>
						{item?.sac_code}
					</div>
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
	}, [allOptions.length]);

	return (
		<div>
			{!loading ? (
				<EditLineItems
					{...props}
					controls={finalControls}
				/>
			) : null}
		</div>
	);
}

export default EditServiceCharges;
