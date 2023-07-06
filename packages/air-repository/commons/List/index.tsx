import { Button, Pagination } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import React, { useState, useEffect, ReactFragment } from 'react';

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
	Child?: ReactFragment;
}

const PAGE_SIZE = 10;

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page,
	setPage,
	functions,
	Child = <div />,
} :Props) {
	const [isMobile, setIsMobile] = useState(false);
	const { list = {}, total_count:totalCount } = listData;
	const [isOpen, setIsOpen] = useState('');

	const handlePOCDetails = (itm) => {
		setIsOpen(itm.id);
	};

	const render = () => {
		type TypeObject = string | number | Date | null | React.FC ;
		const showlist:TypeObject = list.length ? list : Array(6).fill(1);

		if (loading || list.length) {
			return (showlist).map((singleitem) => (
				<>
					<ListItem
						key={singleitem.id}
						singleitem={singleitem}
						fields={fields}
						functions={functions}
						loading={loading}
						isMobile={isMobile}
						Child={Child}
						isOpen={isOpen}
					/>
					<div
						className={styles.accordian_style}
					>
						{isOpen === singleitem.id ? (
							<Button
								themeType="linkUi"
								onClick={() => {
									setIsOpen('');
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
									handlePOCDetails(singleitem);
								}}
							>
								<span>Show More</span>
								<IcMArrowDown
									style={{ cursor: 'pointer' }}
								/>
							</Button>
						)}
					</div>
				</>
			));
		}
		return <EmptyState />;
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<section>
			{!isMobile && <ListHeader fields={fields} />}
			<div className={styles.scroll}>
				{render()}
				{!loading && Number(list.length) > 0 ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={Number(totalCount)}
							pageSize={PAGE_SIZE}
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
