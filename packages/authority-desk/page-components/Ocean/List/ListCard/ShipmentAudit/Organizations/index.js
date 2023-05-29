import { Loader } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useGetOrganizationOutstanding from '../../../../../../hooks/useGetOrganizationOutstanding';

import DaysAmountBifercation from './DaysAmountBifercation';
import OrgDetails from './OrgDetails';
import styles from './styles.module.css';

function Organizations({ item }) {
	const { data, loading } = useGetOrganizationOutstanding({ item });

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
				(data?.list || []).map((val) => (
					<div className={styles.org_card}>
						<div className={styles.main_details}>
							<div className={styles.org_details}>
								<div>
									Name:
									&nbsp;
									{val?.businessName}
								</div>
								<div>
									Total Outstanding Amount: &nbsp;

									{formatAmount({
										amount   : val?.totalOutstandingAmount,
										currency : val?.currency,
										options  : {
											style                 : 'currency',
											currencyDisplay       : 'code',
											maximumFractionDigits : 2,
										},
									})}
								</div>
							</div>

							<IcMArrowRotateDown onClick={() => setOrgDetails(
								{
									...orgDetails,
									[val?.registrationNumber]: !orgDetails[val?.registrationNumber],
								},
							)}
							/>
						</div>

						{orgDetails[val?.registrationNumber]
							? (
								<>
									<DaysAmountBifercation item={val} />
									<OrgDetails registerationNumber={val?.registrationNumber} />
								</>
							)
							: null}

					</div>
				))
}

		</div>

	);
}

export default Organizations;
