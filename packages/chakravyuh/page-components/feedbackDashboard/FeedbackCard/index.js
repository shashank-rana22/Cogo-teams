import { Tags, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const ROUND_OFF = 2;

const INFO_KEYS = ['container_type', 'container_size', 'commodity'];

const checkNumber = (val) => {
	if (Number.isNaN(Number(val))) { return 'Not Available'; }
	return Number(val).toFixed(ROUND_OFF);
};

function FeedbackCard({ data = {} }) {
	const {
		origin_port = {},
		destination_port = {},
		deviation,
		old_price,
		new_price,
		performed_by = {},
		closed_by = {},
		source = '',
		preferred_freight_rate,
		preferred_freight_rate_currency = '',
	} = data;

	const items = INFO_KEYS.map((key) => ({
		children : startCase(data[key]),
		disabled : false,
		color    : '#cdf7d4',
		tooltip  : false,
	}));

	return (
		<div className={styles.box}>
			<div className={styles.container}>
				<div className={styles.flex}>
					<Tooltip
						content={(
							<div>{origin_port.display_name}</div>
						)}
						placement="top"
					>
						<p className={styles.port_code}>{origin_port.port_code || origin_port.inttra_code}</p>
					</Tooltip>
					<IcMPortArrow style={{ margin: '0 12px' }} />
					<Tooltip
						content={(
							<div>
								{destination_port?.display_name}
							</div>
						)}
						placement="top"
					>
						<p className={styles.port_code}>
							{destination_port?.port_code || destination_port?.inttra_code}
						</p>
					</Tooltip>
				</div>
				{source
					? (
						<div className={styles.flex}>
							<p>Source: </p>
					&nbsp;
							{startCase(source)}
						</div>
					) : null}
				<div>
					<Tags
						size="sm"
						items={items.filter((item) => item.children != null)}
					/>
				</div>
			</div>
			<div className={styles.sub_container}>
				<div>
					<p className={styles.label}>Disliked rate</p>
					{Number(old_price).toFixed(ROUND_OFF)}
				</div>
				<div>
					<p className={styles.label}>Disliked by</p>
					{performed_by?.name || ''}
				</div>
				<div>
					<p className={styles.label}>Rate added</p>
					{checkNumber(new_price)}
				</div>
				<div>
					<p className={styles.label}>Rate added by</p>
					{closed_by?.name || ''}
				</div>
				<div>
					<p className={styles.label}>Preferred rate</p>
					{checkNumber(preferred_freight_rate)}
					&nbsp;
					{preferred_freight_rate_currency}
				</div>
				<div>
					<p className={styles.label}>Deviation&nbsp;&#40;&#37;&#41;</p>
					{checkNumber(deviation)}
				</div>
			</div>
		</div>
	);
}
export default FeedbackCard;
