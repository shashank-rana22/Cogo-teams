import { Chips } from '@cogoport/components';
import { IcMFairport, IcMFship, IcMLcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import formatPortPair from '../../../../utils/formatPortPair';

import styles from './styles.module.css';

const iconMapping = {
	fcl_freight : <IcMFship height={16} width={16} />,
	lcl_freight : <IcMLcl height={16} width={16} />,
	air_freight : <IcMFairport height={16} width={16} />,
};

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
	const options = data?.services.length > 1 ? [{ children: 'ALL', key: 'all' }] : [];

	data?.services.forEach((item) => (
		options.push({
			children : startCase(item.split('_')[0]),
			key      : item,
			prefix   : iconMapping[item],
		})));
	return (
		<div className={styles.filters}>
			<Chips
				className={styles.chips_container}
				items={options}
				selectedItems={(state || []).length === (totalPortPair || []).length
					&& data?.services.length > 1 ? 'all' : [state[0]?.service_type]}
				onItemChange={(val) => handleFilterChange(val)}

			/>
		</div>
	);
}

export default StatsTabs;
