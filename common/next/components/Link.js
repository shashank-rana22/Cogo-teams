import { useSelector } from '@cogoport/store';
import Link from 'next/link';

import getModifiedRoutes from '../utils/getModifiedRoutes';

function LinkComponent({
	href,
	as,
	children,
	withPrefix,
	...rest
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const { newHref, newAs } = getModifiedRoutes({
		href, as, partnerId, withPrefix,
	});

	return (
		<Link {...rest} href={newHref} as={newAs}>
			{children}
		</Link>
	);
}

LinkComponent.defaultProps = {
	withPrefix : true,
	as         : '',
};

export default LinkComponent;
