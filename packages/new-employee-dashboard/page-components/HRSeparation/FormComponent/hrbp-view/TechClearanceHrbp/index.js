import { Button } from '@cogoport/components';
import { IcMArrowDown, IcMFtick, IcMArrowRight, IcMInformation, IcMTick, IcMCross } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import Heading from '../HRMeeting/Heading';

import styles from './styles.module.css';

function TechClearanceHrbp() {
	const [show, setShow] = useState(false);
	const [visible, setVisible] = useState(false);

	const STATUS_CONFIRMED = {
		cloud_service : 'Access Removed',
		atlassian     : 'Access Removed',
		github        : 'Access Removed',
		Figma         : 'Access Removed',
	};

	return (
		<>
			<Heading title="TECH CLEARANCE" subTitle="Access Removal" />

			{visible ? (
				<div className={styles.prompt}>
					<IcMInformation style={{ color: '#EE3425' }} width={20} height={20} />
					<span className={styles.prompt_text}>Rahul Dev has requested for cancellation of separation.</span>
					<div className={styles.buttons}>
						<Button style={{ background: '#fdebe9', color: 'black' }}>
							<IcMCross width={18} height={18} />
							<span>Reject</span>

						</Button>
						<Button className={styles.acc_btn}>
							<IcMTick width={20} height={20} />
							<span>Accept</span>

						</Button>
					</div>
				</div>
			) : null}
			<div className={styles.container}>

				<div className={styles.heading} aria-hidden onClick={() => setShow(!show)}>
					<span>
						Status
					</span>
					<div className={styles.button_add_service_container}>
						<IcMArrowDown
							width={16}
							height={16}
							className={show ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				</div>

				<div className={show ? styles.item_container : styles.item_container_closed}>
					{Object.keys(STATUS_CONFIRMED || {}).map((val) => (
						<div className={styles.detail} key={val.key}>
							<div className={styles.label}>
								{startCase(val) || '-'}
							</div>
							<div className={styles.status_detail}>
								<IcMFtick height={18} width={18} color="#849E4C" />
								{STATUS_CONFIRMED[val] || '-'}
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.footer}>
				<Button themeType="secondary" style={{ marginRight: '4px' }}>Back</Button>
				<Button themeType="primary" onClick={() => setVisible(!visible)}>
					Proceed
					<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

				</Button>
			</div>
		</>
	);
}

export default TechClearanceHrbp;
