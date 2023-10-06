import { Chips } from '@cogoport/components';
import { IcMFairport, IcMFship, IcMLcl, IcMLocalCharges } from '@cogoport/icons-react';

import formatPortPair from '../../../../utils/formatPortPair';

import styles from './styles.module.css';

const servicesMapping = {
	fcl_freight       : { label: 'FCL', icon: <IcMFship height={16} width={16} /> },
	lcl_freight       : { label: 'LCL', icon: <IcMLcl height={16} width={16} /> },
	air_freight       : { label: 'AIR', icon: <IcMFairport height={16} width={16} /> },
	fcl_freight_local : { label: 'FCL Local', icon: <IcMLocalCharges height={16} width={16} /> },
	lcl_freight_local : { label: 'LCL Local', icon: <IcMLocalCharges height={16} width={16} /> },
};

const ZERO = 0; const
	ONE = 1;

function StatsTabs({ data, state, setState, setServiceType }) {
	const totalPortPair = formatPortPair({ item: data });
	const handleFilterChange = (val) => {
		let portPairs = totalPortPair;
		let service = '';
		if (val !== 'all') {
			portPairs = totalPortPair.filter((item) => item.service_type === val);
			service = val;
		}
		setServiceType(service);
		setState(portPairs);
	};
	const options = data?.services.length > ONE ? [{ children: 'ALL', key: 'all' }] : [];

	data?.services.forEach((item) => (
		options.push({
			children : servicesMapping[item].label,
			key      : item,
			prefix   : servicesMapping[item].icon,
		})));

	return (
		<div className={styles.filters}>
			<Chips
				className={styles.chips_container}
				items={options}
				selectedItems={(state || []).length === (totalPortPair || []).length
					&& data?.services.length > ONE ? 'all' : [state[ZERO]?.service_type]}
				onItemChange={(val) => handleFilterChange(val)}

			/>
		</div>
	);
}

export default StatsTabs;
