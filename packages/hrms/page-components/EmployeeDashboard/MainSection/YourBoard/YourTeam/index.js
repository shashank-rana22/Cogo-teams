import { cl, Modal, Tooltip } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React, { useEffect, useState } from 'react';

import makeShortName from '../../../../../common/MakeShortName';
import Organization from '../../../../../common/Organization';

import styles from './styles.module.css';

function YourTeam({ data = {}, params, setParams, loading }) {
	const { reportees } = data || {};

	const [maxVisible, setMaxVisible] = useState(5);
	const [showOrgData, setShowOrgData] = useState(false);

	useEffect(() => {
		// Function to update the isMobile state based on viewport width
		function handleResize() {
			const isLess = window.innerWidth < 767;
			setMaxVisible(isLess ? 4 : 5);
		}

		handleResize();

		// Add a resize event listener
		window.addEventListener('resize', handleResize);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const teamData = (reportees || []).slice(0, maxVisible);

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Your Team</div>
			<div className={styles.user_data}>
				{teamData.map((item) => (
					<div className={styles.user_detail} key={item}>
						{
							item?.passport_size_photo_url
								? (
									<img
										className={styles.user_avatar_photo}
										src={item?.passport_size_photo_url}
										alt="profile"
									/>
								)
								:							(
									<div className={cl`${styles.user_avatar_photo} ${styles.user_avatar}`}>
										{makeShortName(item.name)}
									</div>
								)
						}
						<Tooltip content={item.name} placement="top">
							<div className={styles.ellipse}>{item.name}</div>
						</Tooltip>
					</div>
				))}
			</div>
			<div
				className={styles.org_data}
				onClick={() => setShowOrgData(true)}
				aria-hidden
			>
				View Organization
				{' '}
				<IcMArrowRight style={{ marginLeft: 8 }} />
			</div>
			{showOrgData && (
				<Modal size="lg" show={showOrgData} onClose={() => setShowOrgData(false)} placement="top">
					<Modal.Header title="Organization" />
					<Modal.Body>
						<Organization data={data} loading={loading} params={params} setParams={setParams} />
					</Modal.Body>
				</Modal>
			)}
		</div>
	);
}

export default YourTeam;
