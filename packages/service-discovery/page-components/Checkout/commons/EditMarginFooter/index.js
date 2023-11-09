import { Button } from '@cogoport/components';
import { IcCWaitForTimeSlots } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import RemoveServicesModal from './RemoveServicesModal';
import styles from './styles.module.css';
import useHandleEditMarginFooter from './useHandleEditMarginFooter';

function EditMarginFooter({ noRatesPresent = false, ...rest }) {
	const {
		services,
		handleUnlockLatestRate,
		createSearchLoading,
		hasExpired,
		timerRef,
		setServices,
		updateQuotation,
		MAPPING,
	} = useHandleEditMarginFooter(rest);

	return (
		<div className={styles.container}>
			{noRatesPresent ? (
				<div className={styles.error}>
					** Services with No Rates will be removed
				</div>
			) : null}

			<div className={styles.validity_time}>
				{!hasExpired ? (
					<div className={styles.flex}>
						<IcCWaitForTimeSlots
							height={24}
							width={24}
							style={{ marginRight: '8px' }}
						/>
						Expires in
					</div>
				) : null}

				<span
					id="timer"
					className={hasExpired ? styles.hidden : styles.visible}
					ref={timerRef}
				/>

				{hasExpired ? (
					<span className={styles.quotation_expired}>
						This Quotation has expired
						{' '}
						<Button
							loading={createSearchLoading}
							size="lg"
							type="button"
							themeType="link"
							style={{ marginLeft: '4px' }}
							onClick={handleUnlockLatestRate}
						>
							Create New Search
						</Button>
					</span>
				) : null}
			</div>

			{!isEmpty(services) ? (
				<RemoveServicesModal
					services={services}
					setServices={setServices}
					updateQuotation={updateQuotation}
				/>
			) : null}

			<div className={styles.button_container}>
				{MAPPING.map((item) => {
					const { key, label, ...restProps } = item;

					if (hasExpired) {
						return null;
					}

					return (
						<Button key={key} {...restProps}>
							{label}
						</Button>
					);
				})}
			</div>
		</div>
	);
}

export default EditMarginFooter;
