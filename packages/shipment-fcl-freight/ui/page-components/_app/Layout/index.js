import { AdminLayout } from '@cogoport/components';
import { IcMAccountSettings, IcMBookingDesk } from '@cogoport/icons-react';
import React from 'react';

import LogoSvg from './logo.svg';

function Layout({ children }) {
	return (
		<AdminLayout
			showTopbar
			showNavbar
			topbar={{
				logo: <LogoSvg height={20} />,
			}}
			navbar={{
				nav: [
					{
						icon : <IcMBookingDesk />,
						name : 'Locations',
						href : '/locations',
					},
					{
						icon : <IcMAccountSettings />,
						name : 'Rates',
						href : '/rates',
					},
				],
			}}
		>
			{children}
		</AdminLayout>
	);
}

export default Layout;
