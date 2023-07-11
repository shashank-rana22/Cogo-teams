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

const DEFAULT_VALUE = {
	weight                      : null,
	volume                      : null,
	lr_number                   : null,
	eway_bill_numberx           : null,
	eway_bill_number            : null,
	container_size              : null,
	containers_count            : null,
	packages_count              : null,
	trucks_count                : null,
	selected_schedule_departure : null,
	schedule_arrival            : null,
	selected_schedule_arrival   : null,
	bn_expiry                   : null,
	booking_note_deadline       : null,
	si_cutoff                   : null,
	vgm_cutoff                  : null,
	gate_in_cutoff              : null,
	document_cutoff             : null,
	tr_cutoff                   : null,
	iip_certificates            : null,
	msds_certificates           : null,
	bl_category                 : null,
	bl_type                     : null,
	cargo_readiness_date        : null,
	supplier_poc                : null,
	origin_oversea_agent        : null,
	shipper_details             : null,
	buy_quotation_agreed_rates  : null,
	importer_exporter           : null,
	shipment_type               : null,
	pickup                      : null,
	drop                        : null,
};

function Details({ dataList = DEFAULT_VALUE, shipmentId = '' }: DetailsInterface) {
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
