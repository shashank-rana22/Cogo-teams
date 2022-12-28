import { IcCCogoassured, IcMTimer } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import incoTermMapping from '../../../../constants/incoTermMapping';
import getHoursElasped from '../../../../utils/revenueDeskUtils/getHoursElapsed';

import styles from './styles.module.css';

function Header({ data = {}, activeTab = '' }) {
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
				<div className={styles.title_container}>

					<p className={styles.heading}>{getHeading({ state: data?.state })}</p>

					{ ((data?.trade_type || incoTerms[data?.inco_term]) === 'export')
						? (
							<p className={styles.trade_type}>
								{startCase(data?.trade_type)
						|| startCase(incoTerms[data?.inco_term])}
							</p>
						)
						:					(
							<p className={styles.import}>
								{startCase(data?.trade_type)
					|| startCase(incoTerms[data?.inco_term])}
							</p>
						)}
					<p className={`${styles.trade_type} ${styles.booking_source}`}>
						{data?.source === 'direct'
							? 'Sell Without Buy'
							: startCase(data.source || '')}
					</p>

					{data?.is_cogo_assured ? (
						<div className={styles.cogo_assured}>
							<div className={styles.icon_wrapper}>
								<IcCCogoassured />
							</div>
							<div className={styles.text}>Cogoport Assured</div>
						</div>
					) : null}
				</div>

				<div className={styles.timer_container}>
					{activeTab === 'pending' ? (
						<div className={styles.svg_wrapper}>
							<IcMTimer />
						</div>
					) : null}

					<p className={styles.timer_info}>
						{activeTab === 'pending'
							? `Booking Confirmed on ${format(
								data.confirmed_by_importer_exporter_at,
								'dd MMM yyyy',
							)}  (Due ${getHoursElasped(
								data.confirmed_by_importer_exporter_at,
							)})`
							: ''}
					</p>
				</div>
			</div>

			<p className={styles.shipment_id}>
				Shipment ID
				{' '}
				<span style={{ marginLeft: '8px' }}>
					#
					{data.serial_id}
				</span>
			</p>
		</div>
	);
}

export default Header;
