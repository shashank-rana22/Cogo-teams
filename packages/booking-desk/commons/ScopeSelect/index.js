import { Button, Popover } from '@cogoport/components';
import { routeConfig, navigationMappingsAdmin } from '@cogoport/navigation-configs';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { startCase } from '@cogoport/utils';
import { useState, useMemo, useEffect, useCallback } from 'react';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

const getNavData = (navigation) => {
	const [mainNav, subNav] = navigation.split('-');
	const mainNavData = navigationMappingsAdmin[mainNav];

	return subNav ? ((mainNavData || {}).options || []).find((optObj) => optObj.key === navigation) : mainNavData;
};

const getScopeOptions = ({ navigation, permissions_navigations, defaultValues = {} }) => {
	const navData = getNavData(navigation) || {};
	const { main_apis } = navData;
	const allNavApis = (permissions_navigations || {})[navigation] || {};

	const scopes = [];
	const viewTypes = {};
	let defaultScope = null;
	let defaultView = null;

	(main_apis || []).forEach((api) => {
		(allNavApis[api] || []).forEach((scopeData) => {
			const { is_default, through_criteria, type } = scopeData || {};

			if (type !== 'none') {
				scopes.push(type);
				viewTypes[type] = through_criteria || [];

				if (is_default || defaultValues.scope === type) {
					defaultScope = type;
					[defaultView] = through_criteria || [];
				}
			}
		});
	});

	return { scopes, viewTypes, defaultScope, defaultView };
};

export default function ScopeSelect({ size = 'sm', defaultValues }) {
	const { profile, general } = useSelector((store) => store);
	const { pathname } = general || {};
	const { permissions_navigations, authParams } = profile || {};
	const { navigation } = routeConfig[pathname] || {};

	const dispatch = useDispatch();
	const [showPopover, setShowPopover] = useState(false);

	const scopeData = useMemo(
		() => getScopeOptions({ navigation, permissions_navigations, defaultValues }),
		[navigation, permissions_navigations, defaultValues],
	);
	const { defaultScope, defaultView } = scopeData;
	const [, scope, viewType = ''] = (authParams || '').split(':');

	const displayScope = startCase(scope ?? defaultScope ?? 'My View');
	const displayViewType = startCase(viewType ?? defaultView);

	const closePopover = () => setShowPopover(false);

	const handleApply = useCallback((data) => {
		const { scope: newScope, viewType: newViewType } = data || {};
		let newAuthParams = `${navigation}:${newScope}`;

		if (newViewType) { newAuthParams += `:${newViewType}`; }

		dispatch(setProfileState({ ...profile, authParams: newAuthParams }));
		closePopover();
	}, [profile, dispatch, navigation]);

	useEffect(() => {
		if (!scope) {
			handleApply({ scope: defaultScope, viewType: defaultView });
		}
	}, [scope, handleApply, defaultScope, defaultView]);

	return (
		<Popover
			visible={showPopover}
			onClickOutside={closePopover}
			render={(
				<PopoverContent
					onClose={closePopover}
					onApply={handleApply}
					scopeData={scopeData}
					scope={scope}
					viewType={viewType}
					size={size}
					key={showPopover}
				/>
			)}
		>
			<Button
				size={size}
				onClick={() => setShowPopover((p) => !p)}
				className={`${styles.popover_children} ${styles[size]}`}
			>
				<div className={styles.ellipsis_text}>{displayScope}</div>
				{displayViewType ? (
					<div className={styles.ellipsis_text}>
						&nbsp;(
						{displayViewType}
						)
					</div>
				) : null}
			</Button>
		</Popover>
	);
}
