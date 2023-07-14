import { Button, Pagination } from '@cogoport/components';
import { IcMArrowUp, IcMArrowDown } from '@cogoport/icons-react';
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
		if (loading || !isEmpty(shipmentPendingTasks)) {
			return (shipmentPendingTasks || []).map((singleitem) => {
				const { id, blCategory } = singleitem || {};
				return (
					<Fragment key={id}>
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
						{blCategory === 'hawb' && (
							<div className={styles.accordian_style}>
								{open === id ? (
									<Button
										themeType="linkUi"
										onClick={() => {
											setOpen('');
										}}
									>
										Show Less
										{' '}
										<IcMArrowUp />
									</Button>
								) : (
									<Button
										themeType="linkUi"
										onClick={() => {
											setOpen(id);
										}}
									>
										Show More
										{' '}
										<IcMArrowDown />
									</Button>
								)}
							</div>
						)}
					</Fragment>
				);
			});
		}
		return <EmptyState />;
	};

	return (
		<section>
			<Header fields={fields} />
			<div className={styles.scroll}>
				{handleRender()}
				{!loading && !isEmpty(shipmentPendingTasks) ? (
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
