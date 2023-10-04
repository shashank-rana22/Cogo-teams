import { Button, Popover } from '@cogoport/components';

import FilterContent from './FiltersContent';
import styles from './styles.module.css';

function Filters(props) {
	const {
		children = null,
		open = false,
		setOpen = () => {},
		name = '',
		heading = '',
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

	const defaultName = name || 'Apply';

	const defaultHeading = heading || 'Search';

	return (
		<div className={styles.popover_container}>
			<Popover
				interactive
				placement={placement}
				visible={open}
				onClickOutside={onClickOutside}
				render={open ? (
					<FilterContent
						heading={defaultHeading}
						controls={controls}
						formProps={formProps}
						onApplyingFilters={onApplyingFilters}
						onResettingFilters={onResettingFilters}
					/>
				) : null}
			>
				{children || <Button onClick={() => setOpen(!open)}>{defaultName}</Button>}
			</Popover>
		</div>
	);
}

export default Filters;
