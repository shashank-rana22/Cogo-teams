import { Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function LocationDetails({ location = {}, icdPortInfo = {} }) {
	return (
		<div className={styles.port_code}>
			{location?.port_code || location?.postal_code ? (
				<div className={styles.code}>
					(
					{location?.port_code || location?.postal_code}
					)
				</div>
			) : (
				<div className={styles.empty_code} />
			)}

			<div className={styles.country}>
				{location?.country?.name || ''}
			</div>

			<Tooltip
				placement="bottom"
				theme="light"
				content={(
					<div>
						<div className={styles.display_name}>{location?.display_name}</div>

						{!isEmpty(icdPortInfo) ? <div className={styles.icd}>{icdPortInfo?.name}</div> : null}
					</div>
				)}
			>
				<div className={styles.value}>{location?.name}</div>
			</Tooltip>

		</div>
	);
}

export default LocationDetails;
