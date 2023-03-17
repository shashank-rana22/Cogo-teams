import { Popover, Button, Toggle } from '@cogoport/components';
import { IcMProfile } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import React from 'react';

import stakeholderMappings from '../SendTo/stakeholder-mappings';

import PortDetails from './PortDetails';
import styles from './styles.module.css';

const shipmentChatStakeholders = [
	'service_ops1',
	'service_ops2',
	'service_ops3',
	'booking_agent',
	'supply_agent',
];

function Header({ shipment_data = {}, primary_service = {}, setShow = () => {} }) {
	const { push } = useRouter();

	const { serial_id, id: shipment_id } = shipment_data || {};

	const handleClick = () => {
		push('/shipments/[id]', `/shipments/${shipment_id}`);
		setShow(false);
	};

	const isStakeholder = shipmentChatStakeholders.includes(
		shipment_data?.stakeholder_types?.[0],
	);
	const groupChatUsers = isStakeholder
		? stakeholderMappings[shipment_data?.stakeholder_types?.[0] || 'default']
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
					data={shipment_data}
					primary_service={primary_service}
					isShow={false}
				/>
			</div>
			<div className={styles.sub_container}>
				<div className={styles.filter_box}>
					<div style={{ color: '#221F20' }}>Important Message</div>
					<Toggle value="aaaa" onChange={setShow} />
				</div>

				<Popover
					placement="bottom"
					interactive
					render={content()}
					className={styles.popover_container}
				>
					<div className={styles.button}>
						<Button>
							<IcMProfile width={15} height={15} />
							+
							{' '}
							{groupChatUsers?.length}
						</Button>
					</div>
				</Popover>

			</div>

		</div>
	);
}

export default Header;
