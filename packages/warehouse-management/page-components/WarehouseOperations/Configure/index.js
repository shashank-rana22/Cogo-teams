import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import List from '../../../commons/List';
import configureFields from '../../../configurations/configure-fields';
import useListConfigurations from '../../../hooks/useListConfigurations';

import AddNewZoneModal from './AddZone';
import DeleteZoneModal from './DeleteZone';
import EditZoneModal from './EditZone';
import styles from './styles.module.css';

function Configure({
	// data = {},
	// handlePageChange = () => {},
	// page = 1,
	// setPage = () => {},
	activeTab = 'configure',
	// selectedWarehouse = 'delhi',
	addNewZone = false,
	setAddNewZone = () => {},
}) {
	const { fields } = configureFields;

	const { data } = useListConfigurations({ activeTab: { activeTab } });

	const { loading, page, setPage, total_count } = data;
	const handlePageChange = (pageVal) => {
		setPage(pageVal);
	};

	const functions = {
		handleEdit: (item) => (
			<Button
				themeType="linkUi"
				disabled={loading}
				style={{ fontSize: 12 }}
				onClick={() => {
					<EditZoneModal
						item={item}
					/>;
				}}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
		handleDelete: (item) => (
			<Button
				themeType="linkUi"
				disabled={loading}
				style={{ fontSize: 12 }}
				onClick={() => {
					// handleOnDelete(singleItem);
					// console.log('singleItem---handleDelete', singleItem);
					<DeleteZoneModal
						item={item}
					/>;
				}}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
	};

	return (
		<div className={styles.body_container}>
			{loading ? <div>tejo</div> : (
				<div className={styles.details_list}>
					<List
						fields={fields}
						activeTab={activeTab}
						data={data}
						loading={loading}
						total_count={total_count}
						page={page}
						setPage={setPage}
						functions={functions}
						handlePageChange={handlePageChange}
					/>
				</div>
			)}
			{addNewZone && (
				<AddNewZoneModal
					addNewZone={addNewZone}
					setAddNewZone={setAddNewZone}
				/>
			)}
		</div>
	);
}

export default Configure;
