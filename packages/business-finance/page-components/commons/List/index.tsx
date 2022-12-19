import React, { ReactNode } from 'react';

import CardColumn from './CardColumn';
import Header from './CardHeader';
import { ConfigType, NestedObj } from './Interfaces/index';

export interface Props {
	config: ConfigType;
	sort?: NestedObj;
	setSort?: React.Dispatch<React.SetStateAction<NestedObj>>
	itemData?: any[];
	renderHeaderCheckbox?:()=>(ReactNode | '');
}

function List({
	config, sort, setSort, itemData, renderHeaderCheckbox,
}:Props) {
	const isMobile = false;
	const {
		showHeader = true, fields, headerStyles, itemStyles, bodyStyles, showHeaderCheckbox,
	} = config;
	return (
		<section>
			{showHeader && !isMobile && (
				<Header
					fields={fields}
					sort={sort}
					setSort={setSort}
					headerStyles={headerStyles}
					showHeaderCheckbox={showHeaderCheckbox}
					renderHeaderCheckbox={renderHeaderCheckbox}
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
