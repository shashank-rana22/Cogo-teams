import { Popover, Toggle } from '@cogoport/components';
import { IcMProfile, IcMCross } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import stakeholderMappings from '../SendTo/stakeholder-mappings';

import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Header({
	isStakeholder,
	channelData = {},
	primaryService = {},
	setShow = () => {},
	showImpMsg,
	setShowImpMsg = () => {},
}) {
	const { push } = useRouter();

	const { serial_id, shipment_type, id: shipment_id } = channelData || {};
	const shipmentType = shipment_type?.split('_')[0];

	const handleClick = () => {
		push(`/booking/${shipmentType}/[shipment_id]`, `/booking/${shipmentType}/${shipment_id}`);
		setShow(false);
	};

	const groupChatUsers = isStakeholder
		? stakeholderMappings[channelData?.stakeholder_types?.[0] || 'default']
		|| []
		: stakeholderMappings.default;

	const content = () => (
		<div className={styles.chat_users}>
			{groupChatUsers?.map((item) => (
				<div className={styles.user_name}>{startCase(item)}</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				{serial_id ? (
					<div
						className={styles.serial_id}
						role="button"
						tabIndex={0}
						onClick={() => handleClick()}
					>
						Shipment ID
						<span style={{ fontWeight: 700, marginLeft: '4px' }}>
							#
							{serial_id}
						</span>
					</div>
				) : null}

				<PortDetails
					data={channelData}
					primary_service={primaryService}
					isShow={false}
				/>

				<Popover
					placement="bottom"
					interactive
					render={content()}
					className={styles.popover_container}
				>
					<div className={styles.button}>
						<IcMProfile width={12} height={12} />
						+
						{' '}
						{groupChatUsers?.length}
						{' '}
						others
					</div>
				</Popover>

				<div
					className={styles.close_icon}
					role="button"
					tabIndex={0}
					onClick={() => setShow(false)}
				>
					<IcMCross />
				</div>
			</div>

			<div className={styles.filter_box}>
				<div style={{ color: '#221F20' }}>Show Starred Messages</div>
				<Toggle value={showImpMsg} onChange={setShowImpMsg} />
			</div>

		</div>
	);
}

export default Header;
