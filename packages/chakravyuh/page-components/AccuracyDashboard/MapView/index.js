import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

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
	const [locationFilters, setLocationFilters] = useState({
		origin      : { id: GLOBAL_CONSTANTS.country_ids.IN, type: 'country' },
		destination : null,
	});
	const [activeList, setActiveList] = useState([]);

	const { data, loading } = useGetSimplifiedGeometry({ type: 'country', setActiveList });

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
		setHierarchy(newHierarchy);
		setActiveList([]);
	};

	return (
		<div className={styles.container}>
			<div className={`${styles.map}`}>
				<Map
					isFull={isFull}
					data={data}
					loading={loading}
					bounds={bounds}
					setBounds={setBounds}
					locationFilters={locationFilters}
					setLocationFilters={setLocationFilters}
					activeList={activeList}
					setActiveList={setActiveList}
					hierarchy={hierarchy}
					setHierarchy={setHierarchy}
					handleBackHierarchy={handleBackHierarchy}
				/>
			</div>
			<SidePanel
				setIsFull={setIsFull}
				isFull={isFull}
				data={data}
				globalFilters={globalFilters}
				setGlobalFilters={setGlobalFilters}
				setView={setView}
				backView={backView}
				locationFilters={locationFilters}
				setLocationFilters={setLocationFilters}
				activeList={activeList}
				setActiveList={setActiveList}
				hierarchy={hierarchy}
				setHierarchy={setHierarchy}
				handleBackHierarchy={handleBackHierarchy}
			/>
		</div>
	);
}

export default MapView;
