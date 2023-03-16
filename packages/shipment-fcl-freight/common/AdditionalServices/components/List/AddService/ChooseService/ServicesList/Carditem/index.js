// import getValue from '@cogoport/smart-components/utils/getValue';
import { Placeholder, Grid } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

// const { Col } = Grid;

function Item({ item, fields, handleClick, loading = false }) {
	const stylesCol = { padding: '0px 4px' };

	const stylesRow = {
		borderBottom   : '1px solid #e0e0e0',
		borderRadius   : '0px',
		margin         : 0,
		display        : 'flex',
		flexDirection  : 'row',
		justifyContent : 'space-between',
	};

	return (
		<Row
			style={stylesRow}
			onClick={handleClick}
			tabIndex="0"
			className={` ${item.expired ? 'expired' : ''}`}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleClick();
				}
			}}
		>
			{fields.map((singleItem) => (
				<Col
					xs={6}
					sm={6}
					md={singleItem.span}
					lg={singleItem.span}
					style={singleItem.hasStyle ? singleItem.styles : stylesCol}
					key={singleItem?.key}
				>
					{loading && <Placeholder width="100%" height="20px" />}
					<Label>{singleItem.label}</Label>
					{singleItem.render && !loading ? singleItem.render(item) : null}
					{!loading && !singleItem.render ? (
						<TitleBlack>
							{getValue(item, singleItem, false, {}) || '-'}
						</TitleBlack>
					) : null}
				</Col>
			))}
		</Row>
	);
}

export default Item;
