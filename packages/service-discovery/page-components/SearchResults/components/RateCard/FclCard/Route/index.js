import React from 'react';

import getLocationInfo from '../../../../utils/locations-search';

import styles from './styles.module.css';

function DottedLineWithTag() {
	return (
		<div style={{
			color         : '#000',
			fontSize      : 10,
			whiteSpace    : 'nowrap',
			display       : 'flex',
			flexDirection : 'column',
			alignItems    : 'center',
			marginLeft    : 4,
			marginRight   : 4,
			marginTop     : -24,
		}}
		>
			<span style={{ padding: 4, background: '#F7FAEF' }}>4 days</span>
			Trans-shipment
		</div>
	);
}

function Route({ detail }) {
	const { origin, destination } = getLocationInfo(detail, {}, 'search_type');

	// const originCountry = origin?.display_name?.split(', ');
	// const destinationCountry = destination?.display_name?.split(', ');

	const {
		name: originPortName = '',
		port_code: originPortCode = '',
	} = origin || {};

	const {
		name: destinationPortName = '',
		port_code: destinationPortCode = '',
	} = destination || {};

	return (
		<div className={styles.container}>
			<div className={styles.locationNameGroup}>
				<div className={styles.locationName}>
					{originPortName}
				</div>

				<div className={styles.locationName}>
					{destinationPortName}
				</div>
			</div>

			<div className={styles.locationNameGroup}>
				<div className={styles.origin}>
					<div className={styles.locationCode}>
						{originPortCode}
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center', width: '100%', marginLeft: 8, marginRight: 8 }}>

					<div className={styles.circle} />
					<div className={styles.dottedLine} />
					<DottedLineWithTag tag="tag" />
					<div className={styles.dottedLine} />
					<div className={styles.activeCircle} />

				</div>

				<div className={styles.destination}>
					<div className={styles.locationCode}>
						{destinationPortCode}
					</div>
				</div>
			</div>

		</div>
	);
}

export default Route;
