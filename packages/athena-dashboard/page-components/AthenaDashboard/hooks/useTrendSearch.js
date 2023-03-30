import { useForm } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAthenaRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useTrendSearch = (item = {}) => {
	const router = useRouter();
	const [searchValue, setSearchValue] = useState('');
	const [responsevalue, setResponsevalue] = useState([]);
	const [hscodeArr, setHscodeArr] = useState([]);

	const formProps = useForm({
		defaultValues: {
			trade_direction : item.trade_direction || 'import',
			hs_code         : item.hs_code || 'select_codes_value',
		},
	});

	const { control, handleSubmit } = formProps;

	const [{ loading = false, data: responseData = {} }, trigger] = useAthenaRequest({
		url    : 'athena/hscodes_by_commodity_name',
		method : 'post',
	}, { manual: true });

	const handleClick = async () => {
		setHscodeArr([]);
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

	const getReport = (formValues) => {
		if (formValues.trade_direction && hscodeArr) {
			router.push(`/athena-dashboard/report?shipment_type=${formValues.trade_direction}&hscodes=${hscodeArr}`, `/athena-dashboard/report?shipment_type=${formValues.trade_direction}&hscodes=${hscodeArr}`);
		}
	};

	return {
		searchValue,
		setSearchValue,
		responsevalue,
		setResponsevalue,
		hscodeArr,
		setHscodeArr,
		loading,
		handleSubmit,
		handleClick,
		getReport,
		control,
	};
};
export default useTrendSearch;
