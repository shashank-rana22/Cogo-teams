import { Tooltip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import CargoDetailPills from '../../cargo-details/index';
import PortDetails from '../../Details/PortDetails/index';

import styles from './styles.module.css';

export interface ShipmentDataProps {
	id: string,
	serial_id: string,
}

function ShipmentIdView({ shipmentData }) {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.sub_div}>
				<div className={styles.serial_id}>
					Shipment ID#
					{' '}
					{shipmentData?.serial_id}
				</div>
				<Tooltip
					interactive
					content={(
						<div className={styles.name}>
							{shipmentData?.importer_exporter?.business_name || '-'}
						</div>
					)}
				>
					<div className={styles.orgnization_name}>
						{shipmentData?.importer_exporter?.business_name || '-'}
					</div>
				</Tooltip>
			</div>

			<div className={styles.flex}>
				<PortDetails data={shipmentData} />
			</div>

			<div className={styles.tags}>
				<CargoDetailPills detail={shipmentData} />
			</div>

			<div
				className={styles.flex_div}
				onClick={() => {
					const baseUrl = window.location.origin;
					const newUrl = `${baseUrl}/${router?.query?.partner_id}/shipments/${shipmentData?.id}`;
					window.location.href = newUrl;
				}}
				role="presentation"
			>
				Go to SID →
			</div>
		</div>
	);
}
export default ShipmentIdView;
