import { Badge, Popover, DateRangepicker } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

export function RenderFlashedAt({ setFilterParams = () => {}, filtersParams = {} }) {
	return (
		<div className={styles.header_container}>
			Flashed At
			<Popover
				placement="bottom"
				render={(
					<DateRangepicker
						name="date"
						onChange={(val) => setFilterParams((prev) => ({ ...prev, flashed_at: val }))}
						value={filtersParams?.flashed_at}
						isPreviousDaysAllowed
						maxDate={new Date()}
					/>
				)}
			>
				{isEmpty(filtersParams?.flashed_at) ? (
					<Badge color="orange">
						<IcMFilter className={styles.filter_icon} onClick={() => {}} />
					</Badge>
				) : <IcMFilter className={styles.filter_icon} onClick={() => {}} />}
			</Popover>
		</div>
	);
}
