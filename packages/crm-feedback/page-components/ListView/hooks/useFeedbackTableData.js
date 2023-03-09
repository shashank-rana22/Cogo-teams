// const {format} from '@cogoport/utils/';

import { ButtonIcon, Tooltip, Checkbox } from '@cogoport/components';
import { IcMView } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useMemo, useState, useEffect } from 'react';

import styles from '../styles.module.css';

const useFeedbackTableData = () => {
	// const formatDate = (date) => format(date, 'dd MMM yyyy');

	const [selectAll, setSelectAll] = useState(false);
	const [checkedRowsId, setCheckedRowsId] = useState([]);

	// HAVE TO REMOVE THIS DUMMY DATA
	const data = [
		{
			id                   : 'something1',
			organization         : 'AB Logistics Pvt Ltd.',
			cogo_entity          : 'India',
			type                 : 'Account Information',
			sub_type             : 'Email',
			current_data         : 'anmolbansal@gmail.com',
			feedback             : 'Email is Incorrect',
			feedback_proof_url   : 'https://www.google.com/',
			correction           : 'abanmolbansal5@gmail.com',
			correction_proof_url : 'https://www.google.com/cogoport',
			createdDate          : '01 March 2023',
			kam_manager          : 'Parth Samnani',
			kam                  : 'Mohit Nagar',
		},
		{
			id                   : 'something2',
			organization         : 'AB Logistics Pvt Ltd.',
			cogo_entity          : 'India',
			type                 : 'Account Information',
			sub_type             : 'Email',
			current_data         : 'anmolbansal@gmail.com',
			feedback             : 'Email is Incorrect',
			feedback_proof_url   : 'https://www.google.com/',
			correction           : 'abanmolbansal5@gmail.com',
			correction_proof_url : 'https://www.google.com/cogoport',
			createdDate          : '01 March 2023',
			kam_manager          : 'Parth Samnani',
			kam                  : 'Mohit Nagar',
		},
		{
			id                   : 'something3',
			organization         : 'AB Logistics Pvt Ltd.',
			cogo_entity          : 'India',
			type                 : 'Account Information',
			sub_type             : 'Email',
			current_data         : 'anmolbansal@gmail.com',
			feedback             : 'Email is Incorrect',
			feedback_proof_url   : 'https://www.google.com/',
			correction           : 'abanmolbansal5@gmail.com',
			correction_proof_url : 'https://www.google.com/cogoport',
			createdDate          : '01 March 2023',
			kam_manager          : 'Parth Samnani',
			kam                  : 'Mohit Nagar',
		},
		{
			id                   : 'something4',
			organization         : 'AB Logistics Pvt Ltd.',
			cogo_entity          : 'India',
			type                 : 'Account Information',
			sub_type             : 'Email',
			current_data         : 'anmolbansal@gmail.com',
			feedback             : 'Email is Incorrect',
			feedback_proof_url   : 'https://www.google.com/',
			correction           : 'abanmolbansal5@gmail.com',
			correction_proof_url : 'https://www.google.com/cogoport',
			createdDate          : '01 March 2023',
			kam_manager          : 'Parth Samnani',
			kam                  : 'Mohit Nagar',
		},
	];
	// HAVE TO REMOVE THIS DUMMY DATA

	const list = data;

	const currentPageListIds = useMemo(() => list.map(({ id }) => id), [list]);

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
					{organization || '__'}
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
			accessor : ({ type = '' }) => (
				<section className={styles.table_cell}>
					{type || '__'}
				</section>
			),
		},
		{
			Header   : <div>SUB-TYPE</div>,
			key      : 'sub_type',
			id       : 'sub_type',
			accessor : ({ sub_type = '' }) => (
				<section className={styles.table_cell}>
					{sub_type || '__'}
				</section>
			),
		},
		{
			Header   : <div>CURRENT DATA</div>,
			key      : 'current_data',
			id       : 'current_data',
			accessor : ({ current_data = '' }) => (
				<section className={styles.table_cell}>
					<Tooltip content={current_data} placement="top" interactive>
						<span className={styles.tooltip_text}>
							{current_data || '__'}
						</span>
					</Tooltip>
				</section>
			),
		},
		{
			Header   : <div>FEEDBACK & PROOF</div>,
			key      : 'feedback',
			id       : 'feedback',
			accessor : ({ feedback = '', feedback_proof_url = '' }) => (
				<section className={styles.feedback}>
					<Tooltip content={feedback} placement="top" interactive>
						<span className={styles.tooltip_text}>
							{feedback || '__'}
						</span>
					</Tooltip>
					{feedback_proof_url ? (
						<ButtonIcon
							size="md"
							themeType="primary"
							icon={<IcMView />}
							className={styles.table_button}
							// eslint-disable-next-line no-undef
							onClick={() => { window.open(feedback_proof_url, '_blank'); }}
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
			accessor : ({ correction = '', correction_proof_url = '' }) => (
				<section className={styles.feedback}>
					<Tooltip content={correction} placement="top" interactive>
						<span className={styles.tooltip_text}>
							{correction || '__'}
						</span>
					</Tooltip>
					{correction_proof_url ? (
						<ButtonIcon
							size="md"
							themeType="primary"
							icon={<IcMView />}
							className={styles.table_button}
							// eslint-disable-next-line no-undef
							onClick={() => { window.open(correction_proof_url, '_blank'); }}
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
			accessor : ({ created_date = '' }) => (
				<section className={styles.table_cell}>
					{created_date || '__'}
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
		data,
		// loading,
	};
};

export default useFeedbackTableData;
