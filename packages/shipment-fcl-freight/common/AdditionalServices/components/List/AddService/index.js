import React, { useState } from 'react';

import EmptyState from '../../../../EmptyState';
import AddRate from '../../AddRate';

import ChooseService from './ChooseService';
import styles from './styles.module.css';
import useList from './useList';
import ViewPrice from './ViewPrice';

function AddService({
	shipment_id,
	services,
	isSeller,
	refetch = () => {},
	show = false,
	setShow = () => {},
}) {
	const [showAddRate, setAddRate] = useState(null);
	const [showPrice, setShowPrice] = useState(null);

	const { list, loading, setFilters, filters, serviceCountTotal } = useList({
		shipment_id,
		services,
		show,
		isSeller,
	});

	if (!list?.length && !loading) {
		<EmptyState />;
	}

	return (
		<div className={styles.container}>
			{!showAddRate && !showPrice ? (
				<ChooseService
					setAddRate={setAddRate}
					isSeller={isSeller}
					list={list}
					loading={loading}
					setFilters={setFilters}
					filters={filters}
					setShow={setShow}
					setShowPrice={setShowPrice}
					serviceCountTotal={serviceCountTotal}
					services={services}
					refetch={refetch}
				/>
			) : null}
			{showAddRate ? (
				<AddRate
					isSeller={isSeller}
					item={showAddRate}
					setAddRate={setAddRate}
					setShow={setShow}
					refetch={refetch}
					filters={filters}
				/>
			) : null}
			{!showAddRate && showPrice ? (
				<ViewPrice
					showPrice={showPrice}
					setAddRate={setAddRate}
					setShowPrice={setShowPrice}
				/>
			) : null}
		</div>
	);
}

export default AddService;
