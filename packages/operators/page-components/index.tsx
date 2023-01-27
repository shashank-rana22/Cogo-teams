import { Modal } from '@cogoport/components';
import { IcMEdit, IcMAirport } from '@cogoport/icons-react';
import { React, useState } from 'react';

import useGetListData from '../hooks/useGetListData';

import CardList from './CardList';
import CreateOperators from './CreateOperators';
import Header from './Header';
import styles from './styles.module.css';

function List() {
	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(false);

	const {
		config,
		listData,
		loading,
		searchValue,
		setSearchValue,
		page,
		setPage,
		setFinalList,
		finalList,
		getLocationData,
	} = useGetListData();

	const functions = {
		handleLogo: (item:any) => (
			<div className={styles.title_black}>
				{item?.logo_url ? (
					<img className={styles.image} alt="logo" src={item.logo_url} />
				) : (
					<IcMAirport width={40} height={40} fill="#393F70" />
				)}
			</div>
		),
		handleStatus: (item:any) => (
			<div className={styles.title_black}>
				{item?.status === 'active' ? (
					<div className={styles.event} style={{ backgroundColor: '#d2ffe4' }}>{item?.status}</div>
				) : (
					<div className={styles.event} style={{ backgroundColor: '#ffd0d0' }}>
						{item?.status}
					</div>
				)}
			</div>
		),
	};

	return (
		<div className={styles.container}>
			<Header
				setShow={setShow}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<Modal
				show={show}
				onClose={() => setShow(false)}
				className="primary lg"

			>
				<CreateOperators
					setShow={setShow}
					refetch={getLocationData}
					setPage={setPage}
					setFinalList={setFinalList}
					page={page}
				/>

			</Modal>

			{/*
			<Modal
				show={edit}
				onClose={() => setEdit(false)}
				className="primary md"
			>
				<EditOperators
					item={item}
					setEdit={setEdit}
					refetch={getLocationData}
					setPage={setPage}
					setFinalList={setFinalList}
					setShowLoading={setShowLoading}
					page={page}
				/>
			</Modal>
			*/}
			<CardList
				fields={config.fields}
				data={listData}
				loading={loading}
				setEdit={setEdit}
				page={page}
				setPage={setPage}
				finalList={finalList}
				setFinalList={setFinalList}
				functions={functions}
			/>
		</div>
	);
}

export default List;
