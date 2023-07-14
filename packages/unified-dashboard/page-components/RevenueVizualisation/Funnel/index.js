import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import EmptyState from '../../../common/Empty';
import Loader from '../../../common/PopoverLoader';
import useGetAccountWiseFunnel from '../../../hooks/useGetAccountWiseFunnel';

import FunnelChart from './FunnelChart';
import styles from './styles.module.css';

function Funnel({ byEtd, headerFilters }) {
	const [activeAccount, setActiveAccount] = useState('CP');
	const { data, loading } = useGetAccountWiseFunnel(byEtd, headerFilters);

	const { data: apiData = {}, accounts = [] } = data || {};

	useEffect(() => {
		if (accounts.length > 0) {
			setActiveAccount(accounts[0]);
		}
	}, [accounts]);

	const signupData = apiData[activeAccount || ''] || {};

	const renderData = () => {
		if (loading) {
			return <Loader />;
		}

		if (!loading && isEmpty(accounts)) {
			return <EmptyState />;
		}

		return (
			<>
				<div className={styles.accounts_container}>
					{accounts.map((val) => (
						<div
							key={uuidv4()}
							className={styles.account_titlebox}
							style={{
								background : val === activeAccount ? '#FDE74D' : '#fff',
								color      : val === activeAccount ? '#EE3425' : '#000',
							}}
							onClick={() => setActiveAccount(val)}
							role="button"
							tabIndex="0"
						>
							{val}
						</div>
					))}
				</div>

				<div className={styles.accounts_container}>
					<div className={styles.text_account}>
						Account Type :
						{' '}
						{signupData.account_type}
					</div>
					<div className={styles.text_org}>
						Organizations Count :
						{' '}
						{signupData.organizations_count}
					</div>
				</div>

				<div className={styles.funnel_chart_container}>
					<FunnelChart data={signupData} />
				</div>
			</>
		);
	};

	return (
		<div>
			<div className={styles.heading}>Sign up</div>
			{renderData()}
		</div>
	);
}

export default Funnel;
