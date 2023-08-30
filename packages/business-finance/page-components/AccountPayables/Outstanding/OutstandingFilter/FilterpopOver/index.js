import {
	Button,
	Popover,
} from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { companyType } from '../../constants';

import Content from './Content';
import styles from './styles.module.css';

function FilterpopOver({
	filters = {},
	setFilters = () => {},
	clearFilter = () => {},
	refetch = () => {},
}) {
	const [show, setShow] = useState(false);
	const [receivables, setReceivables] = useState('salesAgent');

	const onChange = (val, name) => {
		setFilters((p) => ({ ...p, [name]: val }));
	};
	const rest = { onClickOutside: () => setShow(false) };
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
						filters={filters}
						receivables={receivables}
						onChange={onChange}
						setReceivables={setReceivables}
						companyType={companyType}
					/>
				)}
				className={styles.pop_over_style}
				{...rest}
			>
				<Button
					themeType="secondary"
					size="lg"
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

export default FilterpopOver;
