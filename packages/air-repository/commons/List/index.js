import { Button, Pagination } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import React, { Fragment, useState, useEffect } from 'react';

import EmptyState from './EmptyState';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import styles from './styles.module.css';

const PAGE_SIZE = 10;
const MOBILE_SCREEN_SIZE = 768;

function Render({
	list = [],
	loading = false,
	fields = [],
	functions = {},
	Child = <div />,
	isMobile = false,
}) {
	const { t } = useTranslation(['airRepository']);
	const [open, setOpen] = useState('');

	const handlePOCDetails = (itm) => {
		setOpen(itm.id);
	};

	if (loading || !isEmpty(list)) {
		return (list).map((singleitem) => (
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
								{t('airRepository:show_less_text')}
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
								<span>{t('airRepository:show_more_text')}</span>
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
}) {
	const [isMobile, setIsMobile] = useState(false);

	const { list = [], total_count:totalCount } = listData;

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < MOBILE_SCREEN_SIZE) {
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
				{!loading && !isEmpty(list) ? (
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
