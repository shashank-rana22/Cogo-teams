import { Button, Popover, Select, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

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
	const [popoverVisible, setPopoverVisible] = useState(false);

	const {
		announcementLoading = false,
		announcementList = {},
		params = {},
		setParams = () => {},
		fetchAnnouncements = () => {},
		setAnnouncementModalData = () => {},
	} = announcementProps;

	const { list: data, totalCount = 0 } = announcementList;

	const { filters: { announcement_type = '' } } = params;

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

		setPopoverVisible(false);
	};

	function RenderFilterPopover() {
		return (
			<div className={styles.popover_modal}>
				<div className={styles.header}>
					<div className={styles.label}>Sort By Type</div>
					<Button type="button" themeType="primary" size="sm" onClick={handleReset}>Reset</Button>
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
						setPopoverVisible(false);
					}}
					options={FILTER_OPTIONS}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.filters_container}>
				<div className={styles.toggle_container}>
					<Toggle
						name="unread-toggle"
						size="sm"
						disabled={false}
						onLabel="Unread only"
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
					/>
				</div>

				<div className={styles.filter}>
					<Popover
						interactive
						placement="bottom"
						theme="light"
						content={<RenderFilterPopover />}
						visible={popoverVisible}
					>
						<div className={styles.filter_btn_container}>

							<Button
								type="button"
								themeType="secondary"
								size="sm"
								onClick={() => setPopoverVisible((prev) => !prev)}
							>
								Filter
								{announcement_type ? <div className={styles.filter_dot} /> : null}
								<IcMFilter style={{ marginLeft: '2px' }} />
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
							isSelected={selectedAnnouncement === item.id}
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
