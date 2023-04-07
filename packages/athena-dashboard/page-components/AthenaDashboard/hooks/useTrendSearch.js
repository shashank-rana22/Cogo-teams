import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAthenaRequest } from '@cogoport/request';
import { useState } from 'react';

const useTrendSearch = (item = {}) => {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');
	const [hscodeArr, setHscodeArr] = useState([]);

	const formProps = useForm({
		defaultValues: {
			trade_direction : item.trade_direction || 'import',
			hs_code         : item.hs_code || 'select_codes_value',
		},
	});

	const { control, handleSubmit } = formProps;

	const [{ loading = false, data: responseData = [] }, trigger] = useAthenaRequest({
		url    : 'hscodes_by_commodity_name',
		method : 'post',
	}, { manual: true });

	const handleClick = () => {
		trigger({
			data: {
				filters: { commodity_name: searchValue },
			},
		});
	};

	const getReport = (formValues) => {
		if (formValues.trade_direction && hscodeArr) {
			router.push(
				`/athena-dashboard/report?shipment_type=${formValues.trade_direction}&hscodes=${hscodeArr}`,
				`/athena-dashboard/report?shipment_type=${formValues.trade_direction}&hscodes=${hscodeArr}`,
			);
		}
	};

	const addCheckedHSCodes = (e, newItem) => {
		let arr = [...hscodeArr];

		if (e.target.checked) {
			arr = [...hscodeArr, newItem.hs_code];
		} else if (arr.includes(newItem)) {
			const index = arr.indexOf(newItem.hs_code);

			arr.splice(index, 1);
		}

		setHscodeArr(arr);
	};

	return {
		searchValue,
		setSearchValue,
		responseData,
		hscodeArr,
		setHscodeArr,
		loading,
		handleSubmit,
		handleClick,
		getReport,
		control,
		addCheckedHSCodes,
	};
};
export default useTrendSearch;
