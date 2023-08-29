import { Button } from '@cogoport/components';
import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function AutomationWalletDetails() {
	const [openDetails, setOpenDetails] = useState(false);
	const [id, setId] = useState();

	const dummyData = [
		{ name: 'Fcl Freight', id: '1' },
		{ name: 'Lcl Freight', id: '2' },
	];

	const handel = (val) => {
		setId(val?.id);
		setOpenDetails(!openDetails);
	};

	return (
		<div>
			{dummyData?.map((item) => (
				<div
					key={item.name}
					className={styles.container}
					style={{ background: openDetails ? '#ededed' : '#ffff' }}
				>
					<div className={styles.service}>
						<div style={{ display: 'flex' }}>
							<div className={styles.icon}>
								<IcMArrowRotateRight
									onClick={() => handel(item)}
									height="20px"
									width="15px"
									style={{
										transform: !openDetails && item.id === id
											? 'rotate(270deg)' : 'rotate(90deg)',
										cursor: 'pointer',
									}}
								/>
							</div>
							<div className={styles.service_type}>{item?.name}</div>
						</div>
						<div>
							<Button size="md" themeType="secondary">View Details</Button>
						</div>
					</div>
					<div>
						{openDetails && item.id === id && (
							<div className={styles.container}>
								<div>Fcl Freight</div>
								<div className={styles.service}>
									<div className={styles.content_details}>
										<div className={styles.content}>
											Partner Entity: COGO FREIGHT PVT LTD
										</div>
										<div className={styles.content}>
											Margin Type: Demand
										</div>
										<div className={styles.content}>
											Margin Currency: USD
										</div>
									</div>
									<div>
										<Button size="md" themeType="secondary">View Details</Button>
									</div>
								</div>
								<div>
									Agent: ASWIN BENEDICT (aswin.benedict@cogoport.com)
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default AutomationWalletDetails;
