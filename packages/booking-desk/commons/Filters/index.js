import { Button, Input, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

export default function Filters({ stateProps }) {
	const [showPopover, setShowPopover] = useState(false);
	const { filters, setFilters } = stateProps;

	return (
		<div className={styles.container}>

			<div className={styles.open_filters}>
				<Input
					placeholder="Search SID"
					type="search"
					size="sm"
					value={filters.q || ''}
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
					prefix={<IcMSearchlight />}
				/>

				{filters?.shipment_type !== 'fcl_freight_local' ? (
					<Popover
						render={(
							<PopoverContent
								stateProps={stateProps}
								setShowPopover={setShowPopover}
								key={showPopover}
							/>
						)}
						placement="bottom"
						visible={showPopover}
						onClickOutside={() => setShowPopover(false)}
					>
						<Button
							themeType="secondary"
							size="sm"
							onClick={() => setShowPopover(!showPopover)}
							className={styles.filter_text}
						>
							<div className={styles.button_content}>
								<IcMFilter />
								{' '}
							&ensp;Filters
							</div>
						</Button>
					</Popover>
				) : null}
			</div>
		</div>
	);
}
