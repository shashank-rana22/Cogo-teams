import { Button, Popover } from '@cogoport/components';

import FilterContent from './FiltersContent';
import styles from './styles.module.css';

function Filters(props) {
	const {
		children = null,
		open = false,
		setOpen = () => {},
		name = 'Apply',
		heading = 'Search',
		placement = 'bottom',
		reset = () => {},
		applyFilters = () => {},
		controls = [],
		formProps = {},
		onClickOutside = () => {},
	} = props;

	const onApplyingFilters = () => {
		applyFilters();
		setOpen(false);
	};

	const onResettingFilters = () => {
		reset();
		setOpen(false);
	};

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
						formProps={formProps}
						onApplyingFilters={onApplyingFilters}
						onResettingFilters={onResettingFilters}
					/>
				) : null}
			>
				{children || <Button onClick={() => setOpen(!open)}>{name}</Button>}
			</Popover>
		</div>
	);
}

export default Filters;
