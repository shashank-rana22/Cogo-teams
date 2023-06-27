import { Pill, Tooltip } from '@cogoport/components';
import { startCase, upperCase } from '@cogoport/utils';

import RenderTruckShipments from './renderTruckShipments';
import styles from './styles.module.css';

const renderShipment = (itemData, field) => {
	const { shipment_type = '-', service_type = '-' } = itemData || {};
	const { commodityKey = '' } = field || {};

	const isTruckType =	['ftl_freight', 'ltl_freight'].includes(shipment_type)
		|| ['ftl_freight', 'ltl_freight'].includes(service_type);

	if (
		['shipment_cargo_details', 'quotation_cargo_details', 'spot_search_cargo_details']
			.includes(commodityKey) && isTruckType
	) {
		return (
			<RenderTruckShipments
				itemData={itemData}
				commodityKey={commodityKey}
				shipment_type={shipment_type}
			/>
		);
	}

	return (
		<Tooltip
			content={(
				<div className={styles.tooltip}>
					{itemData?.container_size && (
						<>
							Container size:
							{' '}
							{itemData.container_size}
							{' '}
							<br />
						</>
					)}
					{itemData?.container_type && (
						<>
							Container type:
							{' '}
							{startCase(itemData.container_type)}
							{' '}
							<br />
						</>
					)}
					{itemData?.commodity && (
						<>
							Commodity:
							{' '}
							{startCase(itemData.commodity)}
							{' '}
							<br />
						</>
					)}
					{itemData?.containers_count && (
						<>
							Container count:
							{' '}
							{itemData.containers_count}
							{' '}
							<br />
						</>
					)}
					{itemData?.container_numbers?.length > 0 ? (
						<>
							Containers:
							<br />
							{itemData.container_numbers.map((container_number, index) => (
								<>
									{`${index + 1}. ${container_number}`}
									<br />
								</>
							))}
						</>
					) : (
						''
					)}
				</div>
			)}
			placement="top"
		>
			<div className={styles.content}>

				{itemData?.container_size ? (
					<Pill size="md" color="#F9F9F9">
						{itemData.container_size === '20' || itemData.container_size === '40'
							? `${itemData.container_size}ft`
							: itemData.container_size}
					</Pill>
				) : null}

				{itemData.containers_count > 0 ? (
					<Pill size="md" color="#F9F9F9">
						{`${itemData.containers_count} Container`}
					</Pill>
				) : null}

				{itemData.container_type ? (
					<Pill size="md" color="#F9F9F9">{startCase(itemData.container_type)}</Pill>
				) : null}

				{(startCase(itemData.container_type)
						|| itemData.container_size
						|| itemData.containers_count) && <br />}

				{itemData?.commodity ? (
					<Pill size="md" color="#F9F9F9">
						{startCase(itemData.commodity)}
					</Pill>
				) : null}

				{itemData?.inco_term ? (
					<Pill size="md" color="#FDEBE9">
						{`Inco: ${upperCase(itemData.inco_term)}`}
					</Pill>
				) : null}

				<Pill size="md" color="#F9F9F9">
					+3 more
				</Pill>
			</div>
		</Tooltip>
	);
};

export default renderShipment;
