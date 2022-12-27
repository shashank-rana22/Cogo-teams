import React, { ReactNode } from 'react';

import CardColumn from './CardColumn';
import Header from './CardHeader';
import { ConfigType, NestedObj,FunctionObjects,ListDataProps } from '../Interfaces/index';
import commonFunctions from "../..//commons/List/commonFunctions";

export interface Props {
	config: ConfigType;
	sort?: NestedObj;
	setSort?: React.Dispatch<React.SetStateAction<NestedObj>>
	itemData: ListDataProps;
	renderHeaderCheckbox?:()=>(ReactNode | '');
	functions?:FunctionObjects;
	loading?:boolean;
}

function List({
	config, sort, setSort, itemData, renderHeaderCheckbox,functions={},loading=false,
}:Props) {
	const isMobile = false;
	const {
		showHeader = true, fields, headerStyles, itemStyles, bodyStyles, showHeaderCheckbox,
	} = config;
	const list=itemData?.list;
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
				{(list || [1, 2, 3, 4, 5]).map((singleitem) => (
					<CardColumn
						fields={fields}
						itemStyles={itemStyles}
						singleitem={singleitem}
						config={config}
						loading={loading}
						functions={commonFunctions(functions)}
						isMobile={isMobile}
					/>
				))}
			</div>
		</section>
	);
}

export default List;
