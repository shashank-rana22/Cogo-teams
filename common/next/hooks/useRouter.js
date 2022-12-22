import { useRouter as useRouterNext } from 'next/router';
import { useContext } from 'react';

import { RoutesContext } from '../components/RoutesProvider';

export const useRouter = () => {
	const routesContext = useContext(RoutesContext);
	const router = useRouterNext();

	return {
		...router,
		push: (href, as = null, withPrefix = true) => {
			const { pathPrefix, asPrefix } = routesContext || {};

			const newHref = withPrefix ? `${pathPrefix || ''}${href}` : href;
			const newAs = withPrefix ? `${asPrefix || ''}${as || href}` : as || href;

			router.push(newHref, newAs);
		},
		replace: (href, as = null, withPrefix = true) => {
			const { pathPrefix, asPrefix } = routesContext || {};

			const newHref = withPrefix ? `${pathPrefix || ''}${href}` : href;
			const newAs = withPrefix ? `${asPrefix || ''}${as || href}` : as || href;

			router.replace(newHref, newAs);
		},
	};
};

export default useRouter;
