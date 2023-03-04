/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Popover } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetSuggestedLocals from '../../../../../hooks/useGetSuggestedLocals';

import styles from './styles.module.css';

function LocalLabel({ label, field, setValue, values, service }) {
	const [selected, setSelected] = useState(null);
	const { list } = useGetSuggestedLocals({
		section    : { name: field.name },
		formValues : values,
		data       : service,
	});

	const allIds = (list || []).map((item) => item.id);

	const content = (
		<div className={styles.locals}>
			{(list || []).map((item) => (
				<div
					className={styles.charge_item}
					onClick={() => setSelected(item)}
				>
					<div className={styles.space_between}>
						<p className={styles.service_provider}>
							{item.service_provider?.business_name}
						</p>
						{selected?.id === item.id ? <IcCFtick /> : null}
					</div>
					<div className={styles.space_between}>
						<p>
							{item.total_price_currency}
							{' '}
							{item.total_price}
						</p>
						<p>
							{format(item.updated_at, 'dd MMM yyyy')}
						</p>
					</div>
				</div>
			))}
		</div>
	);
	useEffect(() => {
		const rate_data = selected || list?.[0] || {};
		const line_items = rate_data?.data?.line_items || [];
		const actualLineItems = line_items.map((line_item) => ({
			price    : line_item.price,
			code     : line_item.code,
			unit     : line_item.unit,
			currency : line_item.currency,
		}));
		if (actualLineItems.length) {
			setValue(field.name, actualLineItems);
		}
	}, [selected?.id, JSON.stringify(allIds)]);
	return (
		<div className={styles.container}>
			<span>{label}</span>
			{' '}
			{list.length > 1 ? (
				<Popover placement="top" render={content} interactive>
					<Button size="sm" themeType="secondary" style={{ color: 'red' }}>
						Choose locals out of
						{' '}
						{ list.length}
						{' '}
						options
					</Button>
				</Popover>
			) : null}
		</div>
	);
}

export default LocalLabel;
