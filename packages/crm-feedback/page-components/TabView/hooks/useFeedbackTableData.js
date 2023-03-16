import { ButtonIcon, Tooltip, Checkbox } from '@cogoport/components';
import { IcMView } from '@cogoport/icons-react';
import { useAllocationRequest } from '@cogoport/request';
import { format, startCase, isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';

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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	// useEffect(() => onChangeParams({ page: 1 }), [filters]);

	useEffect(() => {
		trigger({
			params: {
				...params,
				filters: { ...params?.filters, ...filters },
			},
		});
	}, [params, filters, trigger]);

	const onChangeFilters = (values) => {
		setFilters((previousState) => ({
			...filters,
			...previousState,
			...values,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	const currentPageListIds = useMemo(() => list?.map(({ id }) => id), [list]);

	const selectAllHelper = useCallback((listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));

		if (isRowsChecked !== selectAll) {
			setSelectAll(isRowsChecked);
		}
	}, [currentPageListIds, selectAll]);

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	}, [currentPageListIds, checkedRowsId, selectAllHelper]);

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
						<a href={feedback_reference_document_url} target="_blank" rel="noreferrer">
							<ButtonIcon
								size="md"
								themeType="primary"
								icon={<IcMView />}
							/>
						</a>
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
				kam_response = '', kam_response_reference_document_url = '',
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
							<a href={kam_response_reference_document_url} target="_blank" rel="noreferrer">
								<ButtonIcon
									size="md"
									themeType="primary"
									icon={<IcMView />}
								/>
							</a>
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
			accessor : ({ created_at }) => (
				<section className={styles.table_cell}>
					{created_at ? format(created_at, 'dd MMM yyyy') : '___'}
				</section>
			),
		},
		{
			Header   : <div>KAM Manager</div>,
			key      : 'kam_manager',
			id       : 'kam_manager',
			accessor : ({ kam_manager }) => (
				<section className={styles.table_cell}>
					{kam_manager || '__'}
				</section>
			),
		},
		{
			Header   : <div>KAM</div>,
			key      : 'kam',
			id       : 'kam',
			accessor : ({ kam }) => (
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
		checkedRowsId,
	};
};

export default useFeedbackTableData;
