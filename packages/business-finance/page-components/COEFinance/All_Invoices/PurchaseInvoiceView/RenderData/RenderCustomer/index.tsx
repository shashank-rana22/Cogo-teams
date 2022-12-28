import React from 'react';
import {Tooltip} from '@cogoport/components';
// import Text from '@cogoport/front/components/Text';
import styled from './styles.module.css'

const renderCustomer = ({ item={}, field={} }) => {
    const {	organizationName = '',billNumber=''} = item || {};
 
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
