import { Tags, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function FeedbackCard({ data = {} }) {
	const { origin_port = {}, destination_port = {}, container_size, container_type, commodity } = data;

	const items = [
		{
			children : startCase(container_type),
			disabled : false,
			color    : '#cdf7d4',
			tooltip  : false,
		},
		{
			children : `${container_size}`,
			disabled : false,
			color    : '#cdf7d4',
			tooltip  : false,
		},
		{
			children : startCase(commodity),
			disabled : false,
			color    : '#cdf7d4',
			tooltip  : false,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.port_info}>
				<Tooltip
					content={(
						<div>{origin_port.display_name}</div>
					)}
					placement="top"
				>
					<p className={styles.port_code}>{origin_port.port_code || origin_port.inttra_code}</p>
				</Tooltip>
				<IcMPortArrow style={{ margin: '0px 12px' }} />
				<Tooltip
					content={(
						<div>
							{destination_port.display_name}
						</div>
					)}
					placement="top"
				>
					<p className={styles.port_code}>
						{destination_port.port_code || destination_port.inttra_code}
					</p>
				</Tooltip>
			</div>
			<div className={styles.vertical_line} />
			<div className={styles.tags}>
				<Tags
					size="sm"
					items={items.filter((item) => item.children != null)}
				/>
			</div>
		</div>
	);
}
export default FeedbackCard;
