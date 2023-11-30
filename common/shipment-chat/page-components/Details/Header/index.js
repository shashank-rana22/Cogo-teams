import { Popover, Toggle, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMProfile, IcMCross } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import stakeholderMappings from '../SendTo/stakeholder-mappings';

import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Header({
	isStakeholder = false,
	channelData = {},
	primaryService = {},
	setShow = () => {},
	showImpMsg = false,
	setShowImpMsg = () => {},
}) {
	const { push } = useRouter();

	const { serial_id, shipment_type, id: shipment_id } = channelData || {};
	const shipmentType = shipment_type?.split('_')?.[GLOBAL_CONSTANTS.zeroth_index];

	const handleClick = () => {
		push(`/booking/${shipmentType}/[shipment_id]`, `/booking/${shipmentType}/${shipment_id}`);
		setShow(false);
	};

	const groupChatUsers = isStakeholder
		? stakeholderMappings[channelData?.stakeholder_types?.[GLOBAL_CONSTANTS.zeroth_index] || 'default']
		|| []
		: stakeholderMappings.default;

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				{serial_id ? (
					<Button
						className={styles.serial_id}
						themeType="link"
						onClick={() => handleClick()}
					>
						{`Shipment ID #${serial_id}`}
					</Button>
				) : null}

				<PortDetails
					data={channelData}
					primary_service={primaryService}
				/>

				<Popover
					placement="bottom"
					interactive
					render={(
						<div className={styles.chat_users}>
							{(groupChatUsers || []).map((item) => (
								<div key={item} className={styles.user_name}>{startCase(item)}</div>
							))}
						</div>
					)}
					className={styles.popover_container}
				>
					<div className={styles.button}>
						<IcMProfile width={12} height={12} className={styles.profile_img} />
						{`${groupChatUsers?.length || GLOBAL_CONSTANTS.zeroth_index} Contacts`}
					</div>
				</Popover>

				<div className={styles.close_icon}>
					<Button
						themeType="linkUi"
						onClick={() => setShow(false)}
					>
						<IcMCross />
					</Button>
				</div>
			</div>

			<div className={styles.filter_box}>
				<div>Show Starred Messages</div>
				<Toggle value={showImpMsg} onChange={(event) => setShowImpMsg(event?.target?.checked)} />
			</div>

		</div>
	);
}

export default Header;
