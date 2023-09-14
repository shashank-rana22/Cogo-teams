import { Button, Input, Tooltip } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateRevenueDeskWallet from '../../hooks/useUpdateRevenueDeskWallet';

import styles from './styles.module.css';

function AutomationWalletDetails({ data = {}, refetch = () => {} }) {
	const TEN_VALUE = 10;
	const ZERO_VALUE = 0;

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
								{origin_location?.name?.length > TEN_VALUE
									? (
										<Tooltip content={origin_location?.name}>
											{origin_location?.name?.slice(ZERO_VALUE, TEN_VALUE)}
											...
										</Tooltip>
									) : origin_location?.name}
							</div>
						)}
						{destination_location
							&& (
								<div className={styles.content}>
									Destination Location :
									{destination_location?.name?.length > TEN_VALUE
										? (
											<Tooltip content={destination_location?.name}>
												{destination_location?.name?.slice(ZERO_VALUE, TEN_VALUE)}
												...
											</Tooltip>
										) : destination_location?.name}
								</div>
							)}

						<div className={styles.content}>
							Wallet Used :
							{currency}
							{' '}
							{wallet_used}
						</div>

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
					</div>
					<div className={styles.icon}>
						{disabledValue && (
							<Button
								style={{ marginRight: '10px' }}
								onClick={updateRevenueDeskWallet}
							>
								Save
							</Button>
						)}
						<Button
							style={{ marginRight: '10px', background: '#f9f9f9', color: '#000' }}
							onClick={() => setDisabledValue(!disabledValue)}
						>
							<IcMEdit style={{ marginRight: '10px' }} />
							Edit Amount
						</Button>

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
