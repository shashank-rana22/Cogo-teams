import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import useGetFclMapStatistics from '../../../hooks/useGetFclMapStatistics';
import useGetSimplifiedGeometry from '../../../hooks/useGetSimplifiedGeometry';
import { getLowestHierarchy, getParentHierarchy } from '../../../utils/hierarchy-utils';

import SidePanel from './SidePanel';
import styles from './styles.module.css';

const Map = dynamic(() => import('./Map'), {
	ssr: false,
});

function MapView({ setView = () => {}, backView = '', globalFilters = {}, setGlobalFilters = () => {} }) {
	const [isFull, setIsFull] = useState(false);
	const [bounds, setBounds] = useState(null);
	const [hierarchy, setHierarchy] = useState({});
	const [activeId, setActiveId] = useState(null);
	const [locationFilters, setLocationFilters] = useState({
		origin      : { id: GLOBAL_CONSTANTS.country_ids.IN, type: 'country' },
		destination : null,
	});

	const {
		sort,
		page,
		setPage,
		setSort,
		activeList,
		setActiveList,
		accuracyMapping,
		data: mapStatisticsData,
		loading: accuracyLoading,
	} = useGetFclMapStatistics({
		locationFilters,
		globalFilters,
	});
	const { data, loading } = useGetSimplifiedGeometry({ type: 'country' });

	const handleBackHierarchy = (e) => {
		e.stopPropagation();
		const lowestHierarchy = getLowestHierarchy(hierarchy);
		const parent = getParentHierarchy(lowestHierarchy, hierarchy);
		setLocationFilters((prev) => ({
			...prev,
			destination: {
				id   : hierarchy?.[parent],
				type : parent.split('_')[GLOBAL_CONSTANTS.zeroth_index],
			},
		}));
		const newHierarchy = Object.keys(hierarchy).reduce((acc, key) => {
			if (key !== lowestHierarchy && hierarchy[key]) {
				acc[key] = hierarchy[key];
			}
			return acc;
		}, {});
		setActiveList([]);
		setActiveId(hierarchy[parent]);
		setHierarchy(newHierarchy);
	};

	return (
		<div className={styles.container}>
			<div className={styles.map}>
				<Map
					data={data}
					isFull={isFull}
					bounds={bounds}
					loading={loading}
					currentId={activeId}
					setBounds={setBounds}
					hierarchy={hierarchy}
					activeList={activeList}
					setCurrentId={setActiveId}
					setHierarchy={setHierarchy}
					setActiveList={setActiveList}
					accuracyMapping={accuracyMapping}
					locationFilters={locationFilters}
					setLocationFilters={setLocationFilters}
					handleBackHierarchy={handleBackHierarchy}
					accuracyList={mapStatisticsData?.list || []}
				/>
			</div>
			<SidePanel
				page={page}
				data={data}
				sort={sort}
				isFull={isFull}
				setSort={setSort}
				setPage={setPage}
				setView={setView}
				backView={backView}
				hierarchy={hierarchy}
				setIsFull={setIsFull}
				activeList={activeList}
				setActiveId={setActiveId}
				setHierarchy={setHierarchy}
				setActiveList={setActiveList}
				globalFilters={globalFilters}
				locationFilters={locationFilters}
				accuracyLoading={accuracyLoading}
				setGlobalFilters={setGlobalFilters}
				mapStatisticsData={mapStatisticsData}
				setLocationFilters={setLocationFilters}
				handleBackHierarchy={handleBackHierarchy}
			/>
		</div>
	);
}

export default MapView;
