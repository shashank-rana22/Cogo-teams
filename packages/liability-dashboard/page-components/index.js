import { Tabs, TabPanel } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import CogoPoints from './Cogopoints';

function Index() {
	const router = useRouter();
	const { asPath } = router;

	const pathCheck = asPath.includes('/liability-dashboard/cogopoint');

	const activeTab = pathCheck && 'cogopoint';

	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const handleTabChange = (tab) => {
		if (tab === 'promotion') {
			window.location.href = `/${partnerId}/liability-dashboard`;
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

export default Index;
