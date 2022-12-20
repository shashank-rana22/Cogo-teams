import React from 'react';
import { startCase, format  } from '@cogoport/front/utils';
import { IcCCogoassured, IcMTimer } from '@cogoport/icons-react';
import getHoursElasped from '../../../../utils/revenueDeskUtils/getHoursElapsed';
import styles from './styles.module.css';
import incoTermMapping from '../../../../constants/incoTermMapping';


const Header = ({ data = {}, activeTab = '' }) => {

	const incoTerms = incoTermMapping;

	const getHeading = ({ state = '' }) => {
		const words = state.split('_');
		let heading = '';
		(words || []).forEach((element) => {
			heading += `${
				element[0].toUpperCase() + element.substring(1, element.length)
			} `;
		});
		return heading;
	};

	return (
		<div className={styles.container}>
			<div className={styles.column}>
				<div className={styles.titleContainer}>

					<p className={styles.heading}>{getHeading({ state: data?.state })}</p>
					
					{ ((data?.trade_type || incoTerms[data?.inco_term]) == 'export') ?	
					(<p className={styles.tradeType}>
						{startCase(data?.trade_type) ||
						startCase(incoTerms[data?.inco_term])}
					</p>)
					:
					(<p className={styles.import}>
					{startCase(data?.trade_type) ||
					startCase(incoTerms[data?.inco_term])}
					</p>)
					}
					<p className = {`${styles.tradeType} ${styles.bookingSource}`}>
						{data?.source === 'direct'
							? 'Sell Without Buy'
							: startCase(data.source || '')}
					</p>

					{data?.is_cogo_assured ? (
						<div className={styles.cogoAssured}>
							<div className= {styles.iconWrapper}>
								<IcCCogoassured />
							</div>
							<div className={styles.text}>Cogoport Assured</div>
						</div>
					) : null}
				</div>

				<div className={styles.timerContainer}>
					{activeTab === 'pending' ? (
						<div className={styles.svgWrapper}>
							<IcMTimer />
						</div>
					) : null}

					<p className={styles.timerInfo}>
						{activeTab === 'pending'
							? `Booking Confirmed on ${ format(
									data.confirmed_by_importer_exporter_at,
									'dd MMM yyyy',
							  )}  (Due ${getHoursElasped(
									data.confirmed_by_importer_exporter_at,
							  )})`
							: ''}
					</p>
				</div>
			</div>

			<p className = {styles.shipmentId}>
				Shipment ID <span style={{ marginLeft: '8px' }}>#{data.serial_id}</span>
			</p>
		</div>
	);
};

export default Header;
