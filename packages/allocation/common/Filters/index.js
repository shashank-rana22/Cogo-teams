import { Button, Popover } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import FilterContent from './FiltersContent';
import styles from './styles.module.css';

function Filters(props) {
	const { t } = useTranslation(['allocation']);

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

	const defaultName = name || t('allocation:apply_button');

	const defaultHeading = heading || t('allocation:search_label');

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
