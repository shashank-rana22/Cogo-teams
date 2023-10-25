import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function HandleLocationDetails({ location = {}, icdInfo = {} }) {
	return (
		<>
			<div className={styles.port_code}>
				{location?.port_code || location?.postal_code ? (
					<div className={styles.code}>
						(
						{location?.port_code || location?.postal_code}
						)
					</div>
				) : (
					<div style={{ height: '16px' }} />
				)}

				<div className={styles.country}>{location?.country}</div>
			</div>

			<div>
				<Tooltip
					interactive
					content={(
						<div className={styles.location_text}>
							{location?.name}
						</div>
					)}
				>
					<div className={styles.value}>{location?.name}</div>
				</Tooltip>
			</div>

			{icdInfo?.name ? <div className={styles.icd}>{icdInfo?.name}</div> : null}
		</>
	);
}

export default HandleLocationDetails;
