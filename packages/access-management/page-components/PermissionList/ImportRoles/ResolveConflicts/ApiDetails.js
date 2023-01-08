import { Checkbox } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { ScopeDetail, Row, ApiRole } from '../styles';

function ApiDetails({
	api, handleConflictResolve, apiKey, newPermissions,
}) {
	return (
		<Row className="bordered">
			<Checkbox
				themeType="small black"
				onChange={handleConflictResolve}
				checked={newPermissions?.[apiKey]?.id === api?.id}
			/>
			<ApiRole>{api.name}</ApiRole>
			{api.scopes.map((scope) => (
				<Row className="single">
					<IcCFtick style={{ marginRight: 8 }} />
					<ScopeDetail>
						{startCase(scope.type)}
						{' '}
						|
						{' '}
						{scope.through_criteria
							.map((viewType) => startCase(viewType))
							.join(', ')}
					</ScopeDetail>
				</Row>
			))}
		</Row>
	);
}
export default ApiDetails;
