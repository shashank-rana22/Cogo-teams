import { Button, Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Content from './Content';
import styles from './styles.module.css';

function FilterPopover({
	filters = {},
	setFilters = () => {},
	clearFilter = () => {},
	refetch = () => {},
}) {
	const [show, setShow] = useState(false);
	const [receivables, setReceivables] = useState('services');

	const onChange = (val, name) => {
		setFilters((p) => ({ ...p, [name]: val }));
	};

	return (
		<div>
			<Popover
				visible={show}
				placement="bottom"
				render={(
					<Content
						clearFilter={clearFilter}
						refetch={refetch}
						setShow={setShow}
						receivables={receivables}
						filters={filters}
						handleChange={setReceivables}
						onChange={onChange}
					/>
				)}
				className={styles.pop_over_style}
				onClickOutside={() => setShow(false)}
			>
				<Button
					themeType="secondary"
					size="md"
					onClick={() => {
						setShow(!show);
					}}
				>
					Filters
					{' '}
					<IcMFilter className={styles.style_filter_button} />
				</Button>
			</Popover>
		</div>
	);
}

export default FilterPopover;
