import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import LocationDetails from './LocationDetails';
import styles from './styles.module.css';

function PortDetails({ data = {}, primary_service = {} }) {
	const {
		origin_main_port = {},
		destination_main_port = {},
		origin_port = {},
		destination_port = {},
	} = primary_service;

	if (isEmpty(data)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<LocationDetails location={origin_port} icdPortInfo={origin_main_port} />

			{destination_port ? (
				<>
					<div className={styles.icon_wrapper}>
						<IcMPortArrow width="1.2em" height="1.2em" />
					</div>

					<LocationDetails location={destination_port} icdPortInfo={destination_main_port} />
				</>
			) : null}
		</div>
	);
}

export default PortDetails;
