import { CONTAINER_SIZE_MAPPING } from './constant';
import styles from './styles.module.css';

function ContainerDetails({ selectedCard = {} }) {
	const ZEROVALUE = 0;

	const { search_params = {}, search_type: searchType = '' } = selectedCard || {};

	const {
		lcl_freight_services_attributes = {},
		fcl_freight_services_attributes = {},
		air_freight_services_attributes = {},
		search_type = '',
	} = search_params || {};

	const serviceTypeMapping = lcl_freight_services_attributes?.[ZEROVALUE]
	|| fcl_freight_services_attributes?.[ZEROVALUE] || air_freight_services_attributes?.[ZEROVALUE];

	const {
		containers_count, container_size, weight, volume, packages_count,
		commodity, inco_term, container_type, payment_type,
	} = serviceTypeMapping || {};

	return (
		<div>
			<div className={styles.shipment_header}>
				{searchType === 'air_freight' ? 'Airlines Details' : 'Shipment Details'}
			</div>

			<div className={styles.shipment_specification}>
				{search_type === 'fcl_freight' && (
					<>
						<span className={styles.tag}>{CONTAINER_SIZE_MAPPING[container_size]}</span>
						<span className={styles.tag}>
							{`${containers_count || '-'} Container`}
						</span>
					</>
				)}
				{search_type !== 'fcl_freight' && (
					<>
						<span className={styles.tag}>
							{weight ? `${weight || '-'} kg` : ''}
						</span>
						<span className={styles.tag}>
							{volume ? `${volume || '-'} cbm` : ''}
						</span>
						{packages_count
							&& (
								<span className={styles.tag}>
									{packages_count || '-'}
								&nbsp;
									{serviceTypeMapping?.packages?.[ZEROVALUE]?.packing_type || 'packages' }
								</span>
							)}
					</>
				)}
				<span className={styles.tag}>{commodity?.toUpperCase()}</span>
				{inco_term && (
					<span className={styles.tag}>
						{`Inco - ${inco_term?.toUpperCase()}`}
					</span>
				)}
				{container_type
					&& <span className={styles.tag}>{container_type?.toUpperCase()}</span>}
				{payment_type
							&& <span className={styles.tag}>{payment_type}</span>}
			</div>
		</div>
	);
}

export default ContainerDetails;
