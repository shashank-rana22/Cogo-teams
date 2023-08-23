/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import { Toast, Checkbox } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

// import UserContext from '../components/UserContext';
// import { CREATE_OVER_SEAS_CONFIG_VN } from '../configurations/invoices/create-over-seas-table-vn';
import { SUPPLIER_CONFIG } from '../CreatePayrun/Configurations/supplierConfig';
import { VIEW_SELECTED_CONFIG } from '../CreatePayrun/Configurations/viewSelectedConfig';
// import { VIEW_SELECTED_VN } from '../configurations/payruns/view-selected-table-vn';
import { CREATE_OVER_SEAS_CONFIG } from '../OverSeasAgent/Configurations/createOverSeasConfig';

const API_DATA_VARIABLE_ZERO = 0;
const API_DATA_VARIABLE_ONE = 1;
const INCREEMENT_BY = 1;
const VALUE_ZERO = 0;
const POSITIVE_NO_CHECK = -1;

const useGetInvoiceSelection = ({ sort }) => {
	const { push } = useRouter();

	const {
		query: urlQuery,
		performedBy,
		performedByType,
		performedByName,
	} = useSelector(({ general, profile }) => ({
		query           : general.query,
		performedBy     : profile.user.id,
		performedByType : profile.session_type,
		performedByName : profile.user.name,
	}));

	const [apiData, setApiData] = useState();
	const [apiTdsData, setApiTdsData] = useState();
	const [viewSelectedInvoice, setViewSelectedInvoice] = useState(false);
	// const { country } = useContext(UserContext) || {};

	const listInvoices = useRequestBf(
		{
			url     : '/purchase/payable-bill/list',
			method  : 'get',
			authKey : 'get_purchase_payable_bill_list',
		},
		{ manual: false },
	);

	const listSelectedInvoice =	useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'get',
			authKey : 'get_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const addInvoiceToSelectedAPI = useRequestBf(
		{
			url     : '/purchase/payrun',
			method  : 'post',
			authKey : 'post_purchase_payrun',
		},
		{ manual: false },
	);

	const delete_payrun_invoice = 	useRequestBf(
		{
			url     : '/purchase/payrun-bill',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_bill',
		},
		{ manual: false },
	);

	const api = viewSelectedInvoice ? listSelectedInvoice : listInvoices;

	const configures = SUPPLIER_CONFIG;

	// const createOverSeasConfigMapping = {
	// 	IN : CREATE_OVER_SEAS_CONFIG,
	// 	VN : CREATE_OVER_SEAS_CONFIG_VN,
	// };

	// const viewSelectedConfigMapping = {
	// 	IN : VIEW_SELECTED_CONFIG,
	// 	VN : VIEW_SELECTED_VN,
	// };

	const createOverSeasConfig = CREATE_OVER_SEAS_CONFIG;
	const viewSelectedConfig = VIEW_SELECTED_CONFIG;
	const config = viewSelectedInvoice
		? viewSelectedConfig
		: createOverSeasConfig;
	const { query = '', debounceQuery } = useDebounceQuery();

	const {
		entity = '',
		currency: queryCurr = '',
		payrun = '',
		organizationId = '',
		services = '',
		payrun_type = '',
	} = urlQuery || {};

	const [globalFilters, setGlobalFilters] = useState({
		pageIndex   : 1,
		pageSize    : 10,
		entity,
		currency    : queryCurr,
		invoiceView : 'coe_accepted',
	});
	const { search, dueDate, invoiceDate, uploadDate, ...rest } = globalFilters;

	useEffect(() => {
		const newData = { ...api[API_DATA_VARIABLE_ZERO]?.data };
		if (newData.list) {
			newData.list = newData?.list?.map((item) => ({
				...item,
				payableValue       : item?.payableAmount,
				tdsValue           : item?.tdsAmount,
				inputAmount        : item?.payableAmount,
				constPayableAmount : item?.invoiceAmount,
			}));
		}

		setApiData(newData);
		setApiTdsData(newData);
	}, [JSON.stringify(api[API_DATA_VARIABLE_ZERO]?.data)]);

	useEffect(() => {
		debounceQuery(search);
	}, [search]);

	const refetch = () => {
		const q = query || undefined;
		api[API_DATA_VARIABLE_ONE]({
			params: {
				payrunId           : payrun,
				entityCode         : entity,
				currency           : queryCurr,
				performedBy,
				performedByType,
				performedByName,
				organizationId,
				serviceType        : services,
				...(rest || {}),
				startDate          : dueDate?.startDate || undefined,
				endDate            : dueDate?.endDate || undefined,
				fromBillDate       : invoiceDate?.startDate || undefined,
				toBillDate         : invoiceDate?.endDate || undefined,
				fromUploadBillDate : uploadDate?.startDate || undefined,
				toUploadBillDate   : uploadDate?.endDate || undefined,
				q,
				...sort,
			},
		});
	};
	const resetPage = () => {
		setGlobalFilters({
			pageIndex   : 1,
			pageSize    : 20,
			entity,
			currency    : queryCurr,
			invoiceView : 'coe_accepted',
		});
	};
	const deleteInvoices = async (id, handleModal) => {
		try {
			await delete_payrun_invoice.trigger({
				data: {
					id,
					performedBy,
					performedByType,
					performedByName,
				},
			});
			handleModal();
			Toast.success('Invoice deleted successfully');
			refetch();
		} catch (e) {
			Toast.error(e?.data?.message);
		}
	};
	const submitSelectedInvoices = async () => {
		const { list = [] } = apiData ?? {};
		const SELECTED_INVOICE = [];

		for (let i = 0; i < list.length; i += INCREEMENT_BY) {
			const data = list?.[i];

			const {
				tdsValue = 0,
				checked = false,
				id = '',
				bankDetail = undefined,
				invoiceNumber = ' ',
				inputAmount = 0,
				invoiceType,
			} = data ?? {};

			if (checked) {
				if (!bankDetail) { return Toast.error(`Select Bank for Invoice Number ${invoiceNumber}`); }

				const {
					bank_account_number = '',
					accountNo = '',
					bankName = '',
					branchName = '',
					ifscCode = '',
					ifsc_number = '',
					branch_name = '',
					bank_name = '',
					imageUrl = '',
					bankId,
					beneficiaryName,
				} = bankDetail || {};

				const formattedBank = {
					bankName        : bank_name || bankName,
					branchName      : branch_name || branchName,
					ifscCode        : ifsc_number || ifscCode,
					accountNo       : bank_account_number || accountNo,
					beneficiaryName : beneficiaryName || undefined,
					imageUrl,
					bankId,
				};

				SELECTED_INVOICE.push({
					billId        : id,
					tdsAmount     : +tdsValue,
					payableAmount : +inputAmount,
					bankDetail    : formattedBank,
					invoiceType,
				});
			}
		}
		try {
			const res = await addInvoiceToSelectedAPI[API_DATA_VARIABLE_ONE]({
				data: {
					list       : [...SELECTED_INVOICE],
					id         : urlQuery?.payrun,
					entityCode : urlQuery?.entity,
					currency   : urlQuery?.currency,
					performedBy,
					performedByType,
					performedByName,
				},
			});

			if (res?.data?.message) {
				Toast.error(res.data.message);
			} else {
				Toast.success('Invoice added to Payrun Successfully');
				refetch();
			}
		} catch (e) {
			Toast.error(e?.data?.message);
		}
		return null;
	};
	useEffect(() => {
		refetch();
	}, [
		JSON.stringify(rest),
		dueDate,
		invoiceDate,
		uploadDate,
		query,
		viewSelectedInvoice,
		sort,
	]);

	const onChangeTableHeaderCheckbox = (event) => {
		setApiData((p) => {
			const newValue = { ...p };
			const len = newValue?.list?.length || VALUE_ZERO;
			for (let i = 0; i < len; i += INCREEMENT_BY) newValue.list[i].checked = event;
			return newValue;
		});
	};
	function GetTableHeaderCheckbox() {
		const isCheckedLength = apiData?.list?.filter(
			(value) => value?.checked,
		)?.length;
		const isAllRowsChecked = isCheckedLength === api?.data?.list?.length;
		const isSemiRowsChecked = isCheckedLength > VALUE_ZERO;

		return (
			<Checkbox
				themeType="white"
				indeterminate={!!isSemiRowsChecked && !api?.loading}
				checked={isAllRowsChecked && !api?.loading}
				onChange={(x) => onChangeTableHeaderCheckbox(x)}
			/>
		);
	}

	const onChangeTableBodyCheckbox = (itemData) => {
		setApiData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			if (index !== POSITIVE_NO_CHECK) {
				newValue.list[index] = {
					...itemData,
					checked: !itemData?.checked,
				};
			}
			return newValue;
		});
	};

	function GetTableBodyCheckbox(itemData) {
		const isChecked = apiData?.list?.find(
			(item) => item?.id === itemData?.id,
		).checked;

		return (
			<Checkbox
				themeType="white"
				checked={isChecked}
				onChange={() => onChangeTableBodyCheckbox(itemData)}
			/>
		);
	}

	const setEditedValue = (itemData, value, key, checked = false) => {
		setApiData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			const oldDataIndex = listInvoices?.data?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			if (index !== POSITIVE_NO_CHECK) {
				newValue.list[index] = {
					...itemData,
					checked,
					oldBankData: { ...listInvoices?.data?.list[oldDataIndex].bankDetail },
				};
				newValue.list[index][key] = value;
			}
			return newValue;
		});
	};
	const setRestValue = (
		itemData,
		value,
		key,
		editable = false,
		checked = true,
	) => {
		setApiData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			if (index !== POSITIVE_NO_CHECK) {
				newValue.list[index] = {
					...itemData,
					editable,
					checked,
				};
				newValue.list[index][key] = value;
			}

			return newValue;
		});
	};

	const setEditedTdsValue = (itemData, value, key, paidAmountValue) => {
		setApiTdsData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			if (index !== POSITIVE_NO_CHECK) {
				newValue.list[index] = {
					...itemData,
					payableAmount : paidAmountValue,
					inputAmount   : paidAmountValue,
				};
				newValue.list[index][key] = value;
			}
			return newValue;
		});
	};

	const setRestTds = (itemData, value, key) => {
		setApiTdsData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			if (index !== POSITIVE_NO_CHECK) {
				newValue.list[index] = {
					...itemData,
					payableAmount : itemData?.payableValue,
					inputAmount   : itemData?.payableValue,
					tdsEditable   : false,
				};
				newValue.list[index][key] = value;
			}
			return newValue;
		});
	};

	const setEditeable = (itemData) => {
		setApiData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			if (index !== POSITIVE_NO_CHECK) {
				newValue.list[index] = {
					...itemData,
					editable : true,
					checked  : true,
				};
			}
			return newValue;
		});
	};
	const setEditeableTds = (itemData) => {
		setApiTdsData((p) => {
			const newValue = { ...p };
			const index = newValue?.list?.findIndex(
				(item) => item?.id === itemData?.id,
			);
			if (index !== POSITIVE_NO_CHECK) {
				newValue.list[index] = {
					...itemData,
					tdsEditable : true,
					checked     : true,
				};
			}
			return newValue;
		});
	};

	const onClear = () => {
		setGlobalFilters({
			pageIndex   : 1,
			pageSize    : 20,
			entity,
			currency    : queryCurr,
			invoiceView : 'coe_accepted',
		});
	};
	const filtervalue = Object.values(globalFilters);

	const filterClear = filtervalue.filter((item) => {
		if (Array.isArray(item) && isEmpty(item)) {
			return false;
		}
		return item !== undefined && item !== '';
	});
	const goBack = () => {
		if (!viewSelectedInvoice) {
			push(
				'/business-finance/account-payables/[active_tab]',
				'/business-finance/account-payables/invoices',
			);
		} else setViewSelectedInvoice(false);
	};
	return {
		config,
		refetch,
		invoiceData   : apiData,
		tdsData       : apiTdsData,
		createloading : addInvoiceToSelectedAPI?.loading,
		onClear,
		filterClear,
		listSelectedInvoice,
		configures,
		globalFilters,
		setGlobalFilters,
		viewSelectedInvoice,
		setViewSelectedInvoice,
		submitSelectedInvoices,
		goBack,
		resetPage,
		GetTableHeaderCheckbox,
		GetTableBodyCheckbox,
		setEditedValue,
		setEditeableTds,
		setEditeable,
		setRestTds,
		delete_payrun_invoice,
		setEditedTdsValue,
		setRestValue,
		deleteInvoices,
		loading       : api[API_DATA_VARIABLE_ZERO]?.loading,
		payrun_type,
		currency      : urlQuery?.currency,
	};
};

export default useGetInvoiceSelection;
