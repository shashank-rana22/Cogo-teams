import { Button, Pagination } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState, ReactFragment } from 'react';

import EmptyState from './EmptyState';
import { FunctionObjects, FieldType, ListDataType } from './Interfaces';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

interface Props {
	fields: FieldType[];
	data: ListDataType;
	loading?: boolean;
	page?: number;
	setPage?: Function;
	functions?: FunctionObjects;
	activeTab?: string;
	Child?: ReactFragment;
	setViewDoc?: Function;
	setItem?: Function;
	listAPI?: Function;
	edit?: boolean | string;
	setEdit?: Function;
	setGenerate?: Function;
}

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page,
	setPage,
	functions,
	activeTab = '',
	Child = () => {},
	setViewDoc = () => {},
	setItem = () => {},
	listAPI = () => {},
	edit = false,
	setEdit = () => {},
	setGenerate = () => {},
} :Props) {
	const { data = {} } = listData;
	const { shipmentPendingTasks = [] } = data;
	const [isOpen, setIsOpen] = useState(null);

	const handleProgramDetail = (itm) => {
		setIsOpen(isOpen === null ? itm.id : null);
		setIsOpen(itm.id);
	};

	const render = () => {
		type TypeObject = string | number | Date | null | React.FC ;
		const showlist:TypeObject = shipmentPendingTasks.length ? shipmentPendingTasks : Array(6).fill(1);

		if (loading || shipmentPendingTasks.length) {
			return (showlist).map((singleitem) => (
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
							style={{ '--length': isOpen ? 0 : '-16px' } as React.CSSProperties}
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
							style={{ '--length': isOpen ? 0 : '-20px' } as React.CSSProperties}
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
				{!loading && shipmentPendingTasks.length > 0 ? (
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
