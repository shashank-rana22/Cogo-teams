import { Badge } from '@cogoport/components';
import merge from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Header({
	filters,
	hookSetters,
	filterProps,
	globalActions,
	showScopeSelect = false,
	id_prefix,
}) {
	const {
		dynamicKey, dynamicKeyControls, controls, formatControls, ...rest
	} =		filterProps;
	const allControls = [
		...(controls || []),
		...(dynamicKeyControls[filters[dynamicKey]] || []),
	];
	const actualControls = formatControls
		? formatControls(allControls)
		: allControls;
	const renderFilters = (
		<Badge
			{...rest}
			filters={filters}
			setFilters={(val) => {
				const cumilativeFilters = merge(val || {}, { page: 1 });
				hookSetters.setFilters(cumilativeFilters);
			}}
			controls={actualControls}
			dynamicKey={dynamicKey}
			id_prefix={id_prefix}
		/>
	);

	return (
		<div className={styles.container}>
			{actualControls.length > 0 ? renderFilters : null}
			{globalActions && globalActions()}
			{showScopeSelect}
		</div>
	);
}

export default Header;
