import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase, isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../common/EmptyState';
import LoadingState from '../../common/Loading';

import DisplayCard from './DisplayCard';
import getSingleCardOptions from './DisplayCard/getSingleCardOptions';
import styles from './styles.module.css';
import useGetSingleAnnouncement from './useGetSingleAnnouncement';

function DisplayCards({
	activeTab = 'active',
	data = [],
	loading = false,
	loadingUpdate = false,
	loadingEditAndGoLive = false,
	setCurrentAnnouncement = () => {},
	currentAnnouncement = null,
	deleteAnnouncement = () => {},
	goLive = () => {},
}) {
	const { user_data } = useSelector(({ profile }) => ({ user_data: profile || {} }));

	const { push } = useRouter();

	const { user: { id: user_id = '' } } = user_data;

	const {
		handleAnnouncementDetails = () => {},
		refetch = () => {},
		loadingSingleAnnouncement = false,
		announcementDetails = {},
	} = useGetSingleAnnouncement({ currentAnnouncement, setCurrentAnnouncement, listData: data });

	const renderHeader = () => {
		const options = getSingleCardOptions({ });

		return (
			<div className={styles.header_container}>

				{(options || []).map((item) => {
					const { label = '' } = item;

					return (
						<div
							className={styles.header_item}
							style={{ width: `${['Actions', 'Status'].includes(label) ? '10%' : '20%'}` }}
						>
							{label}
						</div>
					);
				})}

			</div>
		);
	};

	const renderLoading = () => {
		if (loading) {
			if (activeTab === 'active') {
				return <LoadingState loadingCount={5} height="90px" itemHeight="32px" />;
			}

			return <LoadingState loadingCount={6} height="80px" itemHeight="28px" />;
		}

		return (
			<div className={styles.container}>
				<EmptyState
					text={`No ${startCase(activeTab)} Announcements Found`}
					btn_text={activeTab === 'active' ? 'Create Now' : ''}
					onClick={() => {
						push(
							'/announcements/create',
							'/announcements/create',
						);
					}}
				/>
			</div>
		);
	};

	return (
		<div className={styles.container}>

			{!isEmpty(data) ? renderHeader() : null}

			{loading || isEmpty(data) ? renderLoading() : (
				data.map((item, index) => (
					<DisplayCard
						key={item.id}
						activeTab={activeTab}
						refetch={refetch}
						loadingUpdate={loadingUpdate}
						loadingSingleAnnouncement={loadingSingleAnnouncement}
						loadingEditAndGoLive={loadingEditAndGoLive}
						data={item}
						user_id={user_id}
						index={index}
						accordianData={announcementDetails?.[index]}
						handleAnnouncementDetails={handleAnnouncementDetails}
						deleteAnnouncement={deleteAnnouncement}
						goLive={goLive}
					/>
				))
			)}
		</div>
	);
}

export default DisplayCards;
