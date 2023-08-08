import { Input, Toast } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMCross, IcMEdit, IcMTick, IcMPlus } from '@cogoport/icons-react';

const DEFAULT_TOTAL_AMOUNT = 0;
const MINIMUM_ADD_ON_QUOTA_LIMIT = 1;

export const getSubscriptionColumns = (props) => {
	const {
		editable = false, setEditable = () => {}, quota = {},
		setQuota = () => {},
	} = props || {};
	const { show = false, data = {} } = editable || {};

	const handleAddQuantity = ({ item = {} }) => {
		const enteredQuota = quota[item.id];

		if (enteredQuota < MINIMUM_ADD_ON_QUOTA_LIMIT) {
			Toast.error('Add minimum 1 quantity');
		} else {
			setEditable((previous) => ({ ...previous, show: false }));
		}
	};

	return [
		{
			id       : 1,
			Header   : 'Products',
			accessor : (item) => (
				<div style={{ fontSize: '14px' }}>{item?.product}</div>
			),
		},
		{
			id       : 2,
			Header   : 'Quota',
			accessor : (item) => {
				const { id = '', left_quota = 0 } = item || {};
				const isEditable = show && id === data?.id;

				return (
					<div style={{ display: 'flex', fontSize: '14px', alignItems: 'center' }}>
						<div style={{ marginRight: '6px' }}>{left_quota}</div>
						{isEditable ? (
							<Input
								value={quota?.[id]}
								onChange={(val) => setQuota((prev) => ({ ...prev, [id]: val }))}
								type="number"
								size="sm"
								style={{ width: 200 }}
								placeholder="Enter a quantity"
							/>
						) : (
							<div style={{ display: 'flex', alignItems: 'center', color: '#849E4C', fontWeight: '600' }}>
								<IcMPlus fill="#849E4C" width={15} height={15} />
								{quota?.[id] && (
									<>
										<IcMPlus fill="#849E4C" width={15} height={15} />
										<span>{quota?.[id]}</span>
									</>
								)}

							</div>
						)}
					</div>
				);
			},
		},
		{
			id       : 3,
			Header   : 'Rate/qty',
			accessor : (item) => (
				<div style={{ fontSize: '14px' }}>
					{formatAmount({
						amount   : item.per_quota_rate,
						currency : item.currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							notation              : 'compact',
							compactDisplay        : 'short',
							minimumFractionDigits : 2,
						},
					})}
				</div>
			),
		},
		{
			id       : 4,
			Header   : 'Total',
			accessor : (item) => (
				<div style={{ fontSize: '14px' }}>
					{formatAmount({
						amount   : Number(item.per_quota_rate) * (quota[item.id] || DEFAULT_TOTAL_AMOUNT),
						currency : item.currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							notation              : 'compact',
							compactDisplay        : 'short',
							minimumFractionDigits : 2,
						},
					})}
				</div>
			),
		},
		{
			id       : 5,
			Header   : ' ',
			accessor : (item) => (
				<div>
					{!show ? (
						<IcMEdit
							width={18}
							height={18}
							cursor="pointer"
							fill="#221F20"
							onClick={() => setEditable((previous) => ({ ...previous, data: item, show: true }))}
						/>
					) : (
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<IcMTick
								width={25}
								height={25}
								cursor="pointer"
								fill="#ABCD62"
								onClick={() => handleAddQuantity({ item })}
							/>
							<IcMCross
								width={18}
								height={18}
								cursor="pointer"
								fill="#EE3425"
								onClick={() => setEditable((previous) => ({ ...previous, show: false }))}
							/>
						</div>
					)}
				</div>
			),
		},
	];
};
