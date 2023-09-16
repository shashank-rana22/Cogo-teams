import { Toggle } from '@cogoport/components';

import AddEdit from '../CreateUpdateTnC/AddEdit';

import Filter from './Filters';
import styles from './styles.module.css';

const FIRST_PAGE = 1;
function Header({
	currentStatus = 'active',
	setCurrentStatus = () => {},
	setPagination = () => {},
	filters = {},
	setFilters = () => {},
	tncLevel = 'basicInfo',
	setTncLevel = () => {},
	setEditTncModalId = () => {},
	editTncModalId = null,
	refetch = () => {},
}) {
	const onChangeToggleStatus = () => {
		setCurrentStatus((pv) => (pv === 'active' ? 'inactive' : 'active'));
		setPagination(FIRST_PAGE);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Terms And Conditions</h1>
			<div className={styles.container}>
				<AddEdit
					refetch={refetch}
					tncLevel={tncLevel}
					setTncLevel={setTncLevel}
					editTncModalId={editTncModalId}
					setEditTncModalId={setEditTncModalId}
				/>
				<Toggle
					onLabel="Inactive"
					offLabel="Active"
					value={currentStatus}
					onChange={onChangeToggleStatus}
				/>
				<Filter filters={filters} setFilters={setFilters} />
			</div>

		</div>
	);
}

export default Header;
