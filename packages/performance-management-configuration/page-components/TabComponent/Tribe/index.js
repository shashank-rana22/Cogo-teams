import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import AddSquadTribeModal from '../../../commons/AddSquadTribeModal';
import Header from '../../../commons/CommonHeader';

import controls from './controls';
import styles from './styles.module.css';

function Tribe() {
	const [search, setSearch] = useState('');
	const [showAddTribeModal, setShowAddTribeModal] = useState(false);

	const { control, formState: { errors } } = useForm();

	const onClickAddButton = () => {
		setShowAddTribeModal(true);
	};

	return (
		<div className={styles.container}>
			<Header setSearch={setSearch} search={search} label="Tribe" onClickAddButton={onClickAddButton} />

			{
				showAddTribeModal ? (
					<AddSquadTribeModal
						showModal={showAddTribeModal}
						setShowModal={setShowAddTribeModal}
						label="Tribe"
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
