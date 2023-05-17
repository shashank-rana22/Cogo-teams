// import { useRequest } from '@cogoport/request';
// import { useEffect, useState, useCallback } from 'react';

// const useGetNetwork = ({ referrer_id }) => {
// 	const [networkData, setNetworkData] = useState();
// 	const [netWorkLoader, setNetWorkLoader] = useState(true);
// 	const [{ loading }, trigger] = useRequest({
// 		url    : '/get_referrer_network',
// 		method : 'get',
// 	}, { manual: true });

// 	const addToOrgChart = useCallback(async (orgChart, newArr, targetid) => {
// 		if (orgChart.referee_id === targetid) {
// 			orgChart.children.push(...newArr);
// 			return;
// 		}
// 		const children = orgChart.children || [];
// 		children.forEach((child) => addToOrgChart(child, newArr, targetid));
// 	}, []);

// 	function addDirectChild(orgChart) {
// 		orgChart.children.forEach((child) => {
// 			const childData = child;
// 			childData.direct_child = true;
// 		});

// 		return orgChart;
// 	}

// 	const referrerNetwork = useCallback(async (node_id) => {
// 		try {
// 			const res = await trigger({
// 				params: {
// 					referrer_id,
// 					selected_node_id: node_id,
// 				},
// 			});

// 			if (node_id) {
// 				const newArr = res?.data?.data?.children;
// 				addToOrgChart(networkData, newArr, node_id);
// 			} else {
// 				const directChildData = addDirectChild(res?.data?.data);
// 				setNetworkData(directChildData);
// 			}
// 			setNetWorkLoader(false);
// 		} catch (error) {
// 			console.log(error);
// 			setNetWorkLoader(false);
// 		}
// 	}, [addToOrgChart, networkData, referrer_id, trigger]);

// 	useEffect(() => {
// 		if (referrer_id) {
// 			referrerNetwork();
// 		}
// 	}, [referrerNetwork, referrer_id]);

// 	return {
// 		data: networkData,
// 		loading,
// 		referrerNetwork,
// 		netWorkLoader,
// 	};
// };

// export default useGetNetwork;

import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetNetwork = ({ referrer_id = '' }) => {
	const [networkData, setNetworkData] = useState();
	const [netWorkLoader, setNetWorkLoader] = useState(true);

	const [{ loading }, trigger] = useRequest({
		url    : '/get_referrer_network',
		method : 'get',
	}, { manual: true });

	function addToOrgChart(orgChart, newArr, targetid) {
		if (orgChart.referee_id === targetid) {
			orgChart.children.push(...newArr);
			return;
		}

		const children = orgChart.children || [];
		children.forEach((child) => addToOrgChart(child, newArr, targetid));
	}

	function addDirectChild(orgChart) {
		orgChart.children.forEach((child) => {
			const childData = child;
			childData.direct_child = true;
		});

		return orgChart;
	}

	const referrerNetwork = async (node_id) => {
		try {
			const res = await trigger({
				params: {
					referrer_id,
					selected_node_id: node_id,
				},
			});

			if (node_id) {
				const newArr = res?.data?.data?.children;
				addToOrgChart(networkData, newArr, node_id);
			} else {
				const directChildData = addDirectChild(res?.data?.data);
				setNetworkData(directChildData);
			}
			setNetWorkLoader(false);
		} catch (error) {
			console.log(error);
			setNetWorkLoader(false);
		}
	};

	useEffect(() => {
		referrerNetwork();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		data: networkData,
		loading,
		referrerNetwork,
		netWorkLoader,
	};
};

export default useGetNetwork;
