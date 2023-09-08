import { Toggle } from '@cogoport/components';
import { useSelector } from '@cogoport/store';

import AddEdit from '../CreateUpdateTnC/AddEdit';

import Filter from './Filters';
import styles from './styles.module.css';

function Header(props) {
	const {
		currentStatus,
		action,
		setCurrentStatus,
		setPagination,
		filters,
		setFilters,
		tncLevel,
		setTncLevel,
		setEditTncModalId,
		editTncModalId,
		refetch,
	} = props;

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);
	const onChangeToggleStatus = () => {
		setCurrentStatus((pv) => (pv === 'active' ? 'inactive' : 'active'));
		const FIRST_PAGE = 1;
		setPagination(FIRST_PAGE);
	};
	return (
		<div className={styles.container}>
			<p className={styles.header}>Terms And Condition</p>
			<div className={styles.container}>
				<AddEdit
					refetch={refetch}
					tncLevel={tncLevel}
					setTncLevel={setTncLevel}
					editTncModalId={editTncModalId}
					setEditTncModalId={setEditTncModalId}
					action={action}
					isMobile={isMobile}
				/>
				<Toggle
					offLabel="Inactive"
					onLabel="Active"
					value={currentStatus}
					onChange={onChangeToggleStatus}
				/>
				<Filter filters={filters} setFilters={setFilters} />
			</div>

		</div>
	);
}

export default Header;
