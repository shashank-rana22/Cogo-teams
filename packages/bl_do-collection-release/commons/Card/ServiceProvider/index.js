import { cl, Tooltip } from '@cogoport/components';

import BLPopver from './BLPopover';
import ExtraDetails from './ExtraDetails';
import SPPopver from './SPPopover';
import styles from './styles.module.css';

export default function ServiceProvider({ item = {}, stateProps = {} }) {
	const isFclLocal = stateProps.shipment_type === 'fcl_local';
	const docs = stateProps.activeTab === 'bl' ? item.bill_of_ladings : item.delivery_orders;
	const docsLength = docs?.length || 0;
	const remainLength = docsLength > 1 ? docsLength - 1 : 0;
	const doc_number = stateProps.activeTab === 'bl'
		? docs?.[0]?.bl_number
		: docs?.[0]?.do_number;

	return (
		<div className={styles.container}>
			<div className={styles.col}>
				<div className={cl`${styles.left}`}>
					<div className={styles.grey}>
						Service Provider
					</div>
					<div>
						<Tooltip
							interactive
							content={(
								<div>
									{' '}
									{isFclLocal ? item.local_service?.service_provider?.business_name
										: item.freight_service?.service_provider?.business_name}
								</div>
							)}
						>
							<div className={styles.details}>
								{isFclLocal ? item.local_service?.service_provider?.business_name
									: item.freight_service?.service_provider?.business_name}
							</div>
						</Tooltip>

					</div>
				</div>
				<div className={styles.right}>
					<div className={styles.grey}>Service Provider Contact</div>
					<div className={styles.details}>
						<Tooltip
							interactive
							className={styles.tooltip}
							caret={false}
							content={(
								<SPPopver
									spDetails={item?.pocs}
								/>
							)}
						>
							<div className={styles.tooltip_container}>Click Here To View</div>
						</Tooltip>

					</div>
				</div>
			</div>
			<div className={styles.col}>
				<div className={styles.lower_left}>
					<div className={styles.grey}>
						Customer
					</div>
					<div className={styles.details}>
						{item.customer?.business_name}
					</div>
				</div>
				<div className={styles.lower_right}>
					<div>
						<div className={styles.grey}>
							{stateProps.activeTab.toUpperCase()}
							{' '}
							Details
						</div>
						{docsLength > 0 ? (
							<div className={cl`${styles.details} ${styles.service_provider_details}`}>
								<Tooltip
									interactive
									placement="top"
									caret={false}
									content={(
										<BLPopver
											blDetails={item?.bill_of_ladings}
											bl_do={stateProps.activeTab}
										/>
									)}
								>
									<div className={styles.tooltip_container}>
										{doc_number}
										{' '}
										{remainLength ? (
											<div>
												{remainLength}
												{' '}
												+ More
												{' '}
											</div>
										) : null}
									</div>
								</Tooltip>
							</div>
						) : (
							<div>
								No
								{' '}
								{stateProps.activeTab.toUpperCase()}
								{' '}
								documents found
							</div>
						)}
					</div>
					<div>
						<ExtraDetails stateProps={stateProps} item={item} />
					</div>
				</div>
			</div>
		</div>
	);
}
