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
	const { data, listRepository, loading } = useListRepository();
	console.log('data', data);
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
			<Details data={data} loading={loading} />
			{showModal && (
				<RepositoryModal
					showModal={showModal}
					setShowModal={setShowModal}
					listRepository={listRepository}
				/>
			)}
		</div>
	);
}

export default AirRepository;
