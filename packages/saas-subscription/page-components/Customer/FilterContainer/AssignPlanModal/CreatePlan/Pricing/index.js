import { Placeholder } from '@cogoport/components';
import { useState } from 'react';

import getValues from '../../../../../../utils/getValues';

import itemFunction from './itemFunction';
import styles from './styles.module.css';

const Pricing = ({
	configs,
	item = [],
	loading = false,
	setUpdatePricing = () => {},
	setFrequencyPeriod = () => {},
}) => {
	const [isEditPrice, setIsEditPrice] = useState(true);
	const itmFn = itemFunction({
		isEditPrice,
		setIsEditPrice,
		setUpdatePricing,
		setFrequencyPeriod,
	});
	return configs.map((config) => (
		<div
			key={`${item?.id}_${config.key}`}
			className={styles.col}
			style={{ width: config?.width }}
		>
			{loading ? (
				<Placeholder />
			) : (
				getValues({ itemData: item, config, itemFunction: itmFn })
			)}
		</div>
	));
};

export default Pricing;
