import { Loader } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import { OUTSTANDING_AMOUNT_KEYS } from '../../../../../constants/account-type';
import useGetQueryBuilder from '../../../../../hooks/useGetQueryBuilder';
import EmptyStateOutStanding from '../../../EmptyStateOutStanding';

import KamOrgData from './KamOrgData';
import KamOwners from './KamOwners';
import styles from './styles.module.css';

const DATA_LENGTH = 0;
function KamWiseData({
	selectedBarData = undefined,
	filterValues = {},
	barData = [],
	setKamOwnerId = () => {},
	pageNumber = 1,
	entityCode = '',
}) {
	const [filters, setFilters] = useState({
		page: 1,
	});
	const { data, loading } = useGetQueryBuilder({
		selectedBarData,
		filterValues,
		path         : 'kam_owner_list',
		barGraphData : barData,
		pageNumber,
		entityCode,
	});

	const { list } = data || {};

	const [kamOwner, setkamOwner] = useState();

	const { indexValue, id } = selectedBarData || {};
	const { bifurcation_type } = filterValues || {};

	useEffect(() => {
		if (list && (list || []).length > DATA_LENGTH) {
			setkamOwner('all');
			setFilters((prevFilters) => ({ ...prevFilters, page: 1 }));
		} else {
			setkamOwner();
		}
	}, [list, setFilters]);

	const handleKamId = (val) => {
		const VALUE = [];
		VALUE.push(val);
		setKamOwnerId(VALUE);
		setkamOwner(val);
		setFilters({ ...filters, page: 1 });
	};

	const renderDate = () => {
		if (indexValue) {
			return indexValue;
		}

		return '';
	};

	function RenderKamData() {
		if (loading) {
			return (
				<div className={styles.loader}>
					<Loader themeType="primary" style={{ height: 30, width: 30 }} />
				</div>
			);
		}

		if (!loading && isEmpty(list || [])) {
			return (
				<div className={styles.container}>
					<EmptyStateOutStanding width={400} height={200} />
				</div>
			);
		}
		return (
			<>
				<KamOwners list={list} handleKamId={handleKamId} kamOwner={kamOwner} />

				<div className={styles.divider} />
				<KamOrgData
					kamOwner={kamOwner}
					filterValues={filterValues}
					selectedBarData={selectedBarData}
					filters={filters}
					setFilters={setFilters}
					barData={barData}
					entityCode={entityCode}
				/>
			</>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				KAM wise Data
				{' '}
				<span>
					{id
						&& `${
							bifurcation_type === 'ageing_bucket'
								? `(${OUTSTANDING_AMOUNT_KEYS[id]})`
								: `(${startCase(id)})`
						}`}
					{' '}
					{indexValue && `(${renderDate()})`}
				</span>
				{' '}
			</div>
			<RenderKamData />
		</div>
	);
}

export default KamWiseData;
