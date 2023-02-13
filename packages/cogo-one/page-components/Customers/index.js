import { Pill } from '@cogoport/components';
import { IcMDoubleFilter } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import TooltipInformation from '../../common/TooltipInformation';

import styles from './styles.module.css';

function Customers() {
	const LIST = [
		{
			label: 'green',

		},	{
			label: 'green',

		}, {
			label: 'green',

		},
		{
			label: 'green',

		},	{
			label: 'green',

		}, {
			label: 'green',

		},
		{
			label: 'green',

		},	{
			label: 'green',

		}, {
			label: 'green',

		},

	];

	const pillsData = LIST.slice(0, 3);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.source_types}>
					<div>
						{pillsData.map((item) => (
							<Pill
								size="md"
								color="#FEF3E9"
							>
								{startCase(item.label)}
							</Pill>
						))}
					</div>
					<div className={styles.more_counts}>
						<TooltipInformation />
					</div>
				</div>
				<div className={styles.filter_icon}>
					<IcMDoubleFilter width={25} height={25} />
				</div>

			</div>
		</div>
	);
}

export default Customers;
