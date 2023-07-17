import React from 'react';

import ColumnCard from './ColumnCard';
import { CONTROLLER_CONFIG } from './Config/controller-config';
import Header from './Header';

// const DEFAULT_LOADER = [1, 2, 3, 4, 5, 6, 7];

// const list = [{

// 	id: 'be',

// 	incidentType: 'TDS_APPROVAL',

// 	incidentSubType: 'TDS_APPROVAL',

// 	approvalType: 'MULTIPLE',

// 	entityCode: 301,

// 	entityCodeId: 'ee09645b-5f34-4d2e-8ec7-6ac83a7946e1',

// 	isActive: true,

// 	createdBy: {

// 		userId: '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',

// 		userName: 'Test_551590',

// 		userEmail: 'hk@cogoport.com',

// 	},

// 	updatedBy: {

// 		userId: '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',

// 		userName: 'Test_551590',

// 		userEmail: 'hk@cogoport.com',

// 	},

// 	createdAt: 1689336511804,

// 	updatedAt: 1689336511804,

// 	level1: {

// 		level: 1,

// 		stakeholder: {

// 			userId: '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',

// 			userName: 'Test_551590',

// 			userEmail: 'hk@cogoport.com',

// 		},

// 		condition: 'true',

// 	},

// 	level2: {

// 		level: 2,

// 		stakeholder: {

// 			userId: '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',

// 			userName: 'Test_551590',

// 			userEmail: 'hk@cogoport.com',

// 		},

// 		condition: 'true',

// 	},

// 	level3: {

// 		level: 3,

// 		stakeholder: {

// 			userId: '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',

// 			userName: 'Test_551590',

// 			userEmail: 'hk@cogoport.com',

// 		},

// 		condition: 'true',

// 	},

// 	referenceId: 'IMA000001',

// }];

function CustomTable({ incidentData = {}, incidentLoading = false, getIncidentLevels = () => { } }) {
	const { list = [] } = incidentData || {};
	return (
		<div>
			<Header config={CONTROLLER_CONFIG} />
			{(list || []).map((item) => (
				<ColumnCard
					key={item?.id}
					config={CONTROLLER_CONFIG}
					item={item}
					incidentLoading={incidentLoading}
					refetch={getIncidentLevels}
				/>
			))}
		</div>
	);
}

export default CustomTable;
