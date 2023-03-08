/* eslint-disable comma-spacing */
import { Pill, Button } from '@cogoport/components';
import { IcMCross, IcMTick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import useGetFreightRateVisibility from '../../../../../hooks/useGetFreightRateVisibility';

import styles from './styles.module.css';

function HeaderInformation({ serviceType = null, requiredValues = null, service }) {
	const [showServiceButton, setShowServiceButton] = useState(false);
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const { values } = useGetFreightRateVisibility({
		requiredValues,
		serviceType,
		service,
	});

	const handleShowButton = () => {
		if (
			(values?.reason || '').includes('not activated for the organization')
		) {
			setShowServiceButton(true);
		} else {
			setShowServiceButton(false);
		}
	};
	useEffect(() => {
		handleShowButton();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	return (
		<div className={styles.styled_info}>
			{values?.reason || values?.is_visible ? (
				<Pill color="blue">
					<div className={styles.styled_tag}>
						{!values?.is_visible && values?.reason ? (
							<div className={styles.important_text}>
								<IcMCross
									style={{
										marginRight     : '2px',
										padding         : '2px 2px 2px 2px',
										backgroundColor : '#cc3b3b',
										color           : 'white',
										borderRadius    : '8px',
									}}
								/>
								Rate will not be visible at search ( Demand side ) because of
								these reasons:
								{' '}
								{values?.reason.replace(/.$/, '')}
								.
							</div>
						) : null}
						{values?.is_visible ? (
							<div className={styles.important_text}>
								<IcMTick
									style={{
										marginRight     : '2px',
										padding         : '2px 2px 2px 2px',
										backgroundColor : '#67C676',
										color           : 'white',
										borderRadius    : '8px',
									}}
								/>
								Rate is visible.
							</div>
						) : null}
						{showServiceButton ? (
							<Button
								themeType="tertiary"
								style={{ marginLeft: '20px' }}
								onClick={() => {
									// eslint-disable-next-line max-len, no-unused-expressions, no-undef
									window.location.href = `/${partnerId}/details/supply/${requiredValues?.service_provider_id}?tab=services`;
								}}
							>
								Apply For Service
							</Button>
						) : null}
					</div>
				</Pill>
			) : null}
		</div>
	);
}
export default HeaderInformation;
