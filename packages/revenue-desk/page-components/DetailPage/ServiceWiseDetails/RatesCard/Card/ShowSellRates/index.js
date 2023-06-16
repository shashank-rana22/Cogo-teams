import { Input } from '@cogoport/components';

import { SELL_RATE_INCREASE_BY } from '../../../../../constants';

function ShowSellRates({
	sellRates = {},
	setSellRates = () => {},
	data = {},
}) {
	const { rowData = {}, id = '' } = data || {};

	const { currency = '', buy_price = 0 } = rowData;

	const sellPrice = `${buy_price * SELL_RATE_INCREASE_BY}`;
	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<div style={{
				fontSize    : '16px',
				fontWeight  : '700',
				color       : '#221F20',
				marginRight : '5px',
			}}
			>
				{currency || ''}

			</div>
			<Input
				size="sm"
				value={
					sellRates[id] || sellRates[id] === '' ? sellRates[id] : sellPrice
				}
				onChange={(e) => {
					setSellRates((prev) => ({
						...prev,
						[id]: e,
					}));
				}}
			/>
		</div>
	);
}

export default ShowSellRates;
