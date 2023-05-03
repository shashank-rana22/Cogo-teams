import { Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListRepository from '../hooks/useListRepository';

import Details from './Details';
import Header from './Header';
import RepositoryModal from './RepositoryModal';
import styles from './styles.module.css';

function AirRepository() {
	const [showModal, setShowModal] = useState(false);
	const [item, setItem] = useState(null);
	const [edit, setEdit] = useState(false);
	const { data, listRepository, loading } = useListRepository();
	return (
		<div className={styles.container}>
			<Header />
			<div className={styles.middle_container}>
				<Input
					// value={searchValue}
					suffix={<IcMSearchlight fill="#CACACA" className="search_icon" />}
					className={styles.input_search}
					placeholder="Search By Airline/POC "
					type="text"
					// onChange={(val) => {
					// 	setSearchValue(val);
					// }}
				/>
				<Button size="md" themeType="accent" onClick={() => setShowModal(true)}>+ Create new Repository</Button>
			</div>
			<Details data={data} loading={loading} setShowModal={setShowModal} setItem={setItem} setEdit={setEdit} />
			{showModal && (
				<RepositoryModal
					showModal={showModal}
					setShowModal={setShowModal}
					listRepository={listRepository}
					item={item}
					edit={edit}
					setEdit={setEdit}
				/>
			)}
		</div>
	);
}

export default AirRepository;
