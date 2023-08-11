import { Input } from '@cogoport/components';

import { SELL_RATE_INCREASE_BY } from '../../../../../constants';

function ShowSellRates({
	sellRates = {},
	setSellRates = () => {},
	data = {},
}) {
	const { rowData = {}, id = '' } = data || {};

	const { currency = '', price = 0, sell_price_per_container = 0, sell_price_currency = '', api = '' } = rowData;

	const sellPrice = api === 'showed_rates' ? Number(sell_price_per_container) * Number(SELL_RATE_INCREASE_BY)
		: Number(price) * Number(SELL_RATE_INCREASE_BY);
	return (
		<div>
			{api ? 	(
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div style={{
						fontSize    : '16px',
						fontWeight  : '700',
						color       : '#221F20',
						marginRight : '5px',
					}}
					>
						{sell_price_currency || ''}
					</div>
					<Input
						size="sm"
						value={api === 'showed_rates' ? sellPrice : sell_price_per_container}
						disable
					/>
				</div>
			) : (
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
			)}
		</div>
	);
}

export default ShowSellRates;
