import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import AddSquadTribeModal from '../../../commons/AddSquadTribeModal';
import Header from '../../../commons/CommonHeader';

// import styles from './styles.module.css';
import controls from './controls';
import TableComponent from './TableComponent';

function Squad() {
	const [search, setSearch] = useState('');
	const [showAddSquadModal, setShowAddSquadModal] = useState(false);

	const { control, formState } = useForm();

	const { errors } = formState;

	const onClickAddButton = () => {
		setShowAddSquadModal(true);
	};

	return (
		<div>
			<Header search={search} setSearch={setSearch} label="Squad" onClickAddButton={onClickAddButton} />
			<TableComponent />

			{
				showAddSquadModal ? (
					<AddSquadTribeModal
						showModal={showAddSquadModal}
						setShowModal={setShowAddSquadModal}
						label="Squad"
						controls={controls}
						control={control}
						errors={errors}
					/>
				) : null
			}
		</div>
	);
}

export default Squad;
