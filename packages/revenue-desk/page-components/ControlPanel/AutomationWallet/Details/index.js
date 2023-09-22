import { Button, Input, Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { VALUE_TEN, VALUE_ZERO } from '../../../constants';
import useUpdateRevenueDeskWallet from '../../hooks/useUpdateRevenueDeskWallet';

import styles from './styles.module.css';

function AutomationWalletDetails({ data = {}, refetch = () => {} }) {
	const [disabledValue, setDisabledValue] = useState(false);
	const [walletAmount, setWalletAmount] = useState(data?.wallet_amount);

	const { service_type = '', shipment_parameters = {}, wallet_used = '', currency = '' } = data || {};
	const { trade_type, origin_location = '', destination_location = '' } = shipment_parameters || {};

	const { updateRevenueDeskWallet } = useUpdateRevenueDeskWallet({
		service_type,
		data,
		wallet_amount: walletAmount,
		refetch,
	});

	return (
		<div className={styles.container}>
			<div>
				<div>{startCase(service_type)}</div>
				<div className={styles.service}>
					<div className={styles.content_details}>
						{trade_type && (
							<div className={styles.content}>
								Trade Type :
								{' '}
								{startCase(trade_type)}
							</div>
						)}
						{origin_location &&	(
							<div className={styles.content}>
								Origin Location :
								{origin_location?.name?.length > VALUE_TEN
									? (
										<Tooltip content={origin_location?.name}>
											{origin_location?.name?.slice(VALUE_ZERO, VALUE_TEN)}
											...
										</Tooltip>
									) : origin_location?.name}
							</div>
						)}
						{destination_location
							&& (
								<div className={styles.content}>
									Destination Location :
									{destination_location?.name?.length > VALUE_TEN
										? (
											<Tooltip content={destination_location?.name}>
												{destination_location?.name?.slice(VALUE_ZERO, VALUE_TEN)}
												...
											</Tooltip>
										) : destination_location?.name}
								</div>
							)}

						<div className={styles.content}>
							Wallet Used :
							{formatAmount({
								amount  : wallet_used,
								currency,
								options : {
									style: 'currency',
								},
							}) || '-'}
						</div>

						<div className={styles.content}>
							Wallet Remaining :
							{formatAmount({
								amount  : walletAmount - wallet_used,
								currency,
								options : {
									style: 'currency',
								},
							}) || '-'}
						</div>
					</div>
					<div className={styles.icon}>
						<Input
							value={walletAmount}
							disabled={!disabledValue}
							name="wallet"
							type="number"
							size="xs"
							placeholder="Enter Amount"
							onChange={(e) => setWalletAmount(e)}
							style={{ width: '180px', marginRight: '10px' }}
						/>
						{disabledValue && (
							<Button
								size="md"
								style={{ marginRight: '10px', width: '125px' }}
								onClick={updateRevenueDeskWallet}
							>
								Save
							</Button>
						)}
						{!disabledValue && (
							<Button
								style={{ marginRight: '10px', background: '#f9f9f9', color: '#000' }}
								onClick={() => setDisabledValue(!disabledValue)}
							>
								<IcMEdit style={{ marginRight: '10px' }} />
								Edit Amount
							</Button>
						)}

						<Button
							themeType="secondary"
							size="md"
							onClick={() => updateRevenueDeskWallet({ status: 'in_active' })}
						>
							Mark InActive
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AutomationWalletDetails;
