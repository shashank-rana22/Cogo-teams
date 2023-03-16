// import getValue from '@cogo/smart-components/utils/getValue';
import { Placeholder, Grid } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

// const { Col } = Grid;

function Item({
	item = {},
	isTotalRow = false,
	fields,
	loading = false,
	disabled = false,
	isLast = false,
}) {
	const stylesCol = { padding: '0px 4px' };

	return (
		<Row
			style={{
				opacity      : disabled ? '0.4' : '1',
				cursor       : disabled ? 'not-allowed' : 'pointer',
				borderBottom : isLast ? 'none' : null,
				borderRadius : isLast ? '0px 0px 4px 4px' : null,
			}}
			tabIndex="0"
			className={`${item.expired ? 'expired' : ''} card-body-row ${
				item.isDuplicates ? 'duplicate' : ''
			}`}
		>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}

				return (
					<Col
						xs={6}
						sm={6}
						md={singleItem.span}
						lg={singleItem.span}
						style={singleItem.hasStyle ? singleItem.styles : stylesCol}
						key={singleItem?.key}
						className="card-body-col"
					>
						{loading ? <Placeholder width="100%" height="20px" /> : null}
						{!isTotalRow ? (
							<div>
								{singleItem?.render && !loading
									? singleItem.render(item)
									: null}
							</div>
						) : (
							<Total>{item[singleItem?.name]}</Total>
						)}

						{!loading && !singleItem.render ? (
							<TitleBlack className="card-list-item-value">
								{/* {getValue(item, singleItem, false, {}) || '-'} */}
							</TitleBlack>
						) : null}
					</Col>
				);
			})}
		</Row>
	);
}

export default Item;
