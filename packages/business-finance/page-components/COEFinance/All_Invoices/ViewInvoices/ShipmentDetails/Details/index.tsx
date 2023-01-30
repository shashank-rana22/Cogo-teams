import { Tooltip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import { DetailInterface } from '../../../../../commons/Interfaces/index';
import CargoDetailPills from '../cargo-details/index';

import PortDetails from './PortDetails';
import styles from './styles.module.css';
import TimeLine from './TimeLine/index';

interface DetailsInterface {
	orgId: string;
	dataList: DetailInterface;
	shipmentId: string;
}
function Details({ orgId, dataList, shipmentId }: DetailsInterface) {
	const { importer_exporter: importerExporter } = dataList || {};
	const Router = useRouter();

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.subDiv}>
					<Tooltip
						interactive
						content={(
							<div className={styles.name}>
								{importerExporter?.business_name || '-'}
							</div>
						)}
					>
						<div className={styles.orgnizationName}>
							{importerExporter?.business_name || '-'}
						</div>
					</Tooltip>
				</div>

				<div className={styles.flex}>
					<PortDetails data={dataList} />
				</div>

				<div className={styles.tags}>
					<CargoDetailPills detail={dataList} />
				</div>
				<div
					className={styles.flexDiv}
					onClick={() => Router.push(`/shipments/${orgId}`)}
					role="presentation"
				>
					Go to SID →
				</div>
			</div>

			<div className={styles.timelineContainer}>
				<TimeLine shipmentId={shipmentId} />
			</div>
		</div>
	);
}

export default Details;
