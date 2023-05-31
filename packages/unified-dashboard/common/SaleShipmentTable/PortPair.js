import { Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';

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
];

const getLocationName = (data, pair_type, type) => {
	const suffixConfig = {
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
	};
	const suffix = suffixConfig[pair_type];
	const isSingleLocation = onlySingleLocation.includes(pair_type);

	const objName = !isSingleLocation ? `${type}_${suffix}` : suffix;

	const location = [data[objName]?.port_code, data[objName]?.display_name] || [
		data[objName]?.postal_code,
		data[objName]?.display_name,
	];
	return location;
};

function PortPair({ item = {}, field }) {
	const { pair_type = 'fcl_freight' } = field || {};
	const service_type = item[pair_type];
	const [origin, origin_display_name] = getLocationName(
		item,
		service_type,
		'origin',
	);
	const [destination, destination_display_name] = getLocationName(
		item,
		service_type,
		'destination',
	);
	const isSingleLocation = onlySingleLocation.includes(service_type);
	return isSingleLocation ? (
		<Tooltip theme="light" content={origin_display_name}>
			<div>{origin}</div>
		</Tooltip>
	) : (
		<Tooltip
			theme="light"
			content={(
				<div style={{ textAlign: 'center' }}>
					{origin_display_name?.length && (
						<>
							{origin_display_name}
							{' '}
							<br />
							<IcMPortArrow />
							<br />
						</>
					)}
					{destination_display_name}
				</div>
			)}
		>
			<div className={styles.arrange}>
				{origin?.length && (
					<>
						{origin}
						{' '}
						<IcMPortArrow className={styles.arrow} />
					</>
				)}
				{destination}
			</div>
		</Tooltip>
	);
}
export default PortPair;
