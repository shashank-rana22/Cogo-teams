import { Pagination } from '@cogoport/components';
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
} :Props) {
	const { list = {}, total_count } = listData;

	const [isOpen, setIsOpen] = useState(null);

	const handleProgramDetail = (itm) => {
		setIsOpen(isOpen === null ? itm.id : null);
		setIsOpen(itm.id);
	};

	const render = () => {
		type TypeObject = string | number | Date | null | React.FC ;
		const showlist:TypeObject = list.length ? list : Array(6).fill(1);

		if (loading || list.length) {
			return (showlist).map((singleitem) => (
				<div className="card-list-data">
					<ListItem
						singleitem={singleitem}
						fields={fields}
						functions={functions}
						loading={loading}
						isOpen={isOpen}
						Child={Child}
						setViewDoc={setViewDoc}
						setItem={setItem}
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
				{!loading && list.length > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={Number(total_count)}
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
