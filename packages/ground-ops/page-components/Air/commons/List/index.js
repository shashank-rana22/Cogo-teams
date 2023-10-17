import { Button, Pagination } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetUsers from '../../hooks/useGetUsers';

import EmptyState from './EmptyState';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page = 1,
	setPage = () => {},
	functions = {},
	activeTab = '',
	Child = () => {},
	setViewDoc = () => {},
	setItem = () => {},
	listAPI = () => {},
	edit = false,
	setEdit = () => {},
	setGenerate = () => {},
}) {
	const { data = {} } = listData;
	const { stakeholderIds = [], shipmentPendingTasks = [] } = data;
	const [isOpen, setIsOpen] = useState(null);

	const { data: userData = {}, listUsers } = useGetUsers({ stakeholderIds });

	const { list: userList = [] } = userData;

	const FINAL_DATA = [];
	(userList || []).forEach((item) => {
		(shipmentPendingTasks || []).map((itm) => {
			if (item.user_id === itm.stakeholderId) {
				const pushData = {
					...itm,
					stakeholderName: item.name,
				};
				FINAL_DATA.push(pushData);
			}
			return FINAL_DATA;
		});
	});

	const handleProgramDetail = (itm) => {
		setIsOpen(isOpen === null ? itm.id : null);
		setIsOpen(itm.id);
	};

	useEffect(() => {
		if (!loading) {
			listUsers();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listData]);

	const render = () => {
		const finalList = isEmpty(FINAL_DATA) ? shipmentPendingTasks : FINAL_DATA;

		if (loading || finalList.length) {
			return (finalList).map((singleitem) => (
				<div className="card-list-data" key={singleitem.id}>
					<ListItem
						singleitem={singleitem}
						fields={fields}
						functions={functions}
						loading={loading}
						isOpen={isOpen}
						Child={Child}
						setViewDoc={setViewDoc}
						setItem={setItem}
						listAPI={listAPI}
						edit={edit}
						setEdit={setEdit}
						setGenerate={setGenerate}
					/>
					{singleitem.blCategory === 'hawb' && ['approval_pending', 'approved_awb'].includes(activeTab) && (
						<div
							style={{ '--length': isOpen ? 0 : '-16px' }}
							className={styles.accordian_style}
						>
							{isOpen === singleitem.id ? (
								<IcMArrowDown
									style={{ transform: 'rotate(180deg)', cursor: 'pointer', width: '100%' }}
									onClick={() => {
										setIsOpen(null);
									}}
								/>
							) : (
								<IcMArrowDown
									style={{ cursor: 'pointer', width: '100%' }}
									onClick={() => {
										handleProgramDetail(singleitem);
									}}
								/>
							)}
						</div>
					)}
					{activeTab === 'amendment' && (
						<div
							style={{ '--length': isOpen ? 0 : '-20px' }}
							className={styles.amaendment_accordian_style}
						>
							{isOpen === singleitem.id ? (
								<Button
									themeType="linkUi"
									onClick={() => {
										setIsOpen(null);
									}}
								>
									Show Less
									<IcMArrowDown
										style={{ transform: 'rotate(180deg)', cursor: 'pointer' }}
									/>
								</Button>
							) : (
								<Button
									size="md"
									themeType="linkUi"
									onClick={() => {
										handleProgramDetail(singleitem);
									}}
								>
									<span>Show More</span>
									<IcMArrowDown
										style={{ cursor: 'pointer' }}
									/>
								</Button>
							)}
						</div>
					)}
				</div>
			));
		}
		return <EmptyState />;
	};

	return (
		<section>
			<ListHeader fields={fields} />
			<div className={styles.scroll}>
				{render()}
				{!loading && !isEmpty(shipmentPendingTasks) ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={Number(data?.totalRecords)}
							pageSize={10}
							type="table"
							onPageChange={(val) => { setPage(val); }}
						/>
					</div>
				) : null}
			</div>
		</section>
	);
}

export default List;
