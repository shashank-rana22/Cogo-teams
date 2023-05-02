import { Router } from '@cogoport/next';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useEffect, useCallback, useRef } from 'react';

import useGetScopeOptions from './useGetScopeOptions';

export default function useScope({ defaultValues = {}, closePopover = ()=>{}, apisToConsider = [] }) {
	const { profile } = useSelector((store) => store);
	const dispatch = useDispatch();

	const { authParams, selected_agent_id: selectedAgentId, ...restProfile } = profile || {};

	const { scopeData, navigation, pathname } = useGetScopeOptions({ defaultValues, apisToConsider });

	const [, scope, viewType = ''] = (authParams || '').split(':');

	const initialValues = useRef({ pathname, scope });

	const handleApply = useCallback((data) => {
		const { scope: newScope, viewType: newViewType, selected_agent_id } = data || {};
		if (newScope) {
			let newAuthParams = `${navigation}:${newScope}`;

			if (newViewType) { newAuthParams += `:${newViewType}`; }

			dispatch(setProfileState({
				...restProfile,
				authParams: newAuthParams,
				selected_agent_id,
			}));
			closePopover();
		}
	}, [dispatch, navigation, closePopover, restProfile]);

	const resetProfile = useCallback(() => {
		dispatch(setProfileState({
			...restProfile,
			authParams        : '',
			selected_agent_id : '',
		}));
	}, [restProfile, dispatch]);

	useEffect(() => {
		if (!initialValues.current.scope && pathname === initialValues.current.pathname) {
			const { defaultScope, defaultView, defaultAgentId } = scopeData || {};
			initialValues.current.scope = defaultScope;

			handleApply({
				scope             : defaultScope,
				viewType          : defaultView,
				selected_agent_id : defaultAgentId,
			});
		}
	}, [scopeData, handleApply, pathname]);

	useEffect(() => Router.events.on('routeChangeStart', resetProfile), [resetProfile]);

	return { handleApply, scopeData, scope, viewType, selectedAgentId };
}
