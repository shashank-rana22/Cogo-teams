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
	reset = () => {},
	applyFilters = () => {},
	controls = [],
	formProps = {},
	onClickOutside = () => {},
}) {
	return (
		<div className={styles.popover_container}>
			<Popover
				interactive
				placement={placement}
				visible={open}
				onClickOutside={onClickOutside}
				render={open ? (
					<FilterContent
						heading={heading}
						controls={controls}
						reset={reset}
						applyFilters={applyFilters}
						setOpen={setOpen}
						formProps={formProps}
					/>
				) : null}
			>
				{children || <Button onClick={() => setOpen(!open)}>{name}</Button>}
			</Popover>
		</div>
	);
}

export default Filters;
