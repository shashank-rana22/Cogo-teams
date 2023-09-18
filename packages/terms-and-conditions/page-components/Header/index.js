import { Toggle } from '@cogoport/components';

import AddEdit from '../CreateUpdateTnC/AddEdit';

import Filter from './Filters';
import styles from './styles.module.css';

function Header({
	filters = {},
	setFilters = () => {},
	tncLevel = 'basicInfo',
	setTncLevel = () => {},
	setEditTncModalId = () => {},
	editTncModalId = null,
	refetch = () => {},
}) {
	const onChangeToggleStatus = () => {
		setFilters({ status: filters?.status === 'active' ? 'inactive' : 'active', page: 1 });
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
					value={filters?.status}
					onChange={onChangeToggleStatus}
				/>
				<Filter filters={filters} setFilters={setFilters} />
			</div>

		</div>
	);
}

export default Header;
