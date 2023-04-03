import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';
import { Router } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useMemo } from 'react';

import { backAllowed, eventListener, getRedirectNavMapping } from './helpers/getRedirectNavMapping';

export default function useShipmentBack() {
	const profileData = useSelector(({ profile }) => profile);
	const { permissions_navigations = {}, email = '' } = profileData;

	const [isBackAllowed, setIsBackAllowed] = useState();

	const { redirectNav } = useMemo(() => {
		const { nav_items: { partner: allSideBarNavs } } = getSideBarConfigs({ permissions_navigations, email });

		return { redirectNav: getRedirectNavMapping(allSideBarNavs) };
	}, [permissions_navigations, email]);

	useEffect(() => {
		setIsBackAllowed(() => {
			if (backAllowed(Router)) {
				window.addEventListener('beforeunload', eventListener);
				return true;
			}
			return false;
		});

		return () => {
			window.sessionStorage.removeItem('prev_nav_restricted');
			window.sessionStorage.removeItem('prev_nav');
			window.removeEventListener('beforeunload', eventListener);
		};
	}, []);

	const handleShipmentsClick = (e) => {
		e.preventDefault();

		if (isBackAllowed) {
			Router.back();
		} else {
			Router.push(redirectNav?.href, redirectNav?.as);
		}
	};

	return { handleShipmentsClick };
}
