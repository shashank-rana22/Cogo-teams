import React from 'react';

import CardColumn from './CardColumn';
import Header from './CardHeader';
import { ConfigType, TypeObj } from './Interfaces/index';

export interface Props {
	config: ConfigType;
	sort?: TypeObj;
	setSort?: any;
	itemData?: any[];
}

function List({
	config, sort, setSort, itemData,
}:Props) {
	const isMobile = false;
	const {
		showHeader = true, fields, headerStyles, itemStyles, bodyStyles,
	} = config;
	return (
		<section>
			{showHeader && !isMobile && (
				<Header
					fields={fields}
					sort={sort}
					setSort={setSort}
					headerStyles={headerStyles}
				/>
			)}
			<div style={bodyStyles}>
				{(itemData || [1, 2, 3, 4, 5]).map((singleitem) => (
					<CardColumn
						fields={fields}
						itemStyles={itemStyles}
						singleitem={singleitem}
						config={config}
						functions={{}}
						isMobile={isMobile}
					/>
				))}
			</div>
		</section>
	);
}

export default List;
