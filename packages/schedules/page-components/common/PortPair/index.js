import { Placeholder, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';
import portData from './utils/portData';

const ZERO = 0;
const ONE = 1;
function PortPair({ data, loading = false }) {
	const {
		origin,
		originPort,
		originLocation,
		destination,
		destinationPort,
		destinationLocation,
		links,
	} = portData({ data });

	return (
		<div className={styles.container}>
			{loading ? <Placeholder width="150px" /> : (
				<div className={styles.origin}>
					<Tooltip
						theme="light"
						placement="top"
						interactive
						content={origin}
					>
						<div style={{ display: 'flex' }}>
							<div
								style={{ fontWeight: '600' }}
							>
								{`${originPort},`}

							</div>
							<div
								style={{ color: '#f68b21' }}
							>
								{`(${data?.[ZERO]?.service_lane_links?.[ZERO]?.port_code
                                || data?.origin_location?.port_code})`}

							</div>
							<div>{`,${originLocation}`}</div>
							{' '}
						</div>
					</Tooltip>
				</div>
			)}

			<div className={styles.arrow}>
				<IcMPortArrow />
			</div>

			{loading ? <Placeholder width="150px" /> : (
				<div className={styles.destination}>
					<Tooltip
						theme="light"
						placement="top"
						interactive
						content={destination || data?.destination_location?.display_name}
					>
						<div style={{ display: 'flex' }}>
							<div
								style={{ fontWeight: '600' }}
							>
								{`${destinationPort},`}

							</div>
							<div style={{ color: '#f68b21' }}>
								{`(${
									data?.[ZERO]?.service_lane_links[links - ONE]?.port_code
                                || data?.destination_location?.port_code})`}

							</div>
							<div>{`,${destinationLocation}`}</div>
							{' '}
						</div>
					</Tooltip>
				</div>
			)}
		</div>
	);
}

export default PortPair;
