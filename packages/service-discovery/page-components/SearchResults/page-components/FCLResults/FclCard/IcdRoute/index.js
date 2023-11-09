import getLocationInfo from '../../../../utils/locations-search';

import styles from './styles.module.css';

function DottedLineWithTag({ scheduleData = {} }) {
	const { transit_time } = scheduleData;

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
		}}
		>
			{transit_time ? (
				<span style={{ padding: 4, background: '#F7FAEF' }}>
					{`${transit_time} Days`}
				</span>
			) : null}
		</div>
	);
}

function Route({ detail = {}, scheduleData = {}, isCogoAssured = false, rateCardData = {} }) {
	const { origin, destination } = getLocationInfo(detail, {}, 'search_type');

	const { origin_main_port = {}, destination_main_port = {} } = rateCardData;

	const { port_code: originMainPortCode = '' } = origin_main_port || {};

	const { port_code: destinationMainPortCode = '' } = destination_main_port || {};

	const { port_code: originPortCode = '' } = origin || {};

	const { port_code: destinationPortCode = '' } = destination || {};

	const originMainPort = originMainPortCode || originPortCode;
	const destinationMainPort = destinationMainPortCode || destinationPortCode;

	let destinationPort = '';

	let originPort = '';

	if (origin_main_port) {
		originPort = originPortCode;
	}

	if (destination_main_port) {
		destinationPort = destinationPortCode;
	}

	return (
		<div className={styles.container}>
			<div
				className={styles.location_name}
				style={isCogoAssured ? { margin: 'auto 0px' } : { marginTop: '24px' }}
			>
				{originPort}
			</div>

			{origin_main_port ? (
				<div
					style={{
						display     : 'flex',
						alignItems  : 'center',
						marginLeft  : 8,
						marginRight : 8,
						...(!isCogoAssured && { marginTop: 16 }),
					}}
				>
					<div className={styles.circle} />
					<div className={styles.dotted_line} />
				</div>
			) : null}

			<div>
				{!isCogoAssured ? (
					<div className={styles.location_name_group}>
						<div className={styles.location_name}>
							{originMainPort}
						</div>

						<div className={styles.location_name}>
							{destinationMainPort}
						</div>
					</div>
				) : null}

				<div className={styles.location_name_group}>
					<div className={styles.origin}>
						<div className={styles.location_code}>
							{!isCogoAssured ? scheduleData.departure : originMainPort}
						</div>
					</div>

					{!isCogoAssured ? (
						<div
							style={{
								display     : 'flex',
								alignItems  : 'center',
								width       : '100%',
								marginLeft  : 8,
								marginRight : 8,
							}}
						>
							<div className={styles.circle} />
							<div className={styles.dotted_line} />
							<DottedLineWithTag tag="tag" scheduleData={scheduleData} />
							<div className={styles.dotted_line} />
							<div className={styles.active_circle} />
						</div>
					) : (
						<div style={{
							display     : 'flex',
							alignItems  : 'center',
							width       : '100%',
							marginLeft  : 8,
							marginRight : 8,
						}}
						>
							<div className={styles.circle} />
							<div className={styles.dotted_line} style={{ width: '60px' }} />
							<div className={styles.active_circle} />
						</div>
					)}

					<div className={styles.destination}>
						<div className={styles.location_code}>
							{!isCogoAssured ? scheduleData.arrival : destinationMainPort}
						</div>
					</div>
				</div>
			</div>

			{destination_main_port ? (
				<div
					style={{
						display     : 'flex',
						alignItems  : 'center',
						marginLeft  : 8,
						marginRight : 8,
						...(!isCogoAssured && { marginTop: 16 }),
					}}
				>
					<div className={styles.dotted_line} />
					<div className={styles.circle} />
				</div>
			) : null}

			<div
				className={styles.location_name}
				style={isCogoAssured ? { margin: 'auto 0px' } : { marginTop: '24px' }}
			>
				{destinationPort}
			</div>
		</div>
	);
}

export default Route;
