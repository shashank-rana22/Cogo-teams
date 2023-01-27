import { Tooltip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import { DetailInterface } from '../../../../../commons/Interfaces/index';
import CargoDetailPills from '../cargo-details/index';

import PortDetails from './PortDetails';
import styles from './styles.module.css';
import TimeLine from './TimeLine/index';

interface Details {
	orgId: string;
	dataList: DetailInterface;
	shipmentId: string;
}
function Details({ orgId, dataList, shipmentId }: Details) {
	const { importer_exporter, shipment_type } = dataList || {};
	const Router = useRouter();

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.subDiv}>
					<Tooltip
						interactive
						content={(
							<div className={styles.name}>
								{importer_exporter?.business_name || '-'}
							</div>
						)}
					>
						<div className={styles.orgnizationName}>
							{importer_exporter?.business_name || '-'}
						</div>
					</Tooltip>
				</div>

				<div className={styles.flex}>
					<PortDetails data={dataList} />
				</div>

				<div className={styles.tags}>
					<CargoDetailPills detail={dataList} />
				</div>
				<a
					className={styles.flexDiv}
					onClick={() => Router.push(`/shipments/${orgId}`)}
				>
					Go to SID →
				</a>
			</div>

			<div className={styles.timelineContainer}>
				<TimeLine shipmentId={shipmentId} />
			</div>
		</div>
	);
}

export default Details;
