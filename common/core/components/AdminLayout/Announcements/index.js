import { Button, Popover, Select, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import AnnouncementItem from './AnnouncementItem';
import Loader from './Loader';
import styles from './styles.module.css';

const FILTER_OPTIONS = [
	{ label: 'General', value: 'general' },
	{ label: 'Product Release / Update', value: 'product_update' },
	{ label: 'Announcement', value: 'announcement' },
	{ label: 'Tasks', value: 'tasks' },
];

function Announcements({
	announcementProps = {},
	selectedAnnouncement = '',
}) {
	const {
		announcementLoading,
		announcementList,
		params,
		setParams,
		fetchAnnouncements = () => {},
		setAnnouncementModalData = () => {},
	} = announcementProps;

	const { list: data, totalCount = 0 } = announcementList;

	const {
		filters: { announcement_type = '' },
	} = params;

	useEffect(() => {
		fetchAnnouncements();
	}, [params, fetchAnnouncements]);

	const handleReset = () => {
		setParams((prev) => ({
			page    : 1,
			filters : {
				...prev.filters,
				announcement_type: undefined,
			},
		}));
	};

	const renderFilterPopover = () => (
		<div className={styles.popover_modal}>
			<div className={styles.header}>
				<div className={styles.label}>Sort By Type</div>
				<Button themeType="primary" size="sm" onClick={handleReset}>Reset</Button>
			</div>
			<Select
				placeholder="Select Type"
				style={{ marginBottom: 8 }}
				value={params.filters.announcement_type}
				onChange={(e) => {
					setParams((prev) => ({
						page    : 1,
						filters : {
							...prev.filters,
							announcement_type: e,
						},
					}));
				}}
				options={FILTER_OPTIONS}
			/>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.filters_container}>
				<div className={styles.toggle_container}>
					{/* <Toggle
						value={params.filters.toggle}
						onChange={() => {
							setParams((prev) => ({
								page    : 1,
								filters : {
									...prev.filters,
									toggle: !prev.filters.toggle,
								},
							}));
						}}
					/> */}
					<Toggle name="unread-toggle" size="sm" disabled={false} onLabel="Unread only" />
				</div>
				<div className={styles.filter}>
					<Popover
						interactive
						placement="bottom"
						theme="light"
						content={renderFilterPopover()}
					>
						<div className={styles.filter_btn_container}>
							<Button themeType="secondary" size="sm">
								Filter
								{announcement_type ? <div className={styles.filter_dot} /> : null}
								<IcMFilter />
							</Button>

						</div>
					</Popover>
				</div>
			</div>

			{isEmpty(data) && !announcementLoading ? (
				<div className={styles.empty_state}>No Announcement Found</div>
			) : null}

			{announcementLoading ? (
				<Loader />
			) : (
				<div className={styles.all_announcements}>
					{(data || []).map((item) => (
						<AnnouncementItem
							key={item.id}
							data={item}
							setAnnouncementModalData={setAnnouncementModalData}
							selectedAnnouncement={selectedAnnouncement}
						/>
					))}
					{data?.length < totalCount ? (
						<div
							className={styles.view_more}
							role="presentation"
							onClick={() => setParams((prev) => ({
								...prev,
								page: prev.page + 1,
							}))}
						>
							View More
						</div>
					) : null}
				</div>
			)}
		</div>
	);
}

export default Announcements;
