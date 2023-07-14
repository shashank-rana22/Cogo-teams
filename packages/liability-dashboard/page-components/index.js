import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import CogoPoints from './Cogopoints';

function LiabilityDashboard() {
	const { asPath } = useRouter();

	const partnerId = useSelector((state) => state?.profile?.partner?.id);

	const pathCheck = asPath.includes('/liability-dashboard/cogopoint');

	const activeTab = pathCheck && 'cogopoint';

	const handleTabChange = (tab) => {
		if (tab === 'promotion') {
			window.location.href = `/${partnerId}/liability-dashboard`; // ROUTE TO THE OLD ADMIN LIABILITY DASHBOARD
		}
	};

	return (
		<Tabs
			activeTab={activeTab}
			themeType="primary"
			onChange={(tab) => { handleTabChange(tab); }}
		>
			<TabPanel name="promotion" title="Promotions" />

			<TabPanel name="cogopoint" title="Cogopoints">
				<CogoPoints />
			</TabPanel>
		</Tabs>

	);
}

export default LiabilityDashboard;
