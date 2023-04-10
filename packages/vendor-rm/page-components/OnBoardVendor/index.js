import { Stepper } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import TABS_MAPPING from '../../constants/tabs';

import useGetVendor from './hooks/useGetVendor';
import styles from './styles.module.css';

function OnBoardVendor() {
	const {
		ActiveComponent,
		activeStepper = '',
		setActiveStepper = () => {},
		vendorInformation = {},
		showSuccessScreen,
		setShowSuccessScreen,
		setVendorInformation = () => {},
		getVendor = () => {},
		getVendorLoading = false,
		onBack = () => {},
	} = useGetVendor();

	return (
		<div>
			<div
				role="presentation"
				onClick={onBack}
				className={styles.back_container}
			>
				<IcMArrowBack fill="#221F20" width={20} height={16} />
				<div className={styles.back_text}>Back to Vendor Relationship Management</div>
			</div>

			<div className={styles.header}>Add New Vendor</div>

			{!showSuccessScreen ? (
				<div className={styles.tab_container}>
					<Stepper
						active={activeStepper}
						setActive={setActiveStepper}
						items={TABS_MAPPING}
						shadowed
						arrowed
						style={{ background: '#FFFFFF', padding: '2px', margin: '-15px' }}
					/>
				</div>
			) : null}

			<div className={styles.form_container}>
				<ActiveComponent
					getVendor={getVendor}
					getVendorLoading={getVendorLoading}
					activeStepper={activeStepper}
					showSuccessScreen={showSuccessScreen}
					setShowSuccessScreen={setShowSuccessScreen}
					setActiveStepper={setActiveStepper}
					vendorInformation={vendorInformation}
					setVendorInformation={setVendorInformation}
				/>
			</div>
		</div>
	);
}

export default OnBoardVendor;
