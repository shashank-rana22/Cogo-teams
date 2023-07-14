import { Toast } from '@cogoport/components';
import React, { useEffect, useRef, useState } from 'react';

function EditInput({
	itemData,
	changeProfitHandler,
	onTickProfit,
	profitValue,
	profit,
	setTickEnable,
}) {
	const { newProfitPercentage = 0 } = itemData || {};

	const [profitValueData, setProfitValueData] = useState(profitValue === '' ? ''
		: profitValue || profit[itemData.jobId] || newProfitPercentage);

	const handleOnChangeProfit = (e) => {
		setTickEnable(true);
		if (e.target.value <= 100) {
			setProfitValueData(e.target.value);
			changeProfitHandler(e.target.value);
		} else {
			Toast.info('Profit margin can not be greater than 100');
		}
	};
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<input
			style={{ width: '45px', height: '30px' }}
			value={profitValueData}
			placeholder="  "
			onChange={(e) => handleOnChangeProfit(e)}
			onKeyDown={(e) => { if (e.key === 'Enter') onTickProfit(itemData); }}
			ref={inputRef}
		/>
	);
}

export default EditInput;
