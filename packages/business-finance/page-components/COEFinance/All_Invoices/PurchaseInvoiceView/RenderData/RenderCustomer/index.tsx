import React from 'react';
import {Tooltip} from '@cogoport/components';
import { GenericObject } from '../../../../../commons/Interfaces/index';

interface props{
	itemData:GenericObject
	field: {
		key :string
	},	
}


const renderCustomer = ({ itemData, field}:props) => {
    const {	organizationName = ''} = itemData || {};
 
	return (
        <>
        {field?.key==='organizationName'&&(
       <div>
            {organizationName.length > 18 ? (
					<Tooltip
						interactive
						theme="light"
						placement="top"
						content={organizationName}
					>
						<text>{`${organizationName.substring(0, 15)}...`}</text>
					</Tooltip>
				) : (
					<text>{organizationName}</text>
				)}
       </div>
        )}
        </>
	);
};

export default renderCustomer;
