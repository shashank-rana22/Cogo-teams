import { InputNumber, Button } from '@cogoport/components';

// import useListTickets from '../../../../hooks/useListTickets';

import styles from './styles.module.css';

function SidTypeFilters(props) {
	const {
		// searchParams = {},
		// setSearchParams = () => {},
		// isAdmin,
		idFilters = {}, setIdFilters = () => {},
		// sortBy = {}, spectatorType = '', date = {},
		// refreshList = {}, setRefreshList = () => {},
		// isUpdated = false, setIsUpdated = () => {},
	} = props;

	const {
		sid = '',
		missingId = '',
		dislikeId = '',
	} = idFilters || {};

	// const { fetchTickets = () => {} } = useListTickets({
	// 	searchParams,
	// 	setSearchParams,
	// 	isAdmin,
	// 	sortBy,
	// 	spectatorType,
	// 	date,
	// 	refreshList,
	// 	setRefreshList,
	// 	isUpdated,
	// 	setIsUpdated,
	// 	idFilters,
	// 	// setIdFilters,
	// });

	return (
		<div className={styles.container}>
			<div className={styles.wrap}>
				<div className={styles.label}>SID</div>
				<InputNumber
					size="sm"
					arrow={false}
					step={1}
					min={0}
					placeholder="Search serial id"
					value={sid}
					onChange={(val) => setIdFilters((prev) => ({ ...prev, sid: val }))}
				/>
			</div>
			<div className={styles.wrap}>
				<div className={styles.label}>Missing Id</div>
				<InputNumber
					size="sm"
					arrow={false}
					step={1}
					min={0}
					placeholder="Search missing id"
					value={missingId}
					onChange={(val) => setIdFilters((prev) => ({ ...prev, missingId: val }))}
				/>
			</div>
			<div className={styles.wrap}>
				<div className={styles.label}>Dislike Id</div>
				<InputNumber
					size="sm"
					arrow={false}
					step={1}
					min={0}
					placeholder="Search dislike id"
					value={dislikeId}
					onChange={(val) => setIdFilters((prev) => ({ ...prev, dislikeId: val }))}
				/>
			</div>
			<div className={styles.footer_section}>
				<Button themeType="secondary" size="sm">Cancel</Button>
				<Button themeType="accent" size="sm">Apply</Button>
			</div>
		</div>
	);
}

export default SidTypeFilters;
