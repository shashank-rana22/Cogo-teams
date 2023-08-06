import { Button } from '@cogoport/components';
import { IcMEdit, IcmDelete } from '@cogoport/icons-react';
import { useState } from 'react';

import List from '../../../commons/List';
import configureFields from '../../../configurations/configure-fields';
import useListConfiguration from '../../../hooks/useListConfiguration';

import AddNewZoneModal from './AddZone';
import DeleteZoneModal from './DeleteZone';
import EditZoneModal from './EditZone';
import styles from './styles.module.css';

function Configure({
	activeTab = 'configure',
	addNewZone = false,
	setAddNewZone = () => {},
}) {
	const { fields } = configureFields;
	const [item, setItem] = useState({});
	const [editZone, setEditZone] = useState(false);
	const [deleteZone, setDeleteZone] = useState(false);

	const { data, listAPI } = useListConfiguration();

	const { loading, page, setPage, total_count } = data;
	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};

	const functions = {
		handleEdit: () => (
			<Button
				themeType="linkUi"
				disabled={loading}
				style={{ fontSize: 12 }}
				onClick={() => setEditZone(true)}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
		handleDelete: () => (
			<Button
				themeType="linkUi"
				disabled={loading}
				style={{ fontSize: 12 }}
				onClick={() => setDeleteZone(true)}
			>
				<IcmDelete fill="#8B8B8B" />
			</Button>
		),
	};

	return (
		<div className={styles.body_container}>
			<div className={styles.details_list}>
				<List
					fields={fields}
					activeTab={activeTab}
					data={data}
					loading={loading}
					total_count={total_count}
					page={page}
					setPage={setPage}
					listAPI={listAPI}
					setItem={setItem}
					functions={functions}
					handlePageChange={handlePageChange}
				/>
			</div>
			{addNewZone && (
				<AddNewZoneModal
					addNewZone={addNewZone}
					setAddNewZone={setAddNewZone}
					listAPI={listAPI}
				/>
			)}
			{editZone && (
				<EditZoneModal
					item={item}
					editZone={editZone}
					setEditZone={setEditZone}
					listAPI={listAPI}
				/>
			)}
			{deleteZone && (
				<DeleteZoneModal
					id={item.id}
					listAPI={listAPI}
					setDeleteZone={setDeleteZone}
				/>
			)}
		</div>
	);
}

export default Configure;
