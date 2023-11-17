import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import SearchType from '../SearchType';

import styles from './styles.module.css';

const LOCATION_KEY_MAPPING = {
	origin      : 'pickup',
	destination : 'drop',
};

const LINE_LABEL = {
	fcl_freight : 'Shipping Line',
	air_freight : 'Airline',
};

const onlySingleLocation = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'origin_fcl_customs',
	'destination_fcl_customs',
	'origin_lcl_customs',
	'destination_lcl_customs',
	'origin_air_customs',
	'destination_air_customs',
	'fcl_cfs',
	'origin_fcl_cfs',
	'destination_fcl_cfs',
	'fcl_locals',
	'fcl_freight_local',
	'lcl_freight_local',
	'air_freight_local',
];

const SUFFIX_MAPPING = {
	lcl_freight                 : 'port',
	fcl_freight                 : 'port',
	air_freight                 : 'airport',
	trailer_freight             : 'location',
	ftl_freight                 : 'location',
	ltl_freight                 : 'location',
	fcl_customs                 : 'port',
	lcl_customs                 : 'location',
	air_customs                 : 'airport',
	haulage_freight             : 'location',
	domestic_air_freight        : 'airport',
	origin_trailer_freight      : 'location',
	destination_trailer_freight : 'location',
	origin_ftl_freight          : 'location',
	destination_ftl_freight     : 'location',
	origin_ltl_freight          : 'location',
	destination_ltl_freight     : 'location',
	origin_fcl_customs          : 'port',
	destination_fcl_customs     : 'port',
	origin_lcl_customs          : 'location',
	destination_lcl_customs     : 'location',
	origin_air_customs          : 'airport',
	destination_air_customs     : 'airport',
	fcl_cfs                     : 'port',
	origin_fcl_cfs              : 'port',
	destination_fcl_cfs         : 'port',
	fcl_locals                  : 'port',
	cogo_assured                : 'port',
};

const getLocationName = (data, pair_type, type, key) => {
	const suffix = SUFFIX_MAPPING[pair_type];
	const isSingleLocation = onlySingleLocation.includes(pair_type);

	const objName = !isSingleLocation ? `${type}_${suffix}` : suffix;

	let location = [
		data[objName]?.port_code || data[`${type}_location`]?.port_code,
		data[objName]?.display_name || data[`${type}_location`]?.display_name,
	] || [
		data[objName]?.postal_code || data[`${type}_location`]?.port_code,
		data[objName]?.display_name || data[`${type}_location`]?.display_name,
	];

	if (
		key === 'shipments_port_pair'
		&& ['ftl_freight', 'ltl_freight'].includes(pair_type)
	) {
		location = [
			data?.[LOCATION_KEY_MAPPING[type]]?.display_name,
			data?.[LOCATION_KEY_MAPPING[type]]?.display_name,
		];
	}

	return location;
};

function PortPair({ item = {}, field = {} }) {
	const { pair_type = 'fcl_freight', key = '-', props = {}, showPortsName = false } = field || {};
	const { setLocation = () => {}, service_type:selected_service = '' } = props;
	const service_type = item[pair_type];
	const [origin, origin_display_name] = getLocationName(
		item,
		service_type,
		'origin',
		key,
	);
	const [destination, destination_display_name] = getLocationName(
		item,
		service_type,
		'destination',
		key,
	);

	const isSingleLocation = onlySingleLocation.includes(service_type);

	const handleClickLocation = () => {
		if (service_type !== selected_service) {
			return;
		}
		const locationSuffix = SUFFIX_MAPPING[service_type];

		setLocation({
			origin      : item[`origin_${locationSuffix}`] || item.origin_location,
			destination : item[`destination_${locationSuffix}`] || item.destination_location,
		});
	};

	const originPortName = origin_display_name?.split(',')?.[GLOBAL_CONSTANTS.zeroth_index];
	const destinationPortName = destination_display_name?.split(',')?.[GLOBAL_CONSTANTS.zeroth_index];

	const { port, airport, location, shipping_line, airline	} = item || {};

	const singleLocationPort = port || airport || location || {};

	const moreWidth = showPortsName || isSingleLocation;

	const line = shipping_line || airline || {};

	return (
		<div className={styles.container}>
			<span className={styles.service_type}>
				<SearchType item={item} field={field} />
			</span>

			<div>
				{ isSingleLocation ? (
					<Tooltip content={<div className={styles.tooltip_content}>{singleLocationPort?.display_name}</div>}>
						<div
							className={cl`${styles.location_name} ${moreWidth && styles.more_width}`}
						>
							{singleLocationPort?.name}
						</div>
					</Tooltip>
				) : (
					<Tooltip
						content={(
							<div className={styles.tooltip_content}>
								{origin_display_name?.length && (
									<>
										{origin_display_name}
										{' '}
										<br />
										<IcMPortArrow height={20} width={20} />
										<br />
									</>
								)}
								{destination_display_name}
							</div>
						)}
					>
						<div
							role="presentation"
							className={styles.locations_container}
							onClick={handleClickLocation}
						>
							{(origin || origin_display_name)?.length && (
								<>
									<div className={cl`${styles.location_name} ${moreWidth && styles.more_width}`}>
										{showPortsName ? originPortName : origin || origin_display_name}
									</div>
									{' '}
									<IcMPortArrow height={24} width={24} style={{ margin: '0px 12px' }} />
								</>
							)}
							<div className={cl`${styles.location_name} ${moreWidth && styles.more_width}`}>
								{showPortsName ? destinationPortName : destination || destination_display_name}
							</div>
						</div>
					</Tooltip>
				)}

				{['fcl_freight', 'air_freight'].includes(service_type) && !isEmpty(line) ? (
					<div className={styles.line_name}>
						<span className={styles.label}>{LINE_LABEL[service_type]}</span>
						{': '}
						{line?.short_name}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default PortPair;
