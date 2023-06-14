import AddSquadTribeModal from '../../../commons/AddSquadTribeModal';
import Header from '../../../commons/CommonHeader';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import styles from './styles.module.css';
import useTribe from './useTribe';

const ADD_BUTTON_LABEL = 'Tribe';
const TABLE_EMPTY_TEXT = 'No Tribe created yet';

function Tribe() {
	const {
		columns,
		search,
		setSearch,
		showAddTribeModal,
		setShowAddTribeModal,
		control,
		errors,
	} = useTribe();

	const onClickAddButton = () => {
		setShowAddTribeModal(true);
	};

	return (
		<div className={styles.container}>
			<Header
				setSearch={setSearch}
				search={search}
				label={ADD_BUTTON_LABEL}
				onClickAddButton={onClickAddButton}
			/>

			<StyledTable columns={columns} data={[{}]} emptyText={TABLE_EMPTY_TEXT} loading={false} />

			{
				showAddTribeModal ? (
					<AddSquadTribeModal
						showModal={showAddTribeModal}
						setShowModal={setShowAddTribeModal}
						label={ADD_BUTTON_LABEL}
						controls={controls}
						control={control}
						errors={errors}
					/>
				) : null
			}
		</div>
	);
}

export default Tribe;
