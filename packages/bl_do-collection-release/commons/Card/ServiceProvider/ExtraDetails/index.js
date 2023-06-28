import { cl, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDownload, IcMCopy } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const COLLECTION_MODE = {
	physical_collection : 'Physical Visit',
	print               : 'Print',
	courier             : 'Delivery by Courier',
	email               : 'Email',
};

const STATUS_TEXT_MAPPING = {
	delivered   : 'DELIVERED',
	released    : 'IN TRANSIT',
	surrendered : 'SURRENDERED',
};

const STYLE_ICON = {
	marginLeft : 4,
	height     : 20,
	width      : 20,
};

const handleCopy = async (val) => {
	navigator.clipboard
		.writeText(val)
		.then(Toast.info('Copied Successfully !!', { autoClose: 1000 }));
};

export default function ExtraDetails({ stateProps = {}, item = {} }) {
	const { bill_of_ladings = [] } = item;
	let renderElem = '';

	switch (stateProps.inner_tab) {
		case 'knockoff_pending':
		case 'collection_pending': {
			renderElem = item?.leo_copy ? (
				<div>
					<div className={cl`${styles.text} ${styles.thin}`}>LEO Copy</div>

					<div className={cl`${styles.text} ${styles.bold}`}>
						<a className={styles.link} download href={item.leo_copy}>
							Download
							<IcMDownload
								style={{
									...STYLE_ICON,
									padding      : 2,
									border       : '1px solid black',
									borderRadius : '50%',
								}}
							/>
						</a>
					</div>
				</div>
			) : null;
			break;
		}
		case 'under_collection': {
			bill_of_ladings?.forEach((itemData) => {
				const { collection_details, collection_mode = '-' } = itemData || {};
				const { name = '-', tracking_id = '-' } = collection_details || {};
				renderElem = (
					<div className={styles.collection} key={tracking_id}>
						<div className={styles.collection_box}>
							<div className={cl`${styles.text} ${styles.thin}`}>Collected By</div>

							<div className={cl`${styles.text} ${styles.bold}`}>{name}</div>
						</div>
						<div className={styles.collection_box}>
							<div className={cl`${styles.text} ${styles.thin}`}>Collection Mode</div>

							<div className={cl`${styles.text} ${styles.bold}`}>
								{COLLECTION_MODE[collection_mode]}
							</div>
						</div>

						{collection_mode === 'courier' ? (
							<div className={styles.collection_box}>
								<div className={cl`${styles.text} ${styles.thin}`}>Tracking Id</div>
								<div className={cl`${styles.text} ${styles.bold}`}>
									{collection_mode === 'courier' ? tracking_id : null}
								</div>
							</div>
						) : null}
					</div>
				);
			});
			break;
		}
		case 'released': {
			let showModeOfDelivery = false;
			let status = '';
			bill_of_ladings?.forEach((itemData) => {
				const { delivery_movement_details = [] } = itemData || {};
				const { tracking_id = '' } = delivery_movement_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};
				if (
					(itemData?.status || []).includes('delivered')
				|| item?.trade_type === 'import'
				) {
					status = 'delivered';
					showModeOfDelivery = true;
				} else if ((itemData?.status || []).includes('released')) {
					status = 'released';
				}

				renderElem = (
					<div className={styles.delivery_mode} key={tracking_id}>
						<div className={styles.left}>
							<div className={cl`${styles.text} ${styles.thin}`}>Status</div>

							<div className={cl`${styles.status} ${styles[status]}`}>{STATUS_TEXT_MAPPING[status]}</div>
						</div>
						<div className={styles.right}>
							{showModeOfDelivery ? (
								<>
									<div className={cl`${styles.text} ${styles.thin}`}>Mode of Delivery</div>

									<div className={cl`${styles.text} ${styles.bold}`}>
										{startCase(itemData?.delivery_mode)}
									</div>
								</>
							) : (
								<>
									<div className={cl`${styles.text} ${styles.thin}`}>Tracking ID</div>

									{tracking_id ? (
										<div className={cl`${styles.text} ${styles.bold}`}>
											{tracking_id}
											{' '}
											<IcMCopy
												onClick={() => handleCopy(tracking_id)}
												style={STYLE_ICON}
											/>
											{' '}
										</div>
									) : null}
								</>
							)}
						</div>
					</div>
				);
			});
			break;
		}
		case 'surrendered': {
			bill_of_ladings?.forEach((itemData) => {
				const { delivery_movement_details = [] } = itemData || {};
				const { tracking_id = '' } = delivery_movement_details?.[GLOBAL_CONSTANTS.zeroth_index] || {};
				const isSurrendered = (itemData?.status || []).includes('surrendered');

				renderElem = (
					<div className={styles.collection} key={tracking_id}>
						{isSurrendered ? (
							<div>
								<div className={cl`${styles.text} ${styles.thin}`}>Mode of Delivery</div>

								<div className={cl`${styles.text} ${styles.bold}`}>
									{COLLECTION_MODE[itemData?.delivery_mode]}
								</div>
							</div>
						) : (
							<div>
								<div className={cl`${styles.text} ${styles.thin}`}>Tracking ID</div>

								{tracking_id ? (
									<div className={cl`${styles.text} ${styles.bold}`}>
										{tracking_id || '-'}
										{' '}
										<IcMCopy
											onClick={() => handleCopy(tracking_id)}
											style={{ ...STYLE_ICON, cursor: 'pointer' }}
										/>
										{' '}
									</div>
								) : null}
							</div>
						)}
					</div>
				);
			});
			break;
		}
		default: {
			break;
		}
	}

	return renderElem;
}
