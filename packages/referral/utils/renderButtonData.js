import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

// const func = () => {};

function ListButtons({
	item = {},
	// activeTab = '',
	// setActivityModal = func,
	// setShowPopover = func,
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const router = useRouter();
	const { organization_data = [], referee_data = {}, immediate_child_count = 0, name = '' } = item;
	console.log('immediate_child_count:', immediate_child_count);
	const emptyOrg = isEmpty(organization_data);
	console.log('emptyOrg:', emptyOrg);
	const { account_type = '', tags = [], id = '' } = organization_data?.[0] || [];
	const checkPartner = (tags || []).includes('partner');
	const userProfile = () => {
		if (account_type === 'importer_exporter' && checkPartner) {
			window.open(`/${partnerId}/prm/${id}`, '_blank');
		} else if (account_type === 'importer_exporter' && !checkPartner) {
			window.open(`/${partnerId}/details/demand/${id}`, '_blank');
		}
	};

	const handleNetwork = () => {
		router.push(
			`/referral/dashboard/[referrer_id]?user_name=${name || referee_data?.name}`,
			`/referral/dashboard/${referee_data?.id}?user_name=${name || referee_data?.name}`,
		);
	};

	return (
		<div className={styles.button_container}>
			<Button size="md" themeType="secondary" onClick={handleNetwork}>
				Show network
			</Button>
			<Button size="md" themeType="secondary">
				Activity Log
			</Button>
			<Button size="md" themeType="secondary" onClick={() => userProfile()}>
				View Profile
			</Button>
		</div>
	);
}

export default ListButtons;
