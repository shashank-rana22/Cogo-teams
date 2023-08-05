import { Input, Toast } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMCross, IcMEdit, IcMTick, IcMPlus } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from '../styles.module.css';

const DEFAULT_TOTAL_AMOUNT = 0;
const MINIMUM_ADD_ON_QUOTA_LIMIT = 1;

export const getSubscriptionColumns = (props) => {
	const {
		isEdit = false, setIsEdit = () => {}, quota = {},
		setQuota = () => {},
	} = props || {};
	const { show = false, data = {} } = isEdit || {};

	const handleAddQuantity = ({ item = {} }) => {
		const enteredQuota = quota[item.id];

		if (enteredQuota < MINIMUM_ADD_ON_QUOTA_LIMIT) {
			Toast.error('Add minimum 1 quantity');
		} else {
			setIsEdit((previous) => ({ ...previous, show: false }));
		}
	};

	return [
		{
			Header   : 'Products',
			accessor : (item) => (
				<div className={styles.label}>{startCase(item?.service)}</div>
			),
		},
		{
			Header   : 'Quota',
			accessor : (item) => {
				const { id = '', left_limit = 0 } = item || {};
				console.log('item:', item);
				const isEditable = show && id === data?.id;

				return (
					<div className={styles.enter_quota}>
						<div className={styles.left_limit}>{left_limit}</div>
						{isEditable ? (
							<Input
								value={quota?.[id]}
								onChange={(val) => setQuota((prev) => ({ ...prev, [id]: val }))}
								type="number"
								size="sm"
								placeholder="Enter a quantity"
								className={styles.enter_quantity}
							/>
						) : (
							<div className={styles.plus_icon}>
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
			Header   : 'Rate/qty',
			accessor : (item) => (
				<div className={styles.label}>
					{formatAmount({
						amount   : item.addon_limit,
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
			Header   : 'Total',
			accessor : (item) => (
				(
					<div className={styles.label}>
						{formatAmount({
							amount   : Number(item.addon_limit) * (Number(quota[item.id]) || DEFAULT_TOTAL_AMOUNT),
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
				)
			),
		},
		{
			Header   : ' ',
			accessor : (item) => (
				<div className={styles.action}>
					{!show ? (
						<IcMEdit
							width={16}
							height={16}
							cursor="pointer"
							fill="#221F20"
							onClick={() => setIsEdit((previous) => ({ ...previous, data: item, show: true }))}
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
								onClick={() => setIsEdit((previous) => ({ ...previous, show: false }))}
							/>
						</div>
					)}
				</div>
			),
		},
	];
};
