import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import React from 'react';

import useGetCustomerOutstanding from '../hooks/useGetCustomerOutstanding';
import OutstandingList from '../OutstandingList';

import styles from './styles.module.css';

function ViewOrganizationDetails() {
	const router = useRouter();

	const {
		entityCode = '',
		organizationId = '',
		serialId = '',
	} = router.query || {};

	const { outStandingData } = useGetCustomerOutstanding({ orgId: organizationId, serialId, entityCode });

	const { list = [] } = outStandingData || {};

	const handleGoBackClick = () => {
		router.push('/business-finance/account-payables/outstanding');
	};

	return (
		<div>
			<div className={styles.button_div}>
				<Button
					size="lg"
					themeType="secondary"
					onClick={() => handleGoBackClick()}
				>
					Go Back
				</Button>
			</div>
			<OutstandingList
				item={list[GLOBAL_CONSTANTS.zeroth_index]}
				entityCode={entityCode}
				showElement
				organizationId={organizationId}
			/>
		</div>
	);
}

export default ViewOrganizationDetails;
