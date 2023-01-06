import { useSelector } from '@cogoport/store';
import { useRouter as useRouterNext } from 'next/router';
import { useMemo } from 'react';

// import { RoutesContext } from '../components/RoutesProvider';

const getModifiedRoutes = ({
	href, as, partnerId = null, withPrefix,
}) => {
	const hrefPrefix = '/[partner_id]';
	const asPrefix = `/${partnerId}`;

	let newHref = href;
	let newAs = as;
	if (withPrefix) {
		if (!as) {
			newHref = `${asPrefix}${newHref}`;
			newAs = null;
		} else {
			newHref = `${hrefPrefix}${href}`;
			newAs = `${asPrefix}${as}`;
		}
	}
	return { newHref, newAs };
};

export const useRouter = () => {
	// const routesContext = useContext(RoutesContext);
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const routerNext = useRouterNext();

	const router = useMemo(() => ({
		...routerNext,
		push: (href, as = null, routerOptions = {}) => {
			const { withPrefix, ...options } = routerOptions;
			const { newHref, newAs } = getModifiedRoutes({
				href, as, partnerId, withPrefix,
			});
			console.log({ newHref, newAs, partnerId });
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
