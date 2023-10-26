import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getLocationInfo from '../../page-components/SearchResults/utils/locations-search';

import LoadingState from './loading-state';
import styles from './styles.module.css';

const SHOW_PINCODES = ['ftl_freight'];

const LAST_INDEX = -1;
const THIRD_TO_LAST_INDEX = -3;

function TouchPoints({ touchPoints = [] }) {
	function Content() {
		return (touchPoints || []).map((touchPoint, idx) => (
			<div className={styles.touchpoint_container} key={touchPoint.id}>
				<div className={styles.circle} />

				{idx < touchPoints.length - GLOBAL_CONSTANTS.one && <div className={styles.line} />}

				<div className={styles.label}>
					{' '}
					Touch Point
					{' '}
					{idx + GLOBAL_CONSTANTS.one}
				</div>

				<div className={styles.name}>
					{touchPoint.display_name?.split(',', GLOBAL_CONSTANTS.one)}
				</div>
			</div>
		));
	}

	return (
		<div className={styles.touch_points}>
			<div className={styles.first_touch_point}>
				{touchPoints[GLOBAL_CONSTANTS.zeroth_index].display_name?.split(',', GLOBAL_CONSTANTS.one)}
			</div>

			{touchPoints.length > 1 ? (
				<div style={{ width: 'max-content', marginLeft: 10 }}>
					<Tooltip
						placement="bottom"
						interactive
						content={(
							<div style={{ fontSize: '10px', width: '150px' }}>
								<Content touchPoints={touchPoints} />
							</div>
						)}
					>
						<span className={styles.more_text}>
							+
							{' '}
							{touchPoints.length - 1}
							{' '}
							more
						</span>
					</Tooltip>
				</div>
			) : null}
		</div>
	);
}

function LocationItem({ location = {}, service_type = '' }) {
	const { name = '', port_code, country_code, postal_code } = location || {};

	const city_name = (location?.display_name?.split(',') || [])
		.slice(THIRD_TO_LAST_INDEX, LAST_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div className={styles.location}>
			<div style={{ width: 'max-content' }}>
				<Tooltip
					placement="top"
					className={styles.tooltip}
					content={(
						<div className={styles.tooltip_content}>
							{postal_code && SHOW_PINCODES.includes(service_type) ? `${postal_code}, ` : null}
							{port_code ? `${port_code}, ` : null}
							{SHOW_PINCODES.includes(service_type) && !port_code ? city_name : country_code}
						</div>
					)}
				>
					<div className={styles.location_country_text}>
						{postal_code && SHOW_PINCODES.includes(service_type) ? `${postal_code}, ` : null}
						{port_code ? `${port_code}, ` : null}
						{SHOW_PINCODES.includes(service_type) && !port_code ? city_name : country_code}
					</div>
				</Tooltip>
			</div>

			<Tooltip
				placement="top"
				className={styles.tooltip}
				content={<span className={styles.tooltip_content}>{name}</span>}
			>
				<div className={styles.location_port_text}>
					{name}
				</div>
			</Tooltip>
		</div>
	);
}

function LocationDetails({
	service_key = 'search_type',
	data = {},
	activePage = 'search_results',
	loading = false,
	touch_points = {},
}) {
	let finalData = data;

	if (activePage === 'checkout') {
		const { primary_service = '', services = {} } = data;

		const primary_service_data = Object.values(services).find(
			(itm) => itm.service_type === primary_service,
		) || {};

		finalData = { ...data, ...primary_service_data };
	}

	const service_type = finalData[service_key];

	const { origin, destination } = getLocationInfo(finalData, {}, service_key);

	const { primary_service:{ enroute = {} } = {} } = touch_points || {};

	if (loading) {
		return <LoadingState />;
	}

	return (
		<div className={styles.container}>
			<LocationItem location={origin} service_type={service_type} />

			{destination ? (
				<div className={styles.container}>
					<div className={styles.arrow_container}>
						<img
							src={GLOBAL_CONSTANTS.image_url.wider_arrow}
							alt="arrow"
							className={styles.icon}
						/>

						{isEmpty(touch_points) ? null : (
							<TouchPoints touchPoints={enroute} />
						)}
					</div>

					<LocationItem location={destination} service_type={service_type} />
				</div>
			) : null}
		</div>
	);
}

export default LocationDetails;
