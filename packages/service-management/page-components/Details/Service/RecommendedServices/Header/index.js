import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

const ZERO = 0;
function Header({
	setIsCheckAll = () => {},
	selected = [],
	isCheckAll = false,
	setSelected = () => {},
	data = [],
	newData = [],
}) {
	const handleSelectAll = () => {
		setIsCheckAll(!isCheckAll);
		setSelected(newData?.map((i) => i));
		if (isCheckAll) {
			setSelected([]);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.checkbox}>
				<Checkbox
					className={styles.primary}
					checked={isCheckAll}
					onChange={handleSelectAll}
					disabled={!data?.length}
				/>
				Select All
			</div>
			<span className={styles.selected}>
				<b>Selected</b>
				{' '}
				(
				{selected?.length || ZERO}
				)
			</span>
		</div>
	);
}

export default Header;
