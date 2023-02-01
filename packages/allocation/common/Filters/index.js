import { Button, Popover } from '@cogoport/components';

import FilterContent from './FIlterContent';
import styles from './styles.module.css';

function Filters({
	children = null,
	open = false,
	setOpen = () => {},
	name = 'APPLY',
	heading = 'Search',
	placement = 'bottom',
	onClickOutside = () => {},
	reset = () => {},
	applyFilters = () => {},
	controls = [],
}) {
	return (
		<div className={styles.popover_container}>
			<Popover
				interactive
				placement={placement}
				onClickOutside={onClickOutside}
				visible={open}
				render={(
					<FilterContent
						heading={heading}
						controls={controls}
						reset={reset}
						applyFilters={applyFilters}
						setOpen={setOpen}
					/>
				)}
			>
				{children || <Button onClick={() => setOpen(!open)}>{name}</Button>}
			</Popover>
		</div>
	);
}

export default Filters;
