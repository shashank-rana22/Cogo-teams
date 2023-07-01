import { startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const labels = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'truck_type',
	'trucks_count',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'haulage_type',
	'transport_mode',
	'cargo_weight_per_container',
];

const mapping = {
	container_size({ primaryService = {} }) {
		if (primaryService.container_size.includes('HC')) {
			return primaryService.container_size.replace('HC', 'ft HC');
		}
		return `${primaryService.container_size || '--'}ft`;
	},
	containers_count({ primaryService = {} }) {
		if (!primaryService.containers_count) {
			return null;
		}
		if (primaryService.containers_count === 1) {
			return '1 Container';
		}
		return `${primaryService.containers_count} Containers`;
	},

	packages_count({ primaryService = {} }) {
		if (!primaryService.packages_count) {
			return null;
		}
		if (primaryService.packages_count === 1) {
			return '1 Package';
		}
		return `${primaryService.packages_count} Packages`;
	},

	trucks_count({ primaryService = {} }) {
		if (!primaryService.trucks_count) {
			return null;
		}
		if (primaryService.trucks_count === 1) {
			return '1 Truck';
		}
		return `${primaryService.trucks_count} Trucks`;
	},

	container_type({ primaryService = {} }) {
		return startCase(primaryService.container_type || '');
	},

	trade_type({ primaryService = {} }) {
		return startCase(primaryService.trade_type || '');
	},

	commodity({ primaryService = {} }) {
		return startCase(primaryService.commodity || '');
	},

	truck_type({ primaryService = {} }) {
		return startCase(primaryService.truck_type || '');
	},

	inco_term({ primaryService = {} }) {
		return `Inco - ${upperCase(primaryService.inco_term || '')}`;
	},

	packages({ primaryService = {} }) {
		const { packages = [] } = primaryService || {};

		const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

		const condt = valueForInput?.length || valueForInput?.width || valueForInput?.height;
		const variable = `${valueForInput?.length || null} X ${
			valueForInput?.width || null
		} X ${valueForInput?.height || null}`;

		const inputValue = valueForInput
			? `${valueForInput.packages_count} Pkg,
		${condt ? `${variable},` : ''} 
		${valueForInput?.packing_type}`
			: '';

		const packageDetails = `Package: ${inputValue} ${
			packages?.length > 1 ? `+ ${(packages?.length || 1) - 1} more` : ''
		}`;
		if (packages?.length === 0) {
			return 'Packages : none';
		}
		return packageDetails;
	},

	volume({ primaryService = {} }) {
		return `Vol. - ${primaryService.volume} cbm`;
	},

	weight({ primaryService = {} }) {
		const isFTL = primaryService?.service_type === 'ftl_freight';
		return `Weight. - ${primaryService.weight} ${isFTL ? 'Tons' : 'Kgs'}`;
	},

	haulage_type({ primaryService = {} }) {
		return startCase(primaryService.haulage_type || '');
	},

	transport_mode({ primaryService = {} }) {
		return startCase(primaryService.transport_mode || '');
	},

	cargo_weight_per_container({ primaryService = {} }) {
		return `${primaryService?.cargo_weight_per_container || ''} MT`;
	},
};

function ContainerInfo({ primaryService }) {
	return labels.map((label) => {
		if (!primaryService[label]) {
			return null;
		}

		if (
			Array.isArray(primaryService[label])
				&& primaryService[label].length === 0
		) {
			return null;
		}

		return <div className={styles.box} key={label}>{mapping[label]({ primaryService })}</div>;
	});
}

export default ContainerInfo;
