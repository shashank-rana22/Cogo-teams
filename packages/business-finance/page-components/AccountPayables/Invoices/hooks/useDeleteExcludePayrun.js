import { Checkbox, Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../../../commons/toastApiError.ts';

import styles from './styles.module.css';

const ELEMENT_NOT_FOUND = -1;

const useDeleteExcludePayrun = ({ refetch = () => { }, setApiData = () => {}, apiData = {}, type = '' }) => {
	const { push } = useRouter();

	const { user_data: userData = {}, query: urlQuery = {} } = useSelector(({ profile, general }) => ({
		user_data: profile || {}, query: general.query,
	}));

	const {
		payrun = '',
	} = urlQuery || {};
	const { user = '', session_type: sessionType = '' } = userData || {};
	const { id: userId = '', name = '' } = user || {};
	const [{ loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/payrun/suppliers',
			method  : 'delete',
			authKey : 'delete_purchase_payrun_suppliers',
		},
		{ manual: true },
	);

	const onExclude = async () => {
		const { list: dataList = [] } = apiData || {};
		const orgids = dataList.filter((item) => (item.checked)).map((item) => (item.organizationId));
		try {
			const payload = {
				payrunId        : payrun,
				organizationIds : orgids,
				performedBy     : userId,
				performedByType : sessionType,
				performedByName : name,
			};
			await trigger({ data: payload });

			if (payrun && type === 'audit') {
				push(
					'/business-finance/account-payables/audit/[payrun_id]',
					`/business-finance/account-payables/audit/${payrun}`,
				);
			} else {
				push(
					'/business-finance/account-payables/[active_tab]',
					'/business-finance/account-payables/payruns',
				);
			}

			Toast.error('Deleted Sucessfully');
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	const onChangeTableHeaderCheckbox = (event) => {
		setApiData((prevData) => {
			const { list = [] } = prevData || {};
			const newList = list.map((item) => ({
				...item,
				checked: event.target.checked,
			}));
			return { ...prevData, list: newList };
		});
	};

	function GetTableHeaderCheckbox() {
		const { list: dataList = [] } = apiData || {};
		const isCheckedLength = dataList.filter((value) => value?.checked).length;
		const isAllRowsChecked = isCheckedLength === dataList.length;
		return (
			<Checkbox
				checked={isAllRowsChecked && !loading}
				onChange={onChangeTableHeaderCheckbox}
			/>
		);
	}

	const onChangeTableBodyCheckbox = (itemData = {}) => {
		const { organizationId = '' } = itemData || {};
		setApiData((prevData) => {
			const index = (prevData.list || []).findIndex(
				(item) => item.organizationId === organizationId,
			);
			if (index !== ELEMENT_NOT_FOUND) {
				const newList = [...prevData.list];
				newList[index] = {
					...newList[index],
					checked: !newList[index].checked,
				};
				return {
					...prevData,
					list: newList,
				};
			}
			return prevData;
		});
	};
	function GetTableBodyCheckbox(itemData = {}) {
		const { organizationId = '' } = itemData || {};
		const { list = [] } = apiData || {};
		const isChecked = list.find(
			(item) => item?.organizationId === organizationId,
		)?.checked;

		return (
			<div className={styles.checkbox_style}>
				<Checkbox
					checked={isChecked}
					onChange={() => onChangeTableBodyCheckbox(itemData)}
				/>
			</div>
		);
	}
	return ({
		GetTableBodyCheckbox,
		onChangeTableBodyCheckbox,
		GetTableHeaderCheckbox,
		onChangeTableHeaderCheckbox,
		loading,
		onExclude,
	});
};

export default useDeleteExcludePayrun;
