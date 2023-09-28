import { Pill, Tooltip, Button } from '@cogoport/components';
import { IcMFcl, IcMPortArrow } from '@cogoport/icons-react';
import React, { useState } from 'react';

import RevertModal from './RevertModal';
import styles from './styles.module.css';

function LiveBookingsListCard() {
	const [modalState, setModalState] = useState({ data: {} });

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div>Booked On : 12 Aug 2023 </div>
				<div>
					Created At : 12 Aug 2023, 10:20AM
				</div>
			</div>

			<div className={styles.body}>
				<div className={styles.top_left_details}>
					<div className={styles.service_icon}>
						<div style={{ margin: '5px 5px 0 0' }}><IcMFcl width="20px" height="20px" /></div>
						<div className={styles.service_name}>FCL</div>
					</div>
					<div>
						<Pill size="md" color="orange">
							Import
						</Pill>
					</div>
					<div>
						<Pill size="md" color="blue">
							Shipping Line : Maersk
						</Pill>
					</div>
				</div>
				<div>
					<Pill size="md" color="orange">
						TID: 12345
					</Pill>
				</div>
				<div>
					<Pill size="md" color="blue">
						Assigned to: Himanshu Gupta
					</Pill>
				</div>
			</div>

			<div className={styles.body}>
				<div className={styles.port_details}>
					<div className={styles.row}>
						<Tooltip
							content={(
								<div>
									1234
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										CNSHA
									</p>
									<p>Shanghai , China</p>
								</div>
							</p>
						</Tooltip>
						<IcMPortArrow style={{ margin: '0 100' }} />
						<Tooltip
							content={(
								<div>
									123
								</div>
							)}
							placement="top"
						>
							<p className={styles.port_name}>
								<div className={styles.column}>
									<p className={styles.port_code_color}>
										(INNSA),
									</p>
									<p>
										Jawaharlal Nehru, India
									</p>
								</div>
							</p>
						</Tooltip>
					</div>
				</div>
				<div className={styles.vertical_line} />

				<div className={styles.top_left_details}>
					<div><Pill>40 ft HC</Pill></div>
					<div><Pill>Standard (Dry)</Pill></div>
					<div><Pill>White Goods</Pill></div>
				</div>

				<div className={styles.vertical_line} />

				<div className={styles.top_left_details}>
					<Button size="sm" style={{ marginRight: '10px' }} themeType="secondary">View Details</Button>
					<Button size="sm" onClick={() => setModalState(!modalState)}>Add Rate</Button>
				</div>
			</div>
			{modalState && <RevertModal modalState={modalState} setModalState={setModalState} />}
		</div>
	);
}

export default LiveBookingsListCard;
