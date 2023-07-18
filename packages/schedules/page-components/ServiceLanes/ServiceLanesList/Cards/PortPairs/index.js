import { Placeholder, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';

import styles from './styles.module.css';
import portData from './utils/portData';

const ZERO = 0;
const ONE = 1;
function PortPair({ item, loading }) {
	const {
		origin,
		originPort,
		originLocation,

		destination,
		destinationPort,
		destinationLocation,
		links,
	} = portData({ item });

	return (
		<div className={styles.container}>
			<div className={styles.origin}>
				<div className={styles.origin_heading}>Origin</div>
				<Tooltip
					theme="light"
					placement="top"
					interactive
					content={origin}
				>
					<div style={{ display: 'flex' }}>
						{loading ? <Placeholder width="200px" /> : (
							<span
								style={{ fontWeight: '600' }}
							>
								{`${originPort},`}

							</span>
						)}
						{loading ? <Placeholder width="200px" /> : (
							<span
								style={{ color: '#f68b21' }}
							>
								{`(${item?.service_lane_links?.[ZERO]?.port_code})`}

							</span>
						)}
						{loading ? <Placeholder width="160px" /> : <span>{`, ${originLocation}`}</span>}
						{' '}
					</div>
				</Tooltip>
			</div>

			<div className={styles.arrow}>
				<IcMPortArrow />
			</div>

			<div className={styles.destination}>
				<div className={styles.destination_heading}>Destination</div>
				<Tooltip
					theme="light"
					placement="top"
					interactive
					content={destination}
				>
					<div style={{ display: 'flex' }}>
						{loading ? <Placeholder width="100px" /> : (
							<span
								style={{ fontWeight: '600' }}
							>
								{`${destinationPort},`}

							</span>
						)}
						{loading ? <Placeholder width="100px" /> : (
							<span style={{ color: '#f68b21' }}>
								{`(${
									item?.service_lane_links?.[links - ONE]?.port_code
								})`}

							</span>
						)}
						{loading ? <Placeholder width="160px" /> : <span>{`, ${destinationLocation}`}</span>}
						{' '}
					</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default PortPair;
