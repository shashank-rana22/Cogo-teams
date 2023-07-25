import { IcMCalendar, IcMProfile, IcMOpenTopContainer } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getSubTableConfig from '../../../configurations/sub-table-config';

import styles from './styles.module.css';

const LOGO_MAPPING = {
	week           : <IcMCalendar />,
	persona        : <IcMProfile />,
	container_type : <IcMOpenTopContainer />,
	container_size : <IcMOpenTopContainer />,
};

const KEYS_MAPPING = {
	week           : 'date',
	persona        : 'organization_type',
	container_type : 'container_type',
	container_size : 'container_type',

};

function SubCard({ showDetails = false }) {
	if (!showDetails) {
		return null;
	}

	const subConfig = getSubTableConfig();

	return (
		<div className={styles.container}>
			<div className={styles.column}>
				{Object.keys(subConfig).map((key) => (
					<div key={key} className={styles.table_column}>
						<div className={styles.title}>
							<div className={styles.logo}>{LOGO_MAPPING[key]}</div>
							<div>{startCase(key)}</div>
						</div>

						<div>
							{subConfig[key].map((item) => (
								<div key={item?.id}>
									<div className={styles.info}>
										<div className={styles.name}>{item?.[KEYS_MAPPING[key]]}</div>
										<div className={styles.containers}>{item?.containers}</div>
									</div>
								</div>

							))}

						</div>
					</div>
				))}
			</div>

		</div>

	);
}

export default SubCard;
