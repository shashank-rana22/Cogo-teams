import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React from 'react';

import { DetailInterface } from '../../../../../commons/Interfaces/index';
import CargoDetailPills from '../cargo-details/index';

import PortDetails from './PortDetails';
import styles from './styles.module.css';
import TimeLine from './TimeLine/index';

interface DetailsInterface {
	dataList: DetailInterface;
	shipmentId: string;
}
const { SHIPMENT_ROUTE_MAPPING } = GLOBAL_CONSTANTS;

function Details({ dataList, shipmentId = '' }: DetailsInterface) {
	const { importer_exporter: importerExporter } = dataList || {};
	const Router = useRouter();

	const { shipment_type:shipmentType } = dataList || {};

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.sub_div}>
					<Tooltip
						interactive
						content={(
							<div className={styles.name}>
								{importerExporter?.business_name || '-'}
							</div>
						)}
					>
						<div className={styles.orgnization_name}>
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
					className={styles.flex_div}
					onClick={() => Router.push(`/booking/${SHIPMENT_ROUTE_MAPPING[shipmentType]}/${shipmentId}`)}
					role="presentation"
				>
					Go to SID →
				</div>
			</div>

			<div className={styles.timeline_container}>
				<TimeLine shipmentId={shipmentId} />
			</div>
		</div>
	);
}

export default Details;
