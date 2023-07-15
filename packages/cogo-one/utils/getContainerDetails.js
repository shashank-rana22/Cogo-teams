// import { startCase, upperCase } from '@cogoport/utils';
// import React from 'react';

// // import { Box } from './styles';

// function ContainerInfo({ primaryService }) {
// 	const { packages = [] } = primaryService || {};
// 	const labels = [
// 		'container_size',
// 		'containers_count',
// 		'container_type',
// 		'commodity',
// 		'inco_term',
// 		'truck_type',
// 		'trucks_count',
// 		'trade_type',
// 		'packages',
// 		'volume',
// 		'weight',
// 		'haulage_type',
// 		'transport_mode',
// 		'cargo_weight_per_container',
// 	];

// 	const valueForInput =		Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

// 	const condt =		valueForInput?.length || valueForInput?.width || valueForInput?.height;
// 	const variable = `${valueForInput?.length || null} X ${
// 		valueForInput?.width || null
// 	} X
// 	${valueForInput?.height || null}`;

// 	const inputValue = valueForInput
// 		? `${valueForInput.packages_count} Pkg,
// 		${condt ? `${variable},` : ''}

// 		  ${valueForInput?.packing_type}`
// 		: '';

// 	const packageDetails = `Package: ${inputValue} ${
// 		packages?.length > 1 ? `+ ${(packages?.length || 1) - 1} more` : ''
// 	}`;

// 	const isFTL = primaryService?.service_type === 'ftl_freight';

// 	const renderValue = (label) => {
// 		switch (label) {
// 			case 'container_size':
// 				if (primaryService.container_size.includes('HC')) {
// 					return primaryService.container_size.replace('HC', 'ft HC');
// 				}
// 				return `${primaryService.container_size || '--'}ft`;
// 			case 'containers_count':
// 				if (!primaryService.containers_count) {
// 					return null;
// 				}

// 				if (primaryService.containers_count === 1) {
// 					return '1 Container';
// 				}

// 				return `${primaryService.containers_count} Containers`;
// 			case 'packages_count':
// 				if (!primaryService.packages_count) {
// 					return null;
// 				}

// 				if (primaryService.packages_count === 1) {
// 					return '1 Package';
// 				}

// 				return `${primaryService.packages_count} Packages`;
// 			case 'trucks_count':
// 				if (!primaryService.trucks_count) {
// 					return null;
// 				}

// 				if (primaryService.trucks_count === 1) {
// 					return '1 Truck';
// 				}

// 				return `${primaryService.trucks_count} Trucks`;
// 			case 'container_type':
// 				return startCase(primaryService.container_type || '');
// 			case 'trade_type':
// 				return startCase(primaryService.trade_type || '');
// 			case 'commodity':
// 				return startCase(primaryService.commodity || '');
// 			case 'truck_type':
// 				return startCase(primaryService.truck_type || '');
// 			case 'inco_term':
// 				return `Inco - ${upperCase(primaryService.inco_term || '')}`;
// 			case 'packages':
// 				if (packages?.length === 0) {
// 					return 'Packages : none';
// 				}
// 				return packageDetails;
// 			case 'volume':
// 				return `Vol. - ${primaryService.volume} cbm`;
// 			case 'weight':
// 				return `Weight. - ${primaryService.weight} ${isFTL ? 'Tons' : 'Kgs'}`;
// 			case 'haulage_type':
// 				return startCase(primaryService.haulage_type || '');
// 			case 'transport_mode':
// 				return startCase(primaryService.transport_mode || '');
// 			case 'cargo_weight_per_container':
// 				return `${primaryService?.cargo_weight_per_container || ''} MT`;
// 			default:
// 				return null;
// 		}
// 	};
// 	return (
// 		<>
// 			{labels.map((label) => {
// 				if (primaryService[label]) {
// 					if (
// 						Array.isArray(primaryService[label])
// 						&& primaryService[label].length === 0
// 					) {
// 						return null;
// 					}
// 					return <div key={label}>{renderValue(label)}</div>;
// 				}
// 				return null;
// 			})}
// 		</>
// 	);
// }

// export default ContainerInfo;
