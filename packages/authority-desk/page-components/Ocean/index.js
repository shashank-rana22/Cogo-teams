import { Tabs, TabPanel, cl } from "@cogoport/components";
import { startCase } from "@cogoport/utils";
import React, { useState } from "react";
import { BucketsMapping } from "../../config/BucketMapping";
import useListAuthorityDeskDocuments from "../../hooks/useListAuthorityDeskDocuments";
import getGeoConstants from "@cogoport/globalization/constants/geo";
import { useSelector } from "@cogoport/store";
import Filters from "./Filters";
import List from "./List";
import ScopeSelect from "@cogoport/scope-select";
import styles from "./styles.module.css";

const services = ["fcl_freight", "lcl_freight", "fcl_local"];

function Ocean() {
	const roleName = {
		kam: "KAM",
		so2: "SO2",
		credit_control: "",
	};

	const geo = getGeoConstants();

	const { role_ids } = useSelector(({ profile }) => ({
		role_ids: profile?.partner?.user_role_ids,
	}));

	let role = "kam";
	const cc_view_roles = [
		geo.uuid.coe_finance_head,
		geo.uuid.super_admin_id,
		geo.uuid.admin_id,
		geo.uuid.prod_settlement_executive,
	];

	const service_ops2_role = geo.uuid.service_ops2_role_id;

	for (let i = 0; i < role_ids.length; i++) {
		if (cc_view_roles.includes(role_ids[i])) {
			role = "credit_control";
			break;
		} else if (service_ops2_role.includes(role_ids[i])) {
			role = "so2";
			break;
		}
	}

	const [allFilters, setAllFilters] = useState({
		activeTab: "bl",
		service: "fcl_freight",
		bucket: "eligible",
		subApprovedBucket: "",
		filters: { is_job_closed: "no", page: 1 },
	});

	const { data, loading } = useListAuthorityDeskDocuments({ ...allFilters });

	const { buckets, additionalTabs } = BucketsMapping({
		role,
		count_stats: data?.count_stats,
	});

	const { count_stats } = data;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{`${roleName[role]}  Authority Desk`}{" "}
			</div>

			<Tabs
				activeTab={allFilters.activeTab}
				themeType="primary"
				onChange={(val) =>
					setAllFilters({ ...allFilters, activeTab: val })
				}
				className={styles.tab_panel}
				fullWidth
			>
				<TabPanel name="bl" title="Bill of Ladings" />

				<TabPanel name="do" title="Delivery Orders" />
			</Tabs>

			<div className={styles.second_stepper}>
				<div className={styles.service_tabs}>
					{services.map((item) => (
						<div
							role="button"
							tabIndex={0}
							onClick={() =>
								setAllFilters({ ...allFilters, service: item })
							}
							className={cl`${
								allFilters.service === item ? styles.active : ""
							} ${styles.service_tab} `}
						>
							{startCase(item)}
						</div>
					))}
				</div>
				{role === "kam" ? <ScopeSelect size="md" /> : null}
			</div>

			<div className={styles.list_filters}>
				<div className={styles.buckets}>
					{buckets.map((item) => (
						<div
							role="button"
							tabIndex={0}
							className={cl`${
								allFilters.bucket === item?.name
									? styles.active
									: ""
							} ${styles.bucket} `}
							onClick={() =>
								setAllFilters({
									...allFilters,
									bucket: item?.name,
									subApprovedBucket:
										item?.name === "approved"
											? "approved"
											: "",
								})
							}
						>
							{item.title}{" "}
							<span
								className={`cl${
									allFilters.bucket === item
										? styles.active
										: ""
								} ${styles.count}`}
							>
								{item.count || 0}
							</span>
						</div>
					))}
				</div>

				<Filters
					allFilters={allFilters}
					setAllFilters={setAllFilters}
				/>
			</div>

			<List
				data={data}
				loading={loading}
				allFilters={allFilters}
				setAllFilters={setAllFilters}
				role={role}
				additionalTabs={additionalTabs}
			/>
		</div>
	);
}

export default Ocean;
