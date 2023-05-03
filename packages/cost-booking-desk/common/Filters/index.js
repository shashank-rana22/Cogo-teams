import { Button, Input, Popover } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import ScopeSelect from '@cogoport/scope-select/components';
import { useState } from 'react';

import PopoverContent from './PopoverContent';
import styles from './styles.module.css';

export default function Filters({ stateProps = {}, dateFilters, setDateFilters }) {
	const [showPopover, setShowPopover] = useState(false);
	const { filters, setFilters } = stateProps;

	console.log('statePropssss', stateProps);

	return (
		<div className={styles.container}>
			<div className={styles.open_filters}>
				{/* <Input
					placeholder="Search SID"
					type="search"
					size="sm"
					value={filters.q || ''}
					onChange={(val) => setFilters({ ...filters, q: val, page: 1 })}
					prefix={<IcMSearchlight />}
				/> */}

				<Popover
					visible={showPopover}
					onClickOutside={() => setShowPopover(false)}
					render={(
						<PopoverContent
							onClose={() => setShowPopover(false)}
							stateProps={stateProps}
							setShowPopover={setShowPopover}
							dateFilters={dateFilters}
							setDateFilters={setDateFilters}
							key={showPopover}
						/>
					)}
					placement="bottom"
				>
					<Button
						themeType="secondary"
						size="sm"
						onClick={() => setShowPopover((p) => !p)}
						className={styles.filter_text}
					>
						<div className={styles.button_content}>
							<IcMFilter />
							Filters
						</div>
					</Button>
				</Popover>
				<div className={styles.scope_container}>
					<ScopeSelect defaultValues={stateProps.scopeFilters} size="md" />
				</div>
			</div>
		</div>
	);
}
