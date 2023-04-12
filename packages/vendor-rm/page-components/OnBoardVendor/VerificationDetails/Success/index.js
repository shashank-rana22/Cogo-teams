import { Button } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

import styles from './styles.module.css';

function Success({ setVendorInformation, setActiveStepper }) {
	const router = useRouter();

	const goToDashboard = () => {
		router.push('/vendors');
	};

	const addNewVendor = async () => {
		await setVendorInformation({});

		setActiveStepper('vendor_details');

		router.push('/onboard-vendor');
	};

	return (
		<div className={styles.container}>

			<div className={styles.icon_container}>
				<IcCFtick
					height={36}
					width={36}
				/>
			</div>

			<div>

				<div className={styles.header}>
					Vendor details submitted for verification.
				</div>

				<div className={styles.msg_text}>
					Your vendor has been successfully added to our vendor&apos;s list,
					and now going through verification.
				</div>

				<div className={styles.button_container}>
					<Button
						size="lg"
						type="button"
						themeType="secondary"
						style={{ marginRight: '12px' }}
						onClick={addNewVendor}
					>
						Add Another Vendor
					</Button>

					<Button
						size="lg"
						type="button"
						themeType="accent"
						onClick={goToDashboard}
					>
						Go To Dashboard
					</Button>
				</div>
			</div>

		</div>
	);
}

export default Success;
