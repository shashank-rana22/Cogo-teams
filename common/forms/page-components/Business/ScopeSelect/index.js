/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popover } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { setStoreState as setProfileStoreState } from '@cogoport/request';
import getNavData from '@cogoport/request/helpers/get-nav-data';
// import { useDispatch, useSelector } from '@cogoport/store';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState, useMemo, useEffect } from 'react';

import PopoverView from './PopoverView';
import styles from './styles.module.css';

const SCOPE_TYPE_LABEL_MAPPINGS = {
	channel_partner      : 'CP Self',
	channel_partner_team : 'CP Team',
};

const getOptions = (
	navigation,
	permissions_navigations,
	setValues,
	source_apis = [],
) => {
	const navigationData = getNavData(navigation);
	const userNavigationPermissions = permissions_navigations?.[navigation];
	const scopes = [];
	const viewTypes = {};
	let defaultScope = null;
	let defaultView = null;

	const apisToConsider =		source_apis.length > 0 ? source_apis : navigationData?.main_apis;

	(apisToConsider || []).forEach((api) => {
		const apiData = userNavigationPermissions?.[api];
		(apiData || []).forEach((scope) => {
			if (scope.type !== 'none') {
				scopes.push(scope.type);
				viewTypes[scope.type] = Array.from(new Set(scope.through_criteria)).map(
					(key) => ({ label: startCase(key), value: key }),
				);
				if (scope.is_default) {
					defaultScope = scope.type;
					defaultView = scope.through_criteria?.[0] || null;
				}
			}
		});
	});
	const scopeOptions = Array.from(new Set(scopes)).map((key) => ({
		label : SCOPE_TYPE_LABEL_MAPPINGS[key] || startCase(key),
		value : key,
	}));
	setValues({ scope: defaultScope, through_criteria: defaultView });

	return {
		scopeOptions,
		viewTypes,
		defaultScope,
		defaultView,
	};
};

function ScopeSelect({
	size = 'sm',
	showAgent = true,
	defaultValues = null,
	handleValueChange = () => {},
	source_apis = [],
}) {
	const [show, setShow] = useState(false);
	const [values, setValues] = useState(null);
	const dispatch = useDispatch();
	const { routes, pathname, permissions_navigations, profileData } =		useSelector(({ general, profile }) => ({
		routes                  : general?.routeConfig?.routes,
		pathname                : general?.pathname,
		permissions_navigations : profile.permissions_navigations || {},
		profileData             : profile,
	}));
	const navigation = routes?.[pathname]?.navigation || '';
	const data = useMemo(
		() => getOptions(navigation, permissions_navigations, setValues, source_apis),
		[navigation],
	);

	// const { scopeOptions, viewTypes } = data || {};
	// const isMultiView = Object.keys(viewTypes).filter((viewType) => viewTypes[viewType].length > 1);

	// const showScopeSelect = scopeOptions.length > 1 || isMultiView.length > 0;

	const onClose = () => {
		setShow(false);
	};

	const onShow = () => {
		setShow(true);
	};

	const handleViewChange = (vals) => {
		let authorizationparameters = `${navigation}:${vals.scope}`;
		if (vals?.through_criteria) {
			authorizationparameters = `${authorizationparameters}:${vals?.through_criteria}`;
		}
		const general = {
			...profileData,
			authorizationparameters,
			selected_agent_id: vals?.agent_id || undefined,
		};
		dispatch(setProfileStoreState(general));

		setValues(vals);

		handleValueChange(vals);
	};

	useEffect(() => {
		if (!isEmpty(defaultValues)) {
			handleViewChange(defaultValues);
		} else {
			dispatch(setProfileStoreState({ selected_agent_id: undefined }));
		}
	}, []);

	const renderFilters = () => (
		<PopoverView
			onClose={() => setShow(false)}
			onSubmit={handleViewChange}
			data={data}
			values={values}
			navigation={navigation}
			showAgent={showAgent}
		/>
	);

	// if (!showScopeSelect) {
	// 	return null;
	// }

	return (
		<Popover
			show={show}
			withArrow
			usePortal
			placement="bottom"
			renderBody={renderFilters}
			onOuterClick={onClose}
		>
			<div className={styles.scope_select_wrapper}>
				<Button
					style={{ height: 'auto' }}
					ghost
					size={size}
					onClick={onShow}
					id="scope_select_view_btn"
				>
					<div className={styles.scopeselect_main}>
						{SCOPE_TYPE_LABEL_MAPPINGS?.[values?.scope]
							|| startCase(values?.scope)
							|| 'My View'}
						<div className={styles.scopeselect_iconcontainer}>
							<IcMArrowRotateDown className="scopeselect-icon" />
						</div>
					</div>
				</Button>
			</div>
		</Popover>
	);
}

export default ScopeSelect;
