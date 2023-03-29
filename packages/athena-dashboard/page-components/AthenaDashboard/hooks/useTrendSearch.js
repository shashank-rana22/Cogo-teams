import { useRouter } from '@cogoport/next';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useTrendSearch = () => {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');
	const [responsevalue, setResponsevalue] = useState([]);
	const [hscodeArr, setHscodeArr] = useState([]);
	const [shipmentType, setShipmentType] = useState(['import']);

	const [{ loading = false, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'athena/hscodes_by_commodity_name',
		method : 'post',
	}, { manual: true });

	const handleClick = async () => {
		await trigger({
			data: {
				filters: { commodity_name: searchValue },
			},
		});
	};

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setResponsevalue(responseData.list);
		}
	}, [responseData]);

	const hidetext = (hscodeArrLength, flag) => {
		const rect_text = document.getElementById('hidetext');
		const build_report_button = document.getElementById('buildreport');
		const clear_all_button = document.getElementById('clearall');
		const selected_hscode_text = document.getElementById('selectedhscode');
		if (flag === 1 && hscodeArrLength + 1 > 0) {
			rect_text.style.display = 'None';
			build_report_button.style.display = 'block';
			clear_all_button.style.display = 'block';
			selected_hscode_text.style.display = 'block';
		} else if (hscodeArrLength - 1 === 0) {
			rect_text.style.display = 'block';
			build_report_button.style.display = 'None';
			clear_all_button.style.display = 'None';
			selected_hscode_text.style.display = 'None';
		}
	};
	const reRender = () => {
		const rect_text = document.getElementById('hidetext');
		const build_report_button = document.getElementById('buildreport');
		const clear_all_button = document.getElementById('clearall');
		const selected_hscode_text = document.getElementById('selectedhscode');
		rect_text.style.display = 'block';
		build_report_button.style.display = 'None';
		clear_all_button.style.display = 'None';
		selected_hscode_text.style.display = 'None';
	};

	const getReport = () => {
		if (shipmentType && hscodeArr) {
			router.push(`/athena-dashboard/report?shipment_type=${shipmentType}&hscodes=${hscodeArr}`, `/athena-dashboard/report?shipment_type=${shipmentType}&hscodes=${hscodeArr}`);
		}
	};

	const handleClear = () => {
		setHscodeArr([]);
		reRender();
	};

	return {
		searchValue,
		setSearchValue,
		responsevalue,
		hscodeArr,
		setHscodeArr,
		setShipmentType,
		loading,
		handleClick,
		hidetext,
		reRender,
		getReport,
		handleClear,
	};
};
export default useTrendSearch;
