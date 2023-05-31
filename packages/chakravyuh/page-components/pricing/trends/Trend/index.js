import { Tags, Button, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Trend({ trend, onClick }) {
	const items = [
		{
			children : trend?.container_size,
			disabled : false,
			color    : '#cdf7d4',
			tooltip  : false,
		},
		{
			children : startCase(trend?.container_type),
			disabled : false,
			color    : '#cdf7d4',
			tooltip  : false,
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.row_top}>
				<div className={styles.row}>
					<Tooltip
						content={(
							<div>
								{trend?.origin_location?.display_name}
							</div>
						)}
						placement="top"
					>
						<p className={styles.port_name}>
							{trend?.origin_location?.port_code
					|| trend?.origin_location?.country_code
					|| trend?.origin_location?.name }

						</p>
					</Tooltip>
					<IcMPortArrow style={{ marginRight: 10, marginLeft: 10 }} />
					<Tooltip
						content={(
							<div>
								{trend?.destination_location?.display_name}
							</div>
						)}
						placement="top"
					>
						<p className={styles.port_name}>
							{trend?.destination_location?.port_code || trend?.destination_location?.country_code
					|| trend?.destination_location?.name}

						</p>
					</Tooltip>
					<div className={styles.line} />
				</div>
				<Tags
					size="sm"
					items={items.filter((item) => !!item.children)}
				/>
				<Button
					size="md"
					themeType="link"
					style={{ marginLeft: 10, color: 'blue' }}
					onClick={() => onClick(trend)}
				>
					Detailed View
				</Button>
			</div>
			<div className={styles.row}>
				<p className={styles.price_point}>
					Avg. :
					<span className={styles.strong}>
						{' '}
						{Number(trend?.price?.average).toFixed(2)}
					</span>
					{' '}
				</p>

				<p className={styles.price_point}>
					Lo. limit :
					<span className={styles.strong}>
						{' '}
						{Number(trend?.price?.lower_limit).toFixed(2)}
					</span>
				</p>

				<p className={styles.price_point}>
					Up. limit :
					<span className={styles.strong}>
						{' '}
						{Number(trend?.price?.upper_limit).toFixed(2)}
					</span>
				</p>
			</div>

			<div className={styles.row}>
				<p className={styles.price_point}>
					Std. dev :
					<span className={styles.strong}>
						{' '}
						{Number(trend?.price?.stand_dev).toFixed(2)}
					</span>
					{' '}
				</p>

				<p className={styles.price_point}>
					Total rates :
					<span className={styles.strong}>
						{' '}
						{Number(trend?.price?.size).toFixed(2)}
					</span>
				</p>

				<p className={styles.price_point}>
					Derived :
					<span className={styles.strong}>
						{' '}
						{trend?.price?.derived ? 'Yes' : 'No'}
					</span>
				</p>
			</div>

		</div>
	);
}

export default Trend;
