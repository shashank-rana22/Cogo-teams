import { Input } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMCross, IcMEdit, IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import useUpdatePricing from '../../../../../hooks/useUpdatePricing';

import styles from './styles.module.css';

function EditPrice({ isEditPrice = false, setIsEditPrice, item = {} }) {
	const { id: pricingId, price } = item || {};

	const [inputValue, setInputValue] = useState(price);

	const { loading = false, submitHandler } = useUpdatePricing({ id: pricingId, setIsEditPrice });

	if (isEditPrice) {
		return (
			<div className={styles.input_box_container}>
				<Input
					size="sm"
					className={styles.input_box}
					disabled={loading}
					value={inputValue}
					onChange={setInputValue}
				/>

				<IcMTick
					className={styles.icon}
					width={20}
					height={20}
					fill="#4bb543"
					onClick={() => submitHandler(inputValue)}
				/>
				<IcMCross
					className={styles.icon}
					width={15}
					height={15}
					fill="#ff9494"
					onClick={() => setIsEditPrice(false)}
				/>
			</div>
		);
	}

	return (
		<>
			<span>
				{formatAmount({
					amount   : inputValue,
					currency : item?.currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 2,
					},
				})}
			</span>
			<IcMEdit className={styles.icon} width={11} height={11} onClick={() => setIsEditPrice(true)} />
		</>
	);
}

export default EditPrice;
