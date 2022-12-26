import React from 'react';
import startCase from '@cogo/utils/startCase';
import { Checkbox } from '@cogoport/front/components';
import IconCheck from './ic-checkbox-small.svg';
import { ScopeDetail, Row, ApiRole } from '../styles';

const ApiDetails = ({ api, handleConflictResolve, apiKey, newPermissions }) => (
	<Row className="bordered">
		<Checkbox
			themeType="small black"
			onChange={handleConflictResolve}
			checked={newPermissions?.[apiKey]?.id === api?.id}
		/>
		<ApiRole>{api.name}</ApiRole>
		{api.scopes.map((scope) => (
			<Row className="single">
				<IconCheck style={{ marginRight: 8 }} />
				<ScopeDetail>
					{startCase(scope.type)} |{' '}
					{scope.through_criteria
						.map((viewType) => startCase(viewType))
						.join(', ')}
				</ScopeDetail>
			</Row>
		))}
	</Row>
);
export default ApiDetails;
