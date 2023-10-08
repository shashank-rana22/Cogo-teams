import getSideBarConfigs from '@cogoport/navigation-configs/side-bar';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useState, useEffect, useMemo } from 'react';

import {
	backAllowed,
	eventListener, getRedirectNavMapping,
} from '../helpers/getRedirectNavMapping';

export default function useShipmentBack() {
	const router = useRouter();
	const profileData = useSelector(({ profile }) => profile);
	const { permissions_navigations = {}, email = '' } = profileData;

	const [isBackAllowed, setIsBackAllowed] = useState(false);

	const { navigation = '' } = router.query;

	const { navToRedirect, version } = useMemo(() => {
		const { nav_items: { partner: allSideBarNavs } } = getSideBarConfigs({
			userData: { permissions_navigations, email },
		});

		return getRedirectNavMapping(allSideBarNavs, navigation);
	}, [permissions_navigations, email, navigation]);

	useEffect(() => {
		setIsBackAllowed(() => {
			if (backAllowed(router.components)) {
				window.addEventListener('beforeunload', eventListener);
				return true;
			}
			return false;
		});
	}, [router.components]);

	const handleShipmentsClick = (e) => {
		e.preventDefault();

		if (isBackAllowed) {
			router.back();
		} else if (version === 'v2') {
			const REMOVE_V2 = '/v2';
			const routerPushURL = navToRedirect?.href?.slice(REMOVE_V2.length);
			router.push(routerPushURL, routerPushURL);
		} else {
			const newUrl = `${window.location.origin}/${router?.query?.partner_id}/${navToRedirect.href}`;

			window.location.href = newUrl;
		}

		window.sessionStorage.removeItem('prev_nav_restricted');
		window.sessionStorage.removeItem('prev_nav');
		window.removeEventListener('beforeunload', eventListener);
	};

	return { handleShipmentsClick };
}
