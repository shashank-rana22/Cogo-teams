import AddSquadTribeModal from '../../../commons/AddSquadTribeModal';
import Header from '../../../commons/CommonHeader';
import StyledTable from '../../../commons/StyledTable';

import controls from './controls';
import useSquad from './useSquad';

const ADD_BUTTON_LABEL = 'Squad';
const TABLE_EMPTY_TEXT = 'No Squad created yet';

function Squad() {
	const {
		search, setSearch, showAddSquadModal, setShowAddSquadModal, columns, control, errors,
		onClickSubmitButton,
		loading,
		handleSubmit,
	} = useSquad();

	const onClickAddButton = () => {
		setShowAddSquadModal(true);
	};

	return (
		<div>
			<Header
				search={search}
				setSearch={setSearch}
				label={ADD_BUTTON_LABEL}
				onClickAddButton={onClickAddButton}
			/>

			<StyledTable columns={columns} data={[{}]} emptyText={TABLE_EMPTY_TEXT} loading={false} />

			{
				showAddSquadModal ? (
					<AddSquadTribeModal
						showModal={showAddSquadModal}
						setShowModal={setShowAddSquadModal}
						label={ADD_BUTTON_LABEL}
						controls={controls}
						control={control}
						errors={errors}
						onClickSubmitButton={onClickSubmitButton}
						loading={loading}
						handleSubmit={handleSubmit}
					/>
				) : null
			}
		</div>
	);
}

export default Squad;
