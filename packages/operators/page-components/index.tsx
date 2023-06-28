import { Button, Modal } from '@cogoport/components';
import { IcMEdit, IcMAirport } from '@cogoport/icons-react';
import { React, useState } from 'react';

import CardList from '../common/CardList';
import useGetListData from '../hooks/useGetListData';

import CreateOperators from './CreateOperators';
import EditOperators from './EditOperators';
import Header from './Header';
import styles from './styles.module.css';

interface NestedObj {
	[key: string]: string;
}

function Operators() {
	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(false);
	const [item, setItem] = useState(null);

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
		handleLogo: (singleItem:NestedObj) => (
			<div className={styles.title_black}>
				{singleItem?.logo_url ? (
					<img className={styles.image} alt="logo" src={singleItem.logo_url} />
				) : (
					<IcMAirport width={40} height={40} fill="#393F70" />
				)}
			</div>
		),
		handleStatus: (singleItem:NestedObj) => (
			<div className={styles.title_black}>
				{singleItem?.status === 'active' ? (
					<div className={styles.event} style={{ backgroundColor: '#d2ffe4' }}>{singleItem?.status}</div>
				) : (
					<div className={styles.event} style={{ backgroundColor: '#ffd0d0' }}>
						{singleItem?.status}
					</div>
				)}
			</div>
		),
		handleEdit: (singleItem:NestedObj) => (
			<Button
				className={styles.edit}
				onClick={() => {
					setEdit(true);
					setItem(singleItem);
				}}
			>
				<IcMEdit />
			</Button>
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
			>
				<CreateOperators
					setShow={setShow}
					refetch={getLocationData}
					setPage={setPage}
					setFinalList={setFinalList}
					page={page}
				/>

			</Modal>

			<Modal
				show={edit}
				onClose={() => setEdit(false)}
			>
				<EditOperators
					item={item}
					edit={edit}
					setEdit={setEdit}
					refetch={getLocationData}
					setPage={setPage}
					setFinalList={setFinalList}
					page={page}
				/>
			</Modal>

			<CardList
				fields={config.fields}
				data={listData}
				loading={loading}
				page={page}
				setPage={setPage}
				finalList={finalList}
				setFinalList={setFinalList}
				functions={functions}
			/>
		</div>
	);
}

export default Operators;
