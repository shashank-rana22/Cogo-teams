import { Badge, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

export function RenderFlashedAt({ filtersParams = {} }) {
	return (
		<div className={styles.header_container}>
			Flashed At
			<Popover placement="bottom">
				{isEmpty(filtersParams?.flashed_at) ? (
					<Badge color="orange">
						<IcMFilter className={styles.filter_icon} onClick={() => {}} />
					</Badge>
				) : <IcMFilter className={styles.filter_icon} onClick={() => {}} />}
			</Popover>
		</div>
	);
}
