import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function ListButtons({
	item = {},
	setShowActivityModal = () => {},
	setShowOptions = () => {},
}) {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const router = useRouter();

	const { organization_data = [], referee_data = {}, total_child_count = 0, name = '' } = item;
	const { id: refereeId = '', name: refereename = '' } = referee_data || {};

	const emptyOrg = isEmpty(organization_data);

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
		setShowOptions({});
		router.push(
			`/referral/dashboard/[referrer_id]?user_name=${name || refereename}`,
			`/referral/dashboard/${refereeId}?user_name=${name || refereename}`,
		);
	};

	const disablButton = total_child_count === 0;

	return (
		<div className={styles.button_container}>
			<Button size="md" themeType="secondary" onClick={handleNetwork} disabled={disablButton}>
				Show network
			</Button>
			<Button
				size="md"
				themeType="secondary"
				onClick={() => { setShowActivityModal(true); setShowOptions({}); }}
				disabled={disablButton}
			>
				Activity Log
			</Button>
			<Button size="md" themeType="secondary" onClick={userProfile} disabled={emptyOrg}>
				View Profile
			</Button>
		</div>
	);
}

export default ListButtons;
