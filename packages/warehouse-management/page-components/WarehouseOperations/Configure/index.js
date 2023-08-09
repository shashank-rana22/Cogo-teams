import { Button } from '@cogoport/components';
import { IcMDelete, IcMEdit } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
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
	searchValue = '',
}) {
	const { fields } = configureFields;
	const [editZone, setEditZone] = useState({});
	const [deleteZone, setDeleteZone] = useState({});

	const { loading, data, listAPI } = useListConfiguration({ searchValue });

	const { page, setPage } = data;
	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};

	const handleButtonClicks = ({
		singleItem = {},
		clickedButton = '',
	}) => {
		if (clickedButton === 'edit' && !isEmpty(editZone) && editZone.id === singleItem.id) {
			return (
				<EditZoneModal
					item={singleItem}
					editZone={editZone}
					setEditZone={setEditZone}
					listAPI={listAPI}
				/>
			);
		}
		if (clickedButton === 'delete' && !isEmpty(deleteZone) && deleteZone.id === singleItem.id) {
			return (
				<DeleteZoneModal
					id={singleItem.id}
					listAPI={listAPI}
					deleteZone={deleteZone}
					setDeleteZone={setDeleteZone}
				/>
			);
		}
		return <div />;
	};

	const functions = {
		handleEdit: (singleItem) => (
			<>
				<Button
					style={{ fontSize: 12 }}
					onClick={() => setEditZone(singleItem)}
				>
					<IcMEdit />
				</Button>
				{handleButtonClicks({ singleItem, clickedButton: 'edit' })}
			</>
		),
		handleDelete: (singleItem) => (
			<>
				<Button
					style={{ fontSize: 12 }}
					onClick={() => setDeleteZone(singleItem)}
				>
					<IcMDelete width={15} height={15} />
				</Button>
				{handleButtonClicks({ singleItem, clickedButton: 'delete' })}
			</>
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
					page={page}
					setPage={setPage}
					listAPI={listAPI}
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

		</div>
	);
}

export default Configure;
