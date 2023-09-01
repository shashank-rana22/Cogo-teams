import { Button, Input, Loader } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import useUpdateRevenueDeskWallet from '../../../../hooks/useUpdateRevenueDeskWallet';

import styles from './styles.module.css';

function AutomationWalletDetails({ data = {}, refetch = () => {}, loading = false }) {
	const [disabledValue, setDisabledValue] = useState(false);
	const [walletAmount, setWalletAmount] = useState(data?.wallet_amount);

	const { service_type, shipment_parameters } = data || {};
	const { trade_type, origin_location, destination_location } = shipment_parameters || {};

	const { updateRevenueDeskWallet } = useUpdateRevenueDeskWallet({
		service_type,
		wallet_amount: walletAmount,
		refetch,
	});

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<div>{startCase(service_type)}</div>
			<div className={styles.service}>
				<div className={styles.content_details}>
					{trade_type && (
						<div className={styles.content}>
							Trade Type :
							{' '}
							{trade_type}
						</div>
					)}
					{origin_location &&	(
						<div className={styles.content}>
							Origin Location :
							{' '}
							{origin_location?.name}
						</div>
					)}
					{destination_location
					&& (
						<div className={styles.content}>
							Destination Location :
							{destination_location?.name}
						</div>
					)}

					<Input
						value={walletAmount}
						disabled={!disabledValue}
						name="wallet"
						type="number"
						size="sm"
						placeholder="Enter Amount"
						onChange={(e) => setWalletAmount(e)}
						style={{ width: '250px' }}
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
						style={{ marginRight: '10px' }}
						onClick={() => setDisabledValue(!disabledValue)}
					>
						Edit
					</Button>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => updateRevenueDeskWallet({ status: 'in_active' })}
					>
						Mark InActive
					</Button>
				</div>
			</div>
		</div>
	);
}

export default AutomationWalletDetails;
