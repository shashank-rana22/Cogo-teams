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

	const { navToRedirect, version } = useMemo(() => {
		const { nav_items: { partner: allSideBarNavs } } = getSideBarConfigs({
			userData: { permissions_navigations, email },
		});

		return getRedirectNavMapping(allSideBarNavs);
	}, [permissions_navigations, email]);

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
			router.push(navToRedirect?.href, navToRedirect?.as);
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
