import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const ORGANIZATION_DATA_DEFAULT_INDEX = 0;
const CHILD_COUNT = 0;

const renderUserProfile = ({ account_type = '', checkPartner, partnerId, id }) => {
	if (account_type === 'importer_exporter') {
		const urlPrefix = `/${partnerId}`;
		const url = checkPartner ? `${urlPrefix}/prm/${id}` : `${urlPrefix}/details/demand/${id}`;
		window.open(url, '_blank');
	}
};

function ListButtons({
	item = {},
	setShowActivityModal = () => {},
	setShowOptions = () => {},
}) {
	const router = useRouter();
	const { partnerId } = useSelector(({ profile }) => ({
		partnerId: profile.partner.id,
	}));

	const { organization_data = [], referee_data = {}, total_child_count = 0, name = '' } = item;
	const { id: refereeId = '', name: refereeName = '' } = referee_data || {};

	const emptyOrg = isEmpty(organization_data);

	const { account_type = '', tags = [], id = '' } = organization_data?.[ORGANIZATION_DATA_DEFAULT_INDEX] || [];
	const checkPartner = (tags || []).includes('partner');

	const handleNetwork = () => {
		setShowOptions({});
		router.push(
			`/referral/dashboard/[referrer_id]?user_name=${name || refereeName}`,
			`/referral/dashboard/${refereeId}?user_name=${name || refereeName}`,
		);
	};

	const disableButton = total_child_count === CHILD_COUNT;

	return (
		<div className={styles.button_container}>
			<Button size="md" themeType="secondary" onClick={handleNetwork} disabled={disableButton}>
				Show network
			</Button>
			<Button
				size="md"
				themeType="secondary"
				onClick={() => { setShowActivityModal(true); setShowOptions({}); }}
				disabled={disableButton}
			>
				Activity Log
			</Button>
			<Button
				size="md"
				themeType="secondary"
				onClick={() => renderUserProfile({ account_type, checkPartner, partnerId, id })}
				disabled={emptyOrg}
			>
				View Profile
			</Button>
		</div>
	);
}

export default ListButtons;
