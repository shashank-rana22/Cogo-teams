import { Avatar, Modal, Loader, Tooltip } from '@cogoport/components';
import { IcMCall, IcMEmail, IcCCogoCoin } from '@cogoport/icons-react';
import { startCase, format } from '@cogoport/utils';
import React from 'react';

import TooltipContent from '../../../../common/TooltipContent';
import { USER_STATUS_COLOUR, USER_STATUS_MAPPING, USER_AVATAR } from '../../../../constants';
import useGetReferrerNetworkNode from '../../../../hooks/useGetReferrerNetworkNode';

import NetWorkCommission from './NetWorkCommission';
import styles from './styles.module.css';

function UserNetworkModal({
	setUserModal = () => {},
	userModal,
	nodeData = {},
	setNodeData = () => {},
}) {
	const handleClose = () => {
		setUserModal(false);
		setNodeData({});
	};

	const { referee_id = '' } = nodeData || {};

	const { data = {}, loading = false } = useGetReferrerNetworkNode({
		referee_id,
	});

	const {
		id = '',
		name = '',
		status = '',
		created_at = '',
		email = '',
		mobile_number_eformat = '',
		referral_cogopoint_earned = 0,
		referral_cogopoint_estimated = 0,
		network_cogopoint_earned = 0,
		network_cogopoint_estimated = 0,
		total_child_count = 0,
		organization = [],
	} = data?.data || {};

	const lastUserId = id.slice(-6).toUpperCase();

	const orgCount = organization.length - 1;

	const userReferralData = [
		{
			label : 'Earned',
			value : referral_cogopoint_earned,
		},
		{
			label : 'Estimated',
			value : referral_cogopoint_estimated,
		},
	];

	const networkReferralData = [
		{
			label : 'Earned',
			value : network_cogopoint_earned,
		},
		{
			label : 'Estimated',
			value : network_cogopoint_estimated,
		},
	];

	return (

		<Modal size="xs" className={styles.modal_container} show={userModal} onClose={handleClose} placement="right">
			<Modal.Header />

			{loading ? (
				<div className={styles.loading_state}>
					<Loader themeType="primary" />
				</div>
			) : (
				<div className={styles.container}>

					<div className={styles.user_profile}>
						<Avatar
							src={USER_AVATAR}
							alt="user-avatar"
							disabled={false}
							size="50px"
							className={styles.user_avatar}
						/>

						<div className={styles.flex_details}>
							<div
								className={styles.status}
								style={{ color: USER_STATUS_COLOUR[status] }}
							>
								{USER_STATUS_MAPPING[status]}
							</div>
							<div className={styles.profile_id}>{lastUserId }</div>
						</div>
					</div>

					<div className={styles.user_name}>{startCase(name)}</div>

					<Tooltip
						content={<TooltipContent organization={organization} />}
						placement="bottom"
					>
						<div className={styles.user_details}>
							{startCase(organization?.[0])}

							<span className={styles.more}>
								{organization.length > 1 && `+${orgCount} More`}
							</span>
						</div>
					</Tooltip>

					<div className={styles.joining_details}>
						<div className={styles.user_details}>
							Joining Date:
							{' '}
							{format(created_at, 'dd LLL yyyy')}
						</div>
						<div className={styles.user_details}>
							<Tooltip
								content={<div>{email}</div>}
								placement="bottom"
							>
								<div className={styles.user_profile}>
									<IcMEmail className={styles.contact_icon} />
									<div className={styles.email_div}>{email}</div>
								</div>
							</Tooltip>
						</div>

						<div className={styles.user_details}>
							<div className={styles.user_profile}>
								<IcMCall className={styles.contact_icon} />
								<div className={styles.flex_details}>
									+
									{mobile_number_eformat}
								</div>
							</div>
						</div>
					</div>

					<div className={styles.commission}>Referral Commission:</div>
					{userReferralData.map((item) => (
						<div className={styles.user_profile} key={item}>
							<IcCCogoCoin
								width={20}
								height={20}
								className={styles.contact_icon}
								fill="#BDBDBD"
							/>
							<div className={styles.earned_points}>{item.value}</div>
							<div className={styles.flex_details}>
								{' '}
								{item.label}
							</div>
						</div>
					))}

					<div className={styles.network}>
						<div className={styles.commission}>
							{startCase(name)}
							’s Network
						</div>
						<div className={styles.flex_details}>
							Connections :
							{' '}
							{total_child_count}
						</div>
					</div>

					<NetWorkCommission networkReferralData={networkReferralData} />

				</div>
			)}
		</Modal>

	);
}

export default UserNetworkModal;
