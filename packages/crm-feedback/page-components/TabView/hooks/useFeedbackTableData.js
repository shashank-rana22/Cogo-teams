import { ButtonIcon, Tooltip, Checkbox } from '@cogoport/components';
import { IcMView } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { format, startCase, isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect } from 'react';

import styles from '../styles.module.css';

const useFeedbackTableData = () => {
	const [selectAll, setSelectAll] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);

	const [filters, setFilters] = useState({});

	const [params, setParams] = useState({
		page_limit : 10,
		page       : 1,
		filters    : {},
	});

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/feedbacks',
		method  : 'get',
		authkey : 'get_allocation_feedbacks',
		params,
	}, { manual: true });

	const onChangeParams = (values = {}) => {
		setParams((previousState) => ({
			...previousState,
			...values,
		}));
	};

	const getListTable = () => {
		console.log("xzdxfcgvhbjnkml,;.'");
		trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters },
			},
		});
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect(() => onChangeParams({ page: 1 }), [filters]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getListTable(), [params, filters]);

	const onChangeFilters = (values) => {
		setFilters((previousState) => ({
			...filters,
			...previousState,
			...values,
		}));
	};

	// const dummyData = [
	// 	{
	// 		id                                  : 'df8a69d1-f30f-4e2c-9004-869d1b12f0ed',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'organization',
	// 		source_id                           : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		feedback_parameter                  : 'account',
	// 		feedback                            : 'other',
	// 		partner_id                          : null,
	// 		kam_response                        : null,
	// 		kam_response_reference_document_url : null,
	// 		feedback_reference_document_url     : null,
	// 		status                              : 'pending',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-13T08:09:59.087Z',
	// 		updated_at                          : '2023-03-13T08:09:59.087Z',
	// 		feedback_parameter_value            : '',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization: {
	// 			id            : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 			business_name : 'RELIANCE INDUSTRIES LIMITED',
	// 		},
	// 		user       : null,
	// 		created_by : {
	// 			id              : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
	// 			name            : 'Hrishikesh Kulkarni',
	// 			email           : 'hk@cogoport.com',
	// 			mobile_number   : '9820009820',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address : null,
	// 		document        : null,
	// 	},
	// 	{
	// 		id                                  : 'a6e6eadb-8de8-4630-b426-b3108452722b',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'user',
	// 		source_id                           : '0ba19736-ea69-443a-9ae4-c0a8cc692abe',
	// 		feedback_parameter                  : 'email',
	// 		feedback                            : 'has_bounced',
	// 		partner_id                          : null,
	// 		kam_response                        : 'akash@ril.com',
	// 		kam_response_reference_document_url : null,
	// 		feedback_reference_document_url     : null,
	// 		status                              : 'requested',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-06T12:48:27.837Z',
	// 		updated_at                          : '2023-03-09T10:34:59.844Z',
	// 		feedback_parameter_value            : 'akash.shrivastava@ril.com',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization : null,
	// 		user         : {
	// 			id              : '0ba19736-ea69-443a-9ae4-c0a8cc692abe',
	// 			name            : 'AKASH SHRIVASTAVA',
	// 			email           : 'akash.shrivastava@ril.com',
	// 			mobile_number   : '9967547525',
	// 			whatsapp_number : '9967547525',
	// 		},
	// 		created_by: {
	// 			id              : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 			name            : 'Parth Samnani',
	// 			email           : 'parth.samnani@cogoport.com',
	// 			mobile_number   : '9870050422',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address : null,
	// 		document        : null,
	// 	},
	// 	{
	// 		id                                  : '39e09a5e-84fb-4b16-b574-b39c6394487c',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'organization',
	// 		source_id                           : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		feedback_parameter                  : 'account',
	// 		feedback                            : 'needs_credit_to_do_business',
	// 		partner_id                          : null,
	// 		kam_response                        : null,
	// 		kam_response_reference_document_url : null,
	// 		feedback_reference_document_url     : null,
	// 		status                              : 'requested',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-06T07:17:58.482Z',
	// 		updated_at                          : '2023-03-09T10:35:00.673Z',
	// 		feedback_parameter_value            : '',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization: {
	// 			id            : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 			business_name : 'RELIANCE INDUSTRIES LIMITED',
	// 		},
	// 		user       : null,
	// 		created_by : {
	// 			id              : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 			name            : 'Parth Samnani',
	// 			email           : 'parth.samnani@cogoport.com',
	// 			mobile_number   : '9870050422',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address : null,
	// 		document        : null,
	// 	},
	// 	{
	// 		id                                  : '02276d44-741b-4c6e-9b3e-d15a3a313e0e',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'organization_document',
	// 		source_id                           : 'e7fee07b-feba-461c-81ae-1d59aee52f5a',
	// 		feedback_parameter                  : 'document',
	// 		feedback                            : 'is_incorrect',
	// 		partner_id                          : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	// 		kam_response                        : 'CFKPN1111K',
	// 		kam_response_reference_document_url : '',
	// 		feedback_reference_document_url     : '',
	// 		status                              : 'requested',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-02T09:41:24.483Z',
	// 		updated_at                          : '2023-03-09T10:34:59.317Z',
	// 		feedback_parameter_value            : 'AAACR5055K',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization : null,
	// 		user         : null,
	// 		created_by   : {
	// 			id              : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 			name            : 'Parth Samnani',
	// 			email           : 'parth.samnani@cogoport.com',
	// 			mobile_number   : '9870050422',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address : null,
	// 		document        : {
	// 			id            : 'e7fee07b-feba-461c-81ae-1d59aee52f5a',
	// 			name          : 'PanDocument',
	// 			document_type : 'pan',
	// 			data          : '{"identity_number": "AAACR5055K"}',
	// 		},
	// 	},
	// 	{
	// 		id                                  : 'ffcdd055-55ad-4ae4-9b48-5397f445104a',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'user',
	// 		source_id                           : '0ba19736-ea69-443a-9ae4-c0a8cc692abe',
	// 		feedback_parameter                  : 'mobile_number',
	// 		feedback                            : 'does_not_exist',
	// 		partner_id                          : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	// 		kam_response                        : '',
	// 		kam_response_reference_document_url : '',
	// 		feedback_reference_document_url     : '',
	// 		status                              : 'requested',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-02T09:27:31.026Z',
	// 		updated_at                          : '2023-03-09T10:34:58.225Z',
	// 		feedback_parameter_value            : '9967547525',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization : null,
	// 		user         : {
	// 			id              : '0ba19736-ea69-443a-9ae4-c0a8cc692abe',
	// 			name            : 'AKASH SHRIVASTAVA',
	// 			email           : 'akash.shrivastava@ril.com',
	// 			mobile_number   : '9967547525',
	// 			whatsapp_number : '9967547525',
	// 		},
	// 		created_by: {
	// 			id              : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 			name            : 'Parth Samnani',
	// 			email           : 'parth.samnani@cogoport.com',
	// 			mobile_number   : '9870050422',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address : null,
	// 		document        : null,
	// 	},
	// 	{
	// 		id                                  : '0f5e952d-1b62-4ad4-a47f-dd908c53d918',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'organization_billing_address',
	// 		source_id                           : '2bccca83-fd4e-47e2-b89c-735c43026e08',
	// 		feedback_parameter                  : 'pincode',
	// 		feedback                            : 'is_incorrect',
	// 		partner_id                          : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	// 		kam_response                        : '220039',
	// 		kam_response_reference_document_url : '',
	// 		feedback_reference_document_url     : '',
	// 		status                              : 'requested',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-02T06:19:14.035Z',
	// 		updated_at                          : '2023-03-09T10:34:58.034Z',
	// 		feedback_parameter_value            : '110035',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization : null,
	// 		user         : null,
	// 		created_by   : {
	// 			id              : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 			name            : 'Parth Samnani',
	// 			email           : 'parth.samnani@cogoport.com',
	// 			mobile_number   : '9870050422',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address: {
	// 			id         : '2bccca83-fd4e-47e2-b89c-735c43026e08',
	// 			name       : 'Ezollution E Cargo Services Pvt Ltd',
	// 			address    : '1848/90, 1st Floor, Shanti Nagar,\nTri Nagar, Delhi-110035',
	// 			pincode    : '110035',
	// 			tax_number : '07AAGCE9490H1Z8',
	// 		},
	// 		document: null,
	// 	},
	// 	{
	// 		id                                  : '93b24193-f1e7-4f04-9887-1d9120c76994',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'organization',
	// 		source_id                           : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		feedback_parameter                  : 'account',
	// 		feedback                            : 'has_shut_down',
	// 		partner_id                          : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	// 		kam_response                        : null,
	// 		kam_response_reference_document_url : null,
	// 		feedback_reference_document_url     : '',
	// 		status                              : 'requested',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-01T11:47:06.821Z',
	// 		updated_at                          : '2023-03-09T10:34:57.729Z',
	// 		feedback_parameter_value            : '',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization: {
	// 			id            : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 			business_name : 'RELIANCE INDUSTRIES LIMITED',
	// 		},
	// 		user       : null,
	// 		created_by : {
	// 			id              : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 			name            : 'Parth Samnani',
	// 			email           : 'parth.samnani@cogoport.com',
	// 			mobile_number   : '9870050422',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address : null,
	// 		document        : null,
	// 	},
	// 	{
	// 		id                                  : '9ca136d4-7d1c-4c0c-a5d9-53f171c7da9e',
	// 		organization_id                     : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		source_type                         : 'organization',
	// 		source_id                           : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 		feedback_parameter                  : 'account',
	// 		feedback                            : 'does_not_have_requirements',
	// 		partner_id                          : '6fd98605-9d5d-479d-9fac-cf905d292b88',
	// 		kam_response                        : null,
	// 		kam_response_reference_document_url : null,
	// 		feedback_reference_document_url     : '',
	// 		status                              : 'requested',
	// 		count                               : 1,
	// 		created_at                          : '2023-03-01T11:30:25.730Z',
	// 		updated_at                          : '2023-03-09T10:34:57.249Z',
	// 		feedback_parameter_value            : '',
	// 		lead_organization_id                : null,
	// 		audits                              : [
	// 			{
	// 				performed_by_id : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 				action_name     : 'create',
	// 			},
	// 		],
	// 		organization: {
	// 			id            : '370ed734-2df6-415d-b1cb-50bdb2b0b056',
	// 			business_name : 'RELIANCE INDUSTRIES LIMITED',
	// 		},
	// 		user       : null,
	// 		created_by : {
	// 			id              : '8c22817f-4246-43ef-a7f5-fdf77e37ca72',
	// 			name            : 'Parth Samnani',
	// 			email           : 'parth.samnani@cogoport.com',
	// 			mobile_number   : '9870050422',
	// 			whatsapp_number : null,
	// 		},
	// 		billing_address : null,
	// 		document        : null,
	// 	},
	// ];

	// const paginationData = {
	// 	page        : 1,
	// 	page_limit  : 10,
	// 	total       : 1,
	// 	total_count : 8,
	// };

	const { list = [], ...paginationData } = data || {};

	// const list = dummyData;

	const currentPageListIds = useMemo(() => list?.map(({ id }) => id), [list]);

	const selectAllHelper = (listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));

		if (isRowsChecked !== selectAll) {
			setSelectAll(isRowsChecked);
		}
	};

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPageListIds]);

	const onChangeBodyCheckbox = (event, id) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedIds = [];

			if (event.target.checked) {
				newCheckedIds = [...previousIds, id];
			} else {
				newCheckedIds = previousIds.filter((selectedId) => selectedId !== id);
			}

			selectAllHelper(newCheckedIds);

			return newCheckedIds;
		});
	};

	const onChangeTableHeadCheckbox = (event) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = [...previousIds];

			if (event.target.checked) {
				newCheckedRowsIds = [...newCheckedRowsIds, ...currentPageListIds];
			} else {
				newCheckedRowsIds = previousIds.filter((id) => !currentPageListIds.includes(id));
			}

			setSelectAll(event.target.checked);

			return [...new Set(newCheckedRowsIds)];
		});
	};

	const columns = [
		{
			id  : 'checkbox',
			key : 'checkbox',
			Header:
	<div>
		<Checkbox
			checked={selectAll}
			onChange={(event) => onChangeTableHeadCheckbox(event)}
			className={styles.select_all_checkbox}
		/>
	</div>,
			accessor: ({ id = '' }) => (
				<div>
					<Checkbox
						checked={checkedRowsId.includes(id)}
						onChange={(event) => onChangeBodyCheckbox(event, id)}
					/>
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
				<section className={styles.feedback}>
					<Tooltip
						content={startCase(feedback_parameter_value)}
						placement="top"
						interactive
						disabled={isEmpty(feedback_parameter_value)}
					>
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
					<Tooltip
						content={startCase(feedback)}
						placement="top"
						interactive
						disabled={isEmpty(feedback)}
					>
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
						null
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
					<Tooltip
						content={startCase(kam_response)}
						placement="top"
						interactive
						disabled={isEmpty(kam_response)}
					>
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
								onClick={() => {
									// eslint-disable-next-line no-undef
									window.open(
										kam_response_reference_document_url,
										'_blank',
									);
								}}
							/>
						) : (
							null
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
		filters,
		onChangeFilters,
		onChangeParams,
	};
};

export default useFeedbackTableData;
