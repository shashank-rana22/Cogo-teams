import { Tooltip, cl } from '@cogoport/components';
import {
	IcMHaulage,
	IcMCfs,
	IcMCustoms,
	IcMTransport,
	IcMFcl,
	IcMLocalCharges,
	IcMAir,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const MAPPING = {
	origin_trailer_freight        : IcMTransport,
	origin_ftl_freight            : IcMTransport,
	origin_transportation         : IcMTransport,
	origin_haulage_freight        : IcMHaulage,
	origin_fcl_customs            : IcMCustoms,
	origin_fcl_cfs                : IcMCfs,
	origin_fcl_freight_local      : IcMLocalCharges,
	fcl_freight                   : IcMFcl,
	destination_fcl_freight_local : IcMLocalCharges,
	destination_fcl_cfs           : IcMCfs,
	destination_fcl_customs       : IcMCustoms,
	destination_haulage_freight   : IcMHaulage,
	destination_transportation    : IcMTransport,
	destination_ftl_freight       : IcMTransport,
	destination_trailer_freight   : IcMTransport,
	origin_ltl_freight            : IcMTransport,
	destination_ltl_freight       : IcMTransport,
	destination_air_customs       : IcMCustoms,
	origin_air_customs            : IcMCustoms,
	origin_air_freight_local      : IcMLocalCharges,
	destination_air_freight_local : IcMLocalCharges,
	air_freight                   : IcMAir,
};

const classNameSelector = ({ service = {}, selectedServices = [] }) => {
	const { iconName = '', type = '' } = service;

	if (selectedServices.includes(iconName) && type === 'icon') {
		return 'additional-services-logo';
	}

	if (type === 'text') {
		return 'highlighted_circle';
	}

	return 'disable';
};

function ServiceIcon({ service = {}, selectedServices = [] }) {
	const { iconName = '', type = '', label = '', point = '' } = service;

	const Icon = MAPPING[iconName] || IcMCustoms;

	return (
		<Tooltip
			interactive
			content={(
				<div>
					{startCase(iconName || label) || `Add ${point} Transportation`}
				</div>
			)}
		>
			<div className={cl`${styles.container} ${styles[classNameSelector({ selectedServices, service })]}`}>
				{type === 'icon' ? <Icon height="16px" width="16px" /> : null}
				{type === 'text' ? <div className={styles.label}>{label}</div> : null}
				<div className={cl`${styles.highlight} ${styles[classNameSelector({ selectedServices, service })]}`} />
			</div>
		</Tooltip>
	);
}

export default ServiceIcon;
