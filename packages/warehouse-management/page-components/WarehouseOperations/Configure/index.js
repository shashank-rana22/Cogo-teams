import { Button } from '@cogoport/components';
import { IcMEdit } from '@cogoport/icons-react';

import List from '../../../commons/List';
import configureFields from '../../../configurations/configure-fields';
import useListConfigurations from '../../../hooks/useListConfigurations';

import AddNewZoneModal from './AddZone';
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

	const functions = {
		handleEdit: () => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => {
					// handleOnEdit(singleItem);
					// console.log('singleItem---handleEdit', singleItem);
				}}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
		handleDelete: () => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => {
					// handleOnDelete(singleItem);
					// console.log('singleItem---handleDelete', singleItem);
				}}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),
	};

	const { data } = useListConfigurations({ activeTab: { activeTab } });
	// console.log('data', data);

	const { loading, page, setPage, total_count } = data;
	const handlePageChange = (pageVal) => {
		setPage(pageVal);
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
