import {
	IcMCfs,
	IcMCustoms,
	IcMFcl,
	IcMAppLocalsHandling,
	IcMTrailorFull,
	IcMTransport,
	IcMFair,
	IcMAppInsurance,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const MAPPING = {
	transportation    : IcMTransport,
	ftl_freight       : IcMTransport,
	trailer_freight   : IcMTrailorFull,
	ltl_freight       : IcMTransport,
	fcl_customs       : IcMCustoms,
	fcl_cfs           : IcMCfs,
	fcl_freight       : IcMFcl,
	air_freight       : IcMFair,
	fcl_freight_local : IcMAppLocalsHandling,
	lcl_freight_local : IcMAppLocalsHandling,
	air_freight_local : IcMAppLocalsHandling,
	cargo_insurance   : IcMAppInsurance,
};

function ServiceIcon({ service = '' }) {
	const Icon = MAPPING[service] || IcMCustoms;

	return (
		<div className={styles.container}>
			<Icon width={30} height={30} />
		</div>
	);
}

export default ServiceIcon;
