import { useSelector } from '@cogoport/store';
import { useRouter as useRouterNext } from 'next/router';
import { useMemo } from 'react';

import getModifiedRoutes from '../utils/getModifiedRoutes';

export const useRouter = () => {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const routerNext = useRouterNext();

	const router = useMemo(() => ({
		...routerNext,
		push: (href, as = null, routerOptions = {}) => {
			const { withPrefix = true, ...options } = routerOptions;
			const { newHref, newAs } = getModifiedRoutes({
				href, as, partnerId, withPrefix,
			});
			return routerNext.push(newHref, newAs, options);
		},
		replace: (href, as = null, routerOptions = {}) => {
			const { withPrefix, ...options } = routerOptions;
			const { newHref, newAs } = getModifiedRoutes({
				href, as, partnerId, withPrefix,
			});
			return routerNext.push(newHref, newAs, options);
		},
	}), [partnerId, routerNext]);

	return router;
};

export default useRouter;
