import { cl, Toast } from '@cogoport/components';
import { IcMDownload, IcMCopy } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const collectionMode = {
	physical_collection : 'Physical Visit',
	print               : 'Print',
	courier             : 'Delivery by Courier',
};

const statusTextMapping = {
	delivered   : 'DELIVERED',
	released    : 'IN TRANSIT',
	surrendered : 'SURRENDERED',
};

const styleIcon = {
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
									...styleIcon,
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
			renderElem = (
				<>
					<div>
						<div className={cl`${styles.text} ${styles.thin}`}>Collected By</div>

						<div className={cl`${styles.text} ${styles.bold}`}>{item?.collected_by}</div>
					</div>
					<div>
						<div className={cl`${styles.text} ${styles.thin}`}>Collection Mode</div>

						<div className={cl`${styles.text} ${styles.bold}`}>
							{collectionMode[item?.collection_mode]}
						</div>
					</div>

					{item?.collection_mode === 'courier' ? (
						<div>
							<div className={cl`${styles.text} ${styles.thin}`}>Tracking Id</div>
							<div className={cl`${styles.text} ${styles.bold}`}>
								{item?.collection_mode === 'courier' ? item?.tracking_id : null}
							</div>
						</div>
					) : null}
				</>
			);
			break;
		}
		case 'released': {
			let showModeOfDelivery = false;
			let status = '';

			if (
				(item?.status || []).includes('delivered')
				|| item?.trade_type === 'import'
			) {
				status = 'delivered';
				showModeOfDelivery = true;
			} else if ((item?.status || []).includes('released')) {
				status = 'released';
			}

			renderElem = (
				<>
					<div>
						<div className={cl`${styles.text} ${styles.thin}`}>Status</div>

						<div className={cl`${styles.status} ${styles[status]}`}>{statusTextMapping[status]}</div>
					</div>
					<div>
						{showModeOfDelivery ? (
							<>
								<div className={cl`${styles.text} ${styles.thin}`}>Mode of Delivery</div>

								<div className={cl`${styles.text} ${styles.bold}`}>
									{startCase(item?.delivery_mode)}
								</div>
							</>
						) : (
							<>
								<div className={cl`${styles.text} ${styles.thin}`}>Tracking ID</div>

								{item?.tracking_id ? (
									<div className={cl`${styles.text} ${styles.bold}`}>
										{item?.tracking_id}
										{' '}
										<IcMCopy
											onClick={() => handleCopy(item.tracking_id)}
											style={styleIcon}
										/>
										{' '}
									</div>
								) : null}
							</>
						)}
					</div>
				</>
			);
			break;
		}
		case 'surrendered': {
			const isSurrendered = (item?.status || []).includes('surrendered');

			renderElem = (
				<div>
					{isSurrendered ? (
						<div>
							<div className={cl`${styles.text} ${styles.thin}`}>Mode of Delivery</div>

							<div className={cl`${styles.text} ${styles.bold}`}>
								{collectionMode[item?.delivery_mode]}
							</div>
						</div>
					) : (
						<div>
							<div className={cl`${styles.text} ${styles.thin}`}>Tracking ID</div>

							{item?.tracking_id ? (
								<div className={cl`${styles.text} ${styles.bold}`}>
									{item?.tracking_id}
									{' '}
									<IcMCopy
										onClick={() => handleCopy(item.tracking_id)}
										style={{ ...styleIcon, cursor: 'pointer' }}
									/>
									{' '}
								</div>
							) : null}
						</div>
					)}
				</div>
			);
			break;
		}
		default: {
			break;
		}
	}

	return renderElem;
}
