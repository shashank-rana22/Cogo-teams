import { Popover, Button, Input } from '@cogoport/components';
import { IcMSearchlight, IcMFilter } from '@cogoport/icons-react';
import { previousDay } from 'date-fns';

import styles from './styles.module.css';

function AnalyticsFilter({
	// showPopover = false,
	setShowPopover = () => {},
	filterValue = {},
	setFilterValue = () => {},
}) {
	// const handleClose = () => {
	// 	setShowPopover(false);
	// 	setFilterValue({
	// 		levelType : null,
	// 		userCount : null,
	// 	});
	// };

	const handleFilter = () => {
		console.log('filt333er', filterValue);
	};

	const rederFilter = () => (
		<div className={styles.content}>
			<div className={styles.wrapper}>
				<div className={styles.label}>Search by Level</div>
				<Input
					size="sm"
					placeholder="search by level"
					value={filterValue?.levelType}
					min={0}
					onChange={(val) => setFilterValue((prev) => ({ ...prev, levelType: val }))}
				/>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.label}>Search by User</div>
				<Input
					size="sm"
					placeholder="search by user"
					value={filterValue.userCount}
					min={0}
					onChange={(val) => setFilterValue((prev) => ({ ...prev, userCount: val }))}
				/>
			</div>
			<div className={styles.button_container}>
				{/* <Button size="sm" themeType="tertiary" onClick={handleClose}>Cancel</Button> */}
				<Button size="sm" themeType="primary" onClick={handleFilter}>Apply</Button>
			</div>
		</div>
	);
	return (
		<div className={styles.container}>
			<Input prefix={<IcMSearchlight />} size="md" placeholder="Search by name" />

			<Popover placement="top" render={rederFilter()}>
				<IcMFilter className={styles.filter_icon} onClick={() => setShowPopover(true)} />
			</Popover>

		</div>
	);
}
export default AnalyticsFilter;
