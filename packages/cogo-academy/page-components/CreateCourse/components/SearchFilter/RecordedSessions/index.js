import { Pagination, Button, Input } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import StyledTable from '../../../../../commons/StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';
import useRecordedSessions from './useRecordedSessions';

const openLink = (url) => {
	window.open(url, '_blank', 'noreferrer');
};

function CreateRecordedSessions({
	setModalView = () => {},
	input = {},
	setInput = () => {},
	onClickCreate = () => {},
	createLoading = false,
}) {
	return (
		<div>
			<div role="presentation" className={styles.back_icon} onClick={() => setModalView('list_view')}>
				<IcMArrowBack height={18} width={18} style={{ marginRight: 4 }} />
				Create New Recorded Session
			</div>

			<div className={styles.input_container}>
				<Input
					value={input.video_name}
					onChange={(e) => setInput((pv) => ({
						...pv,
						video_name: e,
					}))}
					placeholder="Enter Video Name"
				/>
			</div>

			<div className={styles.input_container}>
				<Input
					value={input.video_link}
					onChange={(e) => setInput((pv) => ({
						...pv,
						video_link: e,
					}))}
					placeholder="Enter Video Link"
				/>
			</div>

			<Button
				size="sm"
				onClick={onClickCreate}
				loading={createLoading}
			>
				Create New Link
			</Button>
		</div>
	);
}

function RecordedSessions({ showRecordedSession = false }) {
	const {
		list, loading,
		page, setPage,
		modalView, setModalView,
		paginationData,
		onClickDelete, deleteLoading,
		input, setInput,
		onClickCreate, createLoading,
	} = useRecordedSessions({ showRecordedSession });

	if (modalView === 'create_view') {
		return (
			<CreateRecordedSessions
				setModalView={setModalView}
				input={input}
				setInput={setInput}
				onClickCreate={onClickCreate}
				createLoading={createLoading}
			/>
		);
	}

	const columns = getColumns({ openLink, onClickDelete, deleteLoading });

	const { page_limit, total_count } = paginationData || {};

	return (
		<div>
			<div className={styles.button_container}>
				<Button
					size="sm"
					onClick={() => setModalView('create_view')}
				>
					Create New Link
				</Button>
			</div>

			<StyledTable columns={columns} data={list} loading={loading} />

			{total_count > page_limit ? (
				<Pagination
					type="compact"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			) : null}
		</div>
	);
}

export default RecordedSessions;
