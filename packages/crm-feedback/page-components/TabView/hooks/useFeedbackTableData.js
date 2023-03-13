// const {format} from '@cogoport/utils/';

import { ButtonIcon, Tooltip, Checkbox } from '@cogoport/components';
import { IcMView } from '@cogoport/icons-react';
import { useAllocationRequest, useRequest } from '@cogoport/request';
import { format, startCase, isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';

import styles from '../styles.module.css';

const useFeedbackTableData = () => {
	// const [selectAll, setSelectAll] = useState(false);
	// const [checkedRowsId, setCheckedRowsId] = useState([]);

	// const [filters, setFilters] = useState({});

	// HAVE TO REMOVE THIS DUMMY DATA
	// const data1 = [
	// 	{
	// 		id                   : 'something1',
	// 		organization         : 'AB Logistics Pvt Ltd.',
	// 		cogo_entity          : 'India',
	// 		type                 : 'Account Information',
	// 		sub_type             : 'Email',
	// 		current_data         : 'anmolbansal@gmail.com',
	// 		feedback             : 'Email is Incorrect',
	// 		feedback_proof_url   : 'https://www.google.com/',
	// 		correction           : 'abanmolbansal5@gmail.com',
	// 		correction_proof_url : 'https://www.google.com/cogoport',
	// 		createdDate          : '01 March 2023',
	// 		kam_manager          : 'Parth Samnani',
	// 		kam                  : 'Mohit Nagar',
	// 	},
	// 	{
	// 		id                   : 'something2',
	// 		organization         : 'AB Logistics Pvt Ltd.',
	// 		cogo_entity          : 'India',
	// 		type                 : 'Account Information',
	// 		sub_type             : 'Email',
	// 		current_data         : 'anmolbansal@gmail.com',
	// 		feedback             : 'Email is Incorrect',
	// 		feedback_proof_url   : 'https://www.google.com/',
	// 		correction           : 'abanmolbansal5@gmail.com',
	// 		correction_proof_url : 'https://www.google.com/cogoport',
	// 		createdDate          : '01 March 2023',
	// 		kam_manager          : 'Parth Samnani',
	// 		kam                  : 'Mohit Nagar',
	// 	},
	// 	{
	// 		id                   : 'something3',
	// 		organization         : 'AB Logistics Pvt Ltd.',
	// 		cogo_entity          : 'India',
	// 		type                 : 'Account Information',
	// 		sub_type             : 'Email',
	// 		current_data         : 'anmolbansal@gmail.com',
	// 		feedback             : 'Email is Incorrect',
	// 		feedback_proof_url   : 'https://www.google.com/',
	// 		correction           : 'abanmolbansal5@gmail.com',
	// 		correction_proof_url : 'https://www.google.com/cogoport',
	// 		createdDate          : '01 March 2023',
	// 		kam_manager          : 'Parth Samnani',
	// 		kam                  : 'Mohit Nagar',
	// 	},
	// 	{
	// 		id                   : 'something4',
	// 		organization         : 'AB Logistics Pvt Ltd.',
	// 		cogo_entity          : 'India',
	// 		type                 : 'Account Information',
	// 		sub_type             : 'Email',
	// 		current_data         : 'anmolbansal@gmail.com',
	// 		feedback             : 'Email is Incorrect',
	// 		feedback_proof_url   : 'https://www.google.com/',
	// 		correction           : 'abanmolbansal5@gmail.com',
	// 		correction_proof_url : 'https://www.google.com/cogoport',
	// 		createdDate          : '01 March 2023',
	// 		kam_manager          : 'Parth Samnani',
	// 		kam                  : 'Mohit Nagar',
	// 	},
	// ];
	// HAVE TO REMOVE THIS DUMMY DATA

	// API CALL

	// const { general } = useSelector((state) => state || {});

	// console.log('general:::', general);

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {},
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		// scope   : 'allocation',
		params,
	}, { manual: false });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// const onChangeParams = useCallback((values = {}) => {
	// 	setParams((previousState) => ({
	// 		...previousState,
	// 		...values,
	// 	}));
	// });

	// const getListTable = useCallback(() => {
	// 	trigger({
	// 		params: {
	// 			...params,
	// 			filters: { ...params?.filters, ...filters },
	// 		},
	// 	});
	// }, [filters, params, trigger]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect(() => onChangeParams({ page: 1 }), [filters]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect(() => getListTable(), [params]);

	// const resetFilters = {
	// 	cogo_entity  : undefined,
	// 	organization : undefined,
	// 	kam_manager  : undefined,
	// 	kam          : undefined,
	// 	date         : undefined,
	// };

	// const onChangeFilters = (values) => {
	// 	setFilters((previousState) => ({
	// 		// ...getFilter(null),
	// 		...previousState,
	// 		...values,
	// 	}));
	// };

	// const onResetFilters = () => {
	// 	setFilters((previousState) => ({
	// 		// ...getFilter(undefined),
	// 		...previousState,
	// 		...resetFilters,
	// 	}));
	// };

	const { list = [], ...paginationData } = data || {};

	console.log('LIST::', list);
	console.log('pagination::', paginationData);

	// const {
	// 	id,
	// 	organization,
	// 	source_type: type,
	// 	feedback_parameter: sub_type,
	// 	feedback_parameter_value: current_data,
	// } = list;

	// console.log('One id::', list.id);
	// console.log('One Entry::', id, organization, type, sub_type, current_data);

	// const currentPageListIds = useMemo(() => list?.map(({ id }) => id), [list]);

	// const selectAllHelper = (listArgument = []) => {
	// 	const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));
	// 	if (isRowsChecked !== selectAll) {
	// 		setSelectAll(isRowsChecked);
	// 	}
	// };

	// useEffect(() => {
	// 	if (isEmpty(currentPageListIds)) {
	// 		return;
	// 	}

	// 	selectAllHelper(checkedRowsId);
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [currentPageListIds]);

	// const onChangeBodyCheckbox = (event, id) => {
	// 	setCheckedRowsId((previousIds) => {
	// 		let newCheckedIds = [];

	// 		if (event.target.checked) {
	// 			newCheckedIds = [...previousIds, id];
	// 		} else {
	// 			newCheckedIds = previousIds.filter((selectedId) => selectedId !== id);
	// 		}

	// 		selectAllHelper(newCheckedIds);

	// 		return newCheckedIds;
	// 	});
	// };

	// const onChangeTableHeadCheckbox = (event) => {
	// 	setCheckedRowsId((previousIds) => {
	// 		let newCheckedRowsIds = [...previousIds];

	// 		if (event.target.checked) {
	// 			newCheckedRowsIds = [...newCheckedRowsIds, ...currentPageListIds];
	// 		} else {
	// 			newCheckedRowsIds = previousIds.filter((id) => !currentPageListIds.includes(id));
	// 		}

	// 		setSelectAll(event.target.checked);

	// 		return [...new Set(newCheckedRowsIds)];
	// 	});
	// };

	const columns = [
		{
			id  : 'checkbox',
			key : 'checkbox',
			Header:
	<div>
		<Checkbox
			// checked={selectAll}
			// onChange={(event) => onChangeTableHeadCheckbox(event)}
			className={styles.select_all_checkbox}
		/>
	</div>,
			accessor: ({ id = '' }) => (
				<div>
					<Checkbox />
				</div>
			),
		},
		{
			Header   : <div>ORGANIZATION</div>,
			key      : 'organization',
			id       : 'organization',
			accessor : ({ organization = '' }) => (
				<section className={styles.table_cell}>
					{organization?.business_name || '__'}
				</section>
			),
		},
		{
			Header   : <div>COGO-ENTITY</div>,
			key      : 'cogo_entity',
			id       : 'cogo_entity',
			accessor : ({ cogo_entity = '' }) => (
				<section className={styles.table_cell}>
					{cogo_entity || '__'}
				</section>
			),
		},
		{
			Header   : <div>TYPE</div>,
			key      : 'type',
			id       : 'type',
			accessor : ({ source_type = '' }) => (
				<section className={styles.table_cell}>
					{startCase(source_type) || '__'}
				</section>
			),
		},
		{
			Header   : <div>SUB-TYPE</div>,
			key      : 'sub_type',
			id       : 'sub_type',
			accessor : ({ feedback_parameter = '' }) => (
				<section className={styles.table_cell}>
					{startCase(feedback_parameter) || '__'}
				</section>
			),
		},
		{
			Header   : <div>CURRENT DATA</div>,
			key      : 'current_data',
			id       : 'current_data',
			accessor : ({ feedback_parameter_value = '' }) => (
				<section className={styles.table_cell}>
					<Tooltip content={startCase(feedback_parameter_value)} placement="top" interactive>
						<span className={styles.tooltip_text}>
							{startCase(feedback_parameter_value) || '__'}
						</span>
					</Tooltip>
				</section>
			),
		},
		{
			Header   : <div>FEEDBACK & PROOF</div>,
			key      : 'feedback',
			id       : 'feedback',
			accessor : ({ feedback = '', feedback_reference_document_url = '' }) => (
				<section className={styles.feedback}>
					<Tooltip content={startCase(feedback)} placement="top" interactive>
						<span className={styles.tooltip_text}>
							{startCase(feedback) || '__'}
						</span>
					</Tooltip>
					{feedback_reference_document_url ? (
						<ButtonIcon
							size="md"
							themeType="primary"
							icon={<IcMView />}
							className={styles.table_button}
							// eslint-disable-next-line no-undef
							onClick={() => { window.open(feedback_reference_document_url, '_blank'); }}
						/>
					) : (
						<div />
					)}
				</section>
			),
		},
		{
			Header   : <div>CORRECTION & PROOF</div>,
			key      : 'correction',
			id       : 'correction',
			accessor : ({
				kam_response = '', kam_response_reference_document_url
				= '',
			}) => (
				<section className={styles.feedback}>
					<Tooltip content={startCase(kam_response)} placement="top" interactive>
						<span className={styles.tooltip_text}>
							{startCase(kam_response) || '__'}
						</span>
					</Tooltip>
					{kam_response_reference_document_url
						? (
							<ButtonIcon
								size="md"
								themeType="primary"
								icon={<IcMView />}
								className={styles.table_button}
							// eslint-disable-next-line no-undef
								onClick={() => {
									window.open(
										kam_response_reference_document_url,
										'_blank',
									);
								}}
							/>
						) : (
							<div />
						)}

				</section>
			),
		},
		{
			Header   : <div>CREATION DATE</div>,
			key      : 'created_date',
			id       : 'created_date',
			accessor : ({ created_at = '' }) => (
				<section className={styles.table_cell}>
					{format(created_at, 'dd MMM yyyy') || '__'}
				</section>
			),
		},
		{
			Header   : <div>KAM Manager</div>,
			key      : 'kam_manager',
			id       : 'kam_manager',
			accessor : ({ kam_manager = '' }) => (
				<section className={styles.table_cell}>
					{kam_manager || '__'}
				</section>
			),
		},
		{
			Header   : <div>KAM</div>,
			key      : 'kam',
			id       : 'kam',
			accessor : ({ kam = '' }) => (
				<section className={styles.table_cell}>
					{kam || '__'}
				</section>
			),
		},
	];

	return {
		columns,
		data: list,
		loading,
		setParams,
		paginationData,
		// filters,
		// onChangeFilters,
		// onResetFilters,
		// onChangeParams,
	};
};

export default useFeedbackTableData;
