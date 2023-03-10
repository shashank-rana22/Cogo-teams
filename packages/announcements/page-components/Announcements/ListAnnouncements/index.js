import { Pill, Button, Pagination } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { format, startCase } from '@cogoport/utils';
import React from 'react';

// import EmptyState from '../../../commons/EmptyState';
// import StyledTable from '../../../commons/StyledTable';

import DisplayCards from './DisplayCards';
import Header from './Header';
import styles from './styles.module.css';
import useListAnnouncements from './useListAnnouncements';

function AddedAnnouncements(props) {
	const {
		page,
		setPage,
		paginationData,
		columns,
		filters,
		setFilters,
		searchInput,
		setSearchInput,
		activeList,
		setActiveList,
		AnnouncementListLoading,
	} = props;

	const { profile } = useSelector((reduxState) => reduxState);

	const router = useRouter();
	const { data, loading } = useListAnnouncements();

	const columns1 = [
		{
			Header   : 'Description',
			accessor : (item) => (
				<div>
					{item.title}
				</div>
			),
		},
		{
			Header   : 'Topics',
			accessor : (items) => (items?.topics?.length > 0 ? (
				<div className={styles.topics}>
					{items.faq_topics.map((topic) => {
						const { display_name } = topic || {};
						return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
					})}
				</div>
			) : '-'),
		},
		{
			Header   : 'Tags',
			accessor : (items) => (items?.tags?.length > 0 ? (
				<div className={styles.tags}>
					{items.faq_tags.map((tag) => {
						const { display_name } = tag || {};
						return <Pill size="sm" color="green">{startCase(display_name)}</Pill>;
					})}
				</div>
			) : '-'),
		},

		{
			Header   : 'Announcement Type',
			accessor : (items) => (items?.announcement_type !== '' ? (
				<div className={styles.question}>
					{items?.announcement_type}
				</div>
			) : '-'),
		},

		{
			Header   : 'Last Updated At',
			accessor : (items) => {
				const formatDate = format(items?.updated_at || items?.created_at, 'dd MMM yyyy hh:mm a');
				return (
					<div>
						{formatDate}
					</div>
				);
			},
		},
		{
			Header   : 'ACTIONS',
			accessor : (items) => (
				<div className={styles.button_container}>
					<Button
						themeType="primary"
						size="sm"
						style={{ marginRight: 8 }}
						onClick={() => onClickViewButton(items?.id)}
					>
						VIEW
					</Button>
					<Button
						themeType="secondary"
						size="sm"
						style={{ marginRight: 8 }}
						onClick={() => onClickEditButton(items?.id)}
					>
						EDIT
					</Button>
					{activeList !== 'inactive' ? (
						<IcMDelete
							height={20}
							width={20}
							style={{ cursor: 'pointer' }}
							onClick={() => deactivateQuestion(items?.id)}
						/>
					) : null}
				</div>
			),
		},
	];

	const renderTable = () => {
		const onClick = () => {
			router.push(
				'/learning/faq/create/question',
				'/learning/faq/create/question',
			);
		};
		console.log(data);
		return (
			<>
				<div className={styles.table}>
					{/* <StyledTable columns={columns1} data={data?.list} loading={loading} /> */}
					<DisplayCards data={data?.list} />
				</div>

				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={paginationData?.total_count}
						pageSize={paginationData?.page_limit}
						onPageChange={setPage}
					/>
				</div>
			</>
		);
	};

	return (
		<div className={styles.container}>
			<Header
				filters={filters}
				setFilters={setFilters}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				activeList={activeList}
				setActiveList={setActiveList}
			/>

			{renderTable()}
		</div>
	);
}

export default AddedAnnouncements;
