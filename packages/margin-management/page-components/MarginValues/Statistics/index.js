import { Loader, Toggle } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../common/EmptyState';
import useGetMarginBookingInsights from '../../../hooks/useGetMarginBookingInsights';

import styles from './styles.module.css';

function Statistics({ marginId = '' }) {
	const {
		data = [], loading = false, toggleState = '',
		setToggleState = () => { },
	} = useGetMarginBookingInsights({
		marginId,
	});

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
				<Toggle
					name="a4"
					size="sm"
					disabled={false}
					onLabel="Last month"
					offLabel="Current month"
					value={toggleState}
					onChange={() => {
						setToggleState((pv) => !pv);
					}}
				/>
			</div>
			<div>
				{loading ? (
					<div className={styles.loader_container}>
						<Loader
							size={20}
							borderWidth={2}
							spinBorderColor="#303B67"
							outerBorderColor="#dce1ff"
						/>
					</div>
				) : (
					<div style={{ display: 'flex', gap: '8px' }}>
						{!loading && isEmpty(data) ? (
							<EmptyState />
						) : (
							<>
								{(data || []).map((statsType) => {
									const { count = 0, count_type = '' } = statsType || {};

									return (
										<div key={count_type} className={styles.tile}>
											<div className={styles.title}>
												{' '}
												{startCase(count_type)}
												{' '}
											</div>
											<div className={styles.count}>
												{count || 0}
												{' '}
											</div>
										</div>
									);
								})}
							</>
						)}
					</div>
				)}
			</div>

		</div>

	);
}

export default Statistics;
