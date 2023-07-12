import { Button, Pagination } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { Fragment, useState, useEffect, ReactFragment } from 'react';

import EmptyState from './EmptyState';
import { FunctionObjects, FieldType, ListDataType, NestedObj } from './Interfaces';
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

interface RenderProps {
	list: Array<NestedObj>;
	loading?: boolean;
	fields?: FieldType[];
	functions?: FunctionObjects;
	Child?: ReactFragment;
	isMobile?: boolean;
}

const PAGE_SIZE = 10;

function Render({
	list = [],
	loading = false,
	fields = [],
	functions = {},
	Child = <div />,
	isMobile = false,
}:RenderProps) {
	const [open, setOpen] = useState('');

	type TypeObject = string | number | Date | null | React.FC ;
	const showlist:TypeObject = list.length ? list : Array(6).fill(1);

	const handlePOCDetails = (itm) => {
		setOpen(itm.id);
	};

	if (loading || !isEmpty(list)) {
		return (showlist).map((singleitem) => (
			<Fragment key={singleitem.id}>
				<ListItem
					singleitem={singleitem}
					fields={fields}
					functions={functions}
					loading={loading}
					isMobile={isMobile}
					Child={Child}
					open={open}
				/>
				{singleitem?.booking_mode !== 'platform' && (
					<div
						className={styles.accordian_style}
					>
						{open === singleitem.id ? (
							<Button
								themeType="linkUi"
								onClick={() => {
									setOpen('');
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
				)}
			</Fragment>
		));
	}
	return <EmptyState />;
}

function List({
	fields = [],
	data:listData = {},
	loading = false,
	page = 1,
	setPage = () => {},
	functions = {},
	Child = <div />,
} :Props) {
	const [isMobile, setIsMobile] = useState(false);

	const { list = [], total_count:totalCount } = listData;

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
				<Render
					list={list}
					loading={loading}
					fields={fields}
					functions={functions}
					Child={Child}
					isMobile={isMobile}
				/>
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
