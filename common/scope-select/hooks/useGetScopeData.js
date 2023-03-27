import { Router } from '@cogoport/next';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { startCase } from '@cogoport/utils';
import { useEffect, useCallback, useRef } from 'react';

import useGetScopeOptions from './useGetScopeOptions';

export default function useGetScopeData({ defaultValues, closePopover }) {
	const { profile } = useSelector((store) => store);
	const dispatch = useDispatch();

	const { scopeData, navigation, authParams, pathname } = useGetScopeOptions({ defaultValues });

	const { defaultScope, defaultView } = scopeData;
	const [, scope, viewType = ''] = (authParams || '').split(':');

	const initialValues = useRef({ pathname, scope });

	const displayScope = startCase(scope ?? defaultScope ?? 'My View');
	const displayViewType = startCase(viewType ?? defaultView);

	const handleApply = useCallback((data) => {
		const { scope: newScope, viewType: newViewType, selected_agent_id } = data || {};
		let newAuthParams = `${navigation}:${newScope}`;

		if (newViewType) { newAuthParams += `:${newViewType}`; }

		dispatch(setProfileState({
			...profile,
			authParams: newAuthParams,
			...(selected_agent_id && { selected_agent_id }),
		}));

		closePopover();
	}, [profile, dispatch, navigation, closePopover]);

	const resetProfile = useCallback(() => {
		const { authParams: oldAuthParams, selected_agent_id: selected_agent, ...newProfile } = profile;
		newProfile.authParams = undefined;
		newProfile.selected_agent_id = undefined;

		dispatch(setProfileState(newProfile));
	}, [profile, dispatch]);

	useEffect(() => {
		if (!initialValues.current.scope && pathname === initialValues.current.pathname) {
			initialValues.current.scope = defaultScope;
			handleApply({ scope: defaultScope, viewType: defaultView });
		}
	}, [defaultScope, defaultView, handleApply, pathname]);

	useEffect(() => Router.events.on('routeChangeStart', resetProfile), [resetProfile]);

	return { handleApply, scopeData, scope, viewType, displayScope, displayViewType };
}
