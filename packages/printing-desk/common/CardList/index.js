import { Button, Pagination } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { Fragment, useState } from 'react';

import Header from './CardHeader';
import CardItem from './CardItem';
import EmptyState from './EmptyState';
import styles from './styles.module.css';

function CardList({
	fields = [],
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	functions = {},
	Child = <div />,
	setViewDoc = () => {},
	setItem = () => {},
	setEdit = () => {},
}) {
	const [open, setOpen] = useState('');

	const { shipmentPendingTasks = [], totalRecords } = data;

	const handleRender = () => {
		if (loading || shipmentPendingTasks.length) {
			return (shipmentPendingTasks || []).map((singleitem) => (
				<Fragment key={singleitem.id}>
					<CardItem
						singleitem={singleitem}
						fields={fields}
						functions={functions}
						loading={loading}
						Child={Child}
						open={open}
						setViewDoc={setViewDoc}
						setItem={setItem}
						setEdit={setEdit}
					/>
					{singleitem.blCategory === 'hawb' && (
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
										setOpen(singleitem?.id);
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
	};

	return (
		<section>
			<Header fields={fields} />
			<div className={styles.scroll}>
				{handleRender()}
				{!loading && !isEmpty(shipmentPendingTasks.length) ? (
					<div className={styles.pagination}>
						<Pagination
							currentPage={page}
							totalItems={Number(totalRecords)}
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

export default CardList;
