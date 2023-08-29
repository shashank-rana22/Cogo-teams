import styles from './styles.module.css';

function ContainerDetails({ selectedCard = {} }) {
	const ZEROVALUE = 0;
	const CONTAINER_SIZE_MAPPING = {
		20     : '20 Ft',
		40     : '40Ft',
		'40HC' : '40 Ft HC',
		'45HC' : '45 Ft HC',
	};

	const serviceTypeMapping =	selectedCard?.search_params?.lcl_freight_services_attributes?.[ZEROVALUE]
		|| selectedCard?.search_params?.fcl_freight_services_attributes?.[ZEROVALUE]
		|| selectedCard?.search_params?.air_freight_services_attributes?.[ZEROVALUE];

	const fcl_type = selectedCard?.search_params?.search_type;

	return (
		<div>
			<div className={styles.shipment_header}>
				{selectedCard?.search_type === 'air_freight' ? 'Airlines Details' : 'Shipment Details'}
			</div>

			<div className={styles.shipment_specification}>
				{fcl_type === 'fcl_freight' && (
					<>
						<span className={styles.tag}>{CONTAINER_SIZE_MAPPING[serviceTypeMapping?.container_size]}</span>
						<span className={styles.tag}>
							{`${serviceTypeMapping?.containers_count || '-'} Container`}
						</span>
					</>
				)}
				{fcl_type !== 'fcl_freight' && (
					<>
						<span className={styles.tag}>
							{serviceTypeMapping?.weight
								? `${serviceTypeMapping?.weight || '-'} kg`
								: ''}
						</span>
						<span className={styles.tag}>
							{serviceTypeMapping?.volume
								? `${serviceTypeMapping?.volume || '-'} cbm`
								: ''}
						</span>
						{serviceTypeMapping?.packages_count
							&& (
								<span className={styles.tag}>
									{serviceTypeMapping?.packages_count || '-'}
								&nbsp;
									{serviceTypeMapping?.packages?.[ZEROVALUE]?.packing_type || 'packages' }
								</span>
							)}
					</>
				)}
				<span className={styles.tag}>{serviceTypeMapping?.commodity?.toUpperCase()}</span>
				{serviceTypeMapping?.inco_term && (
					<span className={styles.tag}>
						{`Inco - ${serviceTypeMapping?.inco_term?.toUpperCase()}`}
					</span>
				)}
				{serviceTypeMapping?.container_type
					&& <span className={styles.tag}>{serviceTypeMapping?.container_type?.toUpperCase()}</span>}
				{serviceTypeMapping?.payment_type
							&& <span className={styles.tag}>{serviceTypeMapping?.payment_type}</span>}
			</div>
		</div>
	);
}

export default ContainerDetails;
