import { Button } from '@cogoport/components';
import { IcMEdit, IcMAirport, IcMShip, IcMTransport } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import CardList from '../common/CardList';
import { operators } from '../configurations/operators';
import useGetListData from '../hooks/useGetListData';

import Header from './Header';
import OperatorsModal from './OperatorsModal';
import styles from './styles.module.css';

const DEFAULT_LOGO_MAPPING = {
	airline       : <IcMAirport width={40} height={40} fill="#ee3425" />,
	shipping_line : <IcMShip width={40} height={40} fill="#ee3425" />,
	others        : <IcMTransport width={40} height={40} fill="#ee3425" />,
};

const functions = (activeTab, setShow, setEdit, setItem, t) => ({
	handleLogo: (singleItem) => (
		<div className={styles.title_black}>
			{singleItem?.logo_url ? (
				<img className={styles.image} alt={t('operators:logo_alt')} src={singleItem.logo_url} />
			) : (
				DEFAULT_LOGO_MAPPING[activeTab]
			)}
		</div>
	),
	handleStatus: (singleItem) => (
		<div className={styles.title_black}>
			{singleItem?.status === 'active' ? (
				<div className={styles.event} style={{ backgroundColor: '#b4f3be' }}>{singleItem?.status}</div>
			) : (
				<div className={styles.event} style={{ backgroundColor: '#ffd0d0' }}>
					{singleItem?.status}
				</div>
			)}
		</div>
	),
	handleEdit: (singleItem) => (
		<Button
			size="lg"
			themeType="tertiary"
			onClick={() => {
				setShow(true);
				setEdit(true);
				setItem(singleItem);
			}}
		>
			<IcMEdit fill="var(--color-accent-orange-2)" />
		</Button>
	),
});

function Operators() {
	const { t } = useTranslation(['operators']);

	const [show, setShow] = useState(false);
	const [edit, setEdit] = useState(false);
	const [item, setItem] = useState({});
	const [activeTab, setActiveTab] = useState('airline');

	const {
		listData,
		loading,
		searchValue,
		setSearchValue,
		page,
		setPage,
		setFinalList,
		finalList,
		getLocationData,
	} = useGetListData(activeTab);

	const operator_options = operators(t);

	const airlineFields = [
		...operator_options.common_first, ...operator_options.airline, ...operator_options.common_second];
	const shippingLineFields = [
		...operator_options.common_first, ...operator_options.common_second];
	const otherFields = [
		...operator_options.common_first, ...operator_options.others, ...operator_options.common_second];

	const FIELDS_MAPPING = {
		airline       : airlineFields,
		shipping_line : shippingLineFields,
		others        : otherFields,
	};

	return (
		<div className={styles.container}>
			<Header
				setShow={setShow}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{show && (
				<OperatorsModal
					item={item}
					setItem={setItem}
					show={show}
					setShow={setShow}
					edit={edit}
					setEdit={setEdit}
					refetch={getLocationData}
					setPage={setPage}
					setFinalList={setFinalList}
					page={page}
				/>
			)}

			<CardList
				fields={FIELDS_MAPPING[activeTab]}
				data={listData}
				loading={loading}
				page={page}
				setPage={setPage}
				finalList={finalList}
				setFinalList={setFinalList}
				functions={functions(activeTab, setShow, setEdit, setItem, t)}
			/>
		</div>
	);
}

export default Operators;
