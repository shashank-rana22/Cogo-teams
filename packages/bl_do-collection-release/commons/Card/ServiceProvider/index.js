import { cl, Tooltip } from '@cogoport/components';

import renderTooltip from '../../renderTooltip';

import BLPopver from './BLPopover';
import ExtraDetails from './ExtraDetails';
import SPPopver from './SPPopover';
import styles from './styles.module.css';

const MAX_LENGTH = 32;
const DEFAULT_INDEX = 0;
const FIRST_INDEX = 1;
export default function ServiceProvider({ item = {}, stateProps = {} }) {
	const isFclLocal = stateProps.shipment_type === 'fcl_local';
	const docs = stateProps.activeTab === 'bl' ? item.bill_of_ladings : item.delivery_orders;
	const docsLength = docs?.length || DEFAULT_INDEX;
	const remainLength = docsLength > FIRST_INDEX ? docsLength - FIRST_INDEX : DEFAULT_INDEX;
	const doc_number = stateProps.activeTab === 'bl'
		? docs?.[DEFAULT_INDEX]?.bl_number
		: docs?.[DEFAULT_INDEX]?.do_number;

	return (
		<div className={styles.container}>
			<div className={styles.col}>
				<div className={cl`${styles.left}`}>
					<div className={styles.grey}>
						Service Provider
					</div>
					<div className={styles.details}>
						{renderTooltip(isFclLocal ? item?.local_service?.service_provider?.business_name
							: item?.freight_service?.service_provider?.business_name, MAX_LENGTH)}

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
				<div className={cl`${styles.left}`}>
					<div className={styles.grey}>
						Customer
					</div>
					<div className={styles.details}>
						{renderTooltip(item.customer?.business_name, MAX_LENGTH)}
					</div>
				</div>
				<div className={styles.right}>
					<div>
						<div className={styles.grey}>
							{stateProps.activeTab.toUpperCase()}
							{' '}
							Details
						</div>
						{docsLength > DEFAULT_INDEX ? (
							<div className={cl`${styles.details} ${styles.service_provider_details}`}>
								{remainLength
									? (
										<Tooltip
											interactive
											maxWidth={500}
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
													<div className={styles.more_item}>
														{remainLength}
														{' '}
														+ More
														{' '}
													</div>
												) : null}
											</div>
										</Tooltip>
									)
									:								(
										<div className={styles.tooltip_container}>
											{doc_number}
										</div>
									)}
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

				</div>

			</div>
			<div>
				<ExtraDetails stateProps={stateProps} item={item} />
			</div>
		</div>
	);
}
