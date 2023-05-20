import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

const func = () => {};

const ListButtons = ({
	item = {},
	activeTab = '',
	setActivityModal = func,
	setShowPopover = func,
}) => {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const router = useRouter();
	const { organization_data = [], referee_data = {}, immediate_child_count = 0, name = '' } = item;
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

	const buttonOptions = [
		{
			children: (
				<Button disabled={immediate_child_count === 0} size="sm" themeType="tertiary">
					<div className={styles.label}>
						Show Network
					</div>
				</Button>
			),
			onClick: () => {
				if (immediate_child_count !== 0) {
					setShowPopover({});
					router.push(
						`/referral/dashboard/[referrer_id]?user_name=${name || referee_data?.name}`,
						`/referral/dashboard/${referee_data?.id}?user_name=${name || referee_data?.name}`,
					);
				}
			},
			conditions: ['user', 'affiliate'],
		},
		{
			children: (
				<div className={styles.label}>
					Activity Log
				</div>
			),
			onClick: () => {
				setActivityModal(true);
				setShowPopover({});
			},
			conditions: ['affiliate', 'user'],

		},
		{
			children: (
				<Button disabled={emptyOrg || account_type === 'service_provider'} size="sm" themeType="tertiary">
					<div className={styles.label}>
						View Profile
					</div>
				</Button>
			),
			onClick: () => {
				if (!emptyOrg) {
					userProfile();
				}
			},
			conditions: ['user'],
		},

	];

	return buttonOptions.filter(
		(itm) => (
			itm.conditions.includes(activeTab)
		),
	);
};

export default ListButtons;
