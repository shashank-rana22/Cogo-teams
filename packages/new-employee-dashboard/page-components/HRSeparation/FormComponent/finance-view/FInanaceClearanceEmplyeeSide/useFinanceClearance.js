import { useForm } from '@cogoport/forms';
import { useEffect, useState } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

import useGetFinanceClearanceProcessDetails from './useGetFinanceClearanceDetails';

const ZERO = 0;

const useFinanceClearance = ({ refetch }) => {
	const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
	const { data } = useGetFinanceClearanceProcessDetails();
	const [updateData, setUpdateData] = useState([]);
	const [totalRecoverableAmount, setTotalRecoverableAmount] = useState(ZERO);
	const [financeRecommendation, SetFinanceRecommendation] = useState({
		employee : false,
		fnf      : false,
	});

	const data1 = data?.finance_clearance || {};
	const { finance_clearance } = data1 || {};
	const { sub_process_detail_id, sub_process_data, is_complete } = finance_clearance || {};
	const { notes_shared_with_you = [], outstanding_amount_details = [] } = sub_process_data || {};
	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch });
	const onSubmit = (values) => {
		const OUTSTANDINDDETAILS = [];
		outstanding_amount_details.map((item) => (
			OUTSTANDINDDETAILS.push({
				cleared            : values[item?.registrationNumber] || false,
				business_name      : item?.businessName || '-',
				dues               : item?.dues || '-',
				thirtydays         : item?.openInvoiceAgeingBucket?.thirty?.ledgerAmount || '-',
				fortyfive          : item?.openInvoiceAgeingBucket?.fortyFive?.ledgerAmount || '-',
				totaloutstanding   : item?.totalOutstanding?.ledgerAmount || '-',
				onaccount          : item?.onAccount?.ledgerAmount || '-',
				openvoice          : item?.openInvoice?.ledgerAmount || '-',
				threesixtyfiveplus : item?.openInvoiceAgeingBucket?.threeSixtyFivePlus?.ledgerAmount || '-',
				threeSixtyFive     : item?.openInvoiceAgeingBucket?.threeSixtyFive?.ledgerAmount || '-',
				oneEighty          : item?.openInvoiceAgeingBucket?.oneEighty?.ledgerAmount || '-',
				ninety             : item?.openInvoiceAgeingBucket?.ninety?.ledgerAmount || '-',
				sixty              : item?.openInvoiceAgeingBucket?.sixty?.ledgerAmount || '-',
			})
		));
		const payload = {
			process_name     : 'finance_clearance',
			sub_process_detail_id,
			sub_process_data : {
				fnf_excel_sheet_url      : values.fnffile?.fileUrl || values.fnffile || '',
				outstaninddetails        : OUTSTANDINDDETAILS,
				update_fnf_status        : updateData,
				total_recoverable_amount : totalRecoverableAmount,
				additional_remarks       : values.notes,
				hold_fnf                 : financeRecommendation?.fnf || false,
				hold_employee            : financeRecommendation?.employee || false,
			},
		};

		updateApplication({ payload });
	};

	useEffect(() => {
		// setValue('feedback_rating', sub_process_data?.feedback_rating);
	}, [setValue, sub_process_data?.feedback_rating]);

	return {
		handleSubmit,
		onSubmit,
		control,
		errors,
		notes_shared_with_you,
		outstanding_amount_details,
		is_complete,
		watch,
		setUpdateData,
		updateData,
		setTotalRecoverableAmount,
		totalRecoverableAmount,
		SetFinanceRecommendation,
		financeRecommendation,
	};
};

export default useFinanceClearance;
