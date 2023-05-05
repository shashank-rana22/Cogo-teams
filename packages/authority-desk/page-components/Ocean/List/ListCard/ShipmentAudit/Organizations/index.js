import { Loader } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetOrganizationOutstanding from '../../../../../../hooks/useGetOrganizationOutstanding';

import OrgDetails from './OrgDetails';
import styles from './styles.module.css';

function Organizations() {
	const { data, loading } = useGetOrganizationOutstanding();

	const [orgDetails, setOrgDetails] = useState({});

	if (loading) {
		return (
			<div className={styles.loader}>
				Loading Data....
				<Loader themeType="primary" className={styles.loader_icon} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Invoicing Parties</div>
			{
				(data?.list || []).map((item) => (
					<div className={styles.org_card}>
						<div className={styles.main_details}>
							<div className={styles.org_details}>
								<div>
									Name :
									{' '}
									{item?.businessName}
								</div>
								<div>
									Total Outstanding Amount -
									{item?.totalOutstandingAmount}
								</div>
							</div>

							<IcMArrowRotateDown onClick={() => setOrgDetails(
								{
									...orgDetails,
									[item?.registrationNumber]: !orgDetails[item?.registrationNumber],
								},
							)}
							/>
						</div>

						{orgDetails[item?.registrationNumber]
							? <OrgDetails registerationNumber={item?.registrationNumber} />
							: null}

					</div>
				))
}

		</div>

	);
}

export default Organizations;
