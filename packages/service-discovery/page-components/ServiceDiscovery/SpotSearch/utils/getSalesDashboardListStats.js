const DEFAULT_VALUE = 0;

const getSalesDashboardListStats = ({ data, rest, stats }) => {
	let totalListCount = 0;

	Object.keys(data?.[rest?.stats_key] || {}).forEach((key) => {
		const tempObj = data?.[rest?.stats_key] || {};
		totalListCount += tempObj[key];
	});

	let statsData = {
		...(data?.[rest?.stats_key] || {}),
		only_total_count : data?.total_count || DEFAULT_VALUE,
		total_count      : Math.max(totalListCount || DEFAULT_VALUE, data?.total_count || DEFAULT_VALUE),
		ongoing_shipments:
			(data?.stats?.confirmed_by_importer_exporter || DEFAULT_VALUE)
			+ (data?.stats?.in_progress || DEFAULT_VALUE),
		cancelled_shipments:
			(data?.stats?.cancelled || DEFAULT_VALUE) + (data?.stats?.aborted || DEFAULT_VALUE),
		kyc_pending:
			(data?.kyc_stats?.pending_from_user || DEFAULT_VALUE)
			+ (data?.kyc_stats?.pending_verification || DEFAULT_VALUE),
		booked_enquiries : data?.quotation_stats?.booked || DEFAULT_VALUE,
		documents_si     : data?.list?.documents || [],
		elapsed_time_1   : data?.elapsed_time || DEFAULT_VALUE,
	};

	if (rest?.serviceType) {
		statsData = data?.[rest?.stats_key]?.[rest.serviceType] || {};
	}

	if (data?.operations_dashboard_stats) {
		const {
			total,
			containers_not_departed,
			containers_not_gated_in,
			si_not_uploaded,
			draft_bl_not_uploaded,
			booking_note_uploaded,
			booking_not_placed_with_supplier,
			booking_placed_with_supplier,
		} = data?.operations_dashboard_stats || {};

		statsData = {
			...statsData,
			total                            : total || DEFAULT_VALUE,
			containers_not_departed          : containers_not_departed || DEFAULT_VALUE,
			containers_not_gated_in          : containers_not_gated_in || DEFAULT_VALUE,
			si_not_uploaded                  : si_not_uploaded || DEFAULT_VALUE,
			draft_bl_not_uploaded            : draft_bl_not_uploaded || DEFAULT_VALUE,
			booking_note_uploaded            : booking_note_uploaded || DEFAULT_VALUE,
			booking_not_placed_with_supplier : booking_not_placed_with_supplier || DEFAULT_VALUE,
			booking_placed_with_supplier     : booking_placed_with_supplier || DEFAULT_VALUE,
		};
	}

	if (data?.stats) {
		const {
			confirmed_by_importer_exporter,
			fcl_freight,
			cancelled,
			on_going,
			completed,
		} = data?.stats || {};

		statsData = {
			...statsData,
			confirmed_by_importer_exporter : confirmed_by_importer_exporter || DEFAULT_VALUE,
			containers_gated_in            : fcl_freight?.containers_gated_in || DEFAULT_VALUE,
			cancelled                      : cancelled || DEFAULT_VALUE,
			on_going                       : on_going || DEFAULT_VALUE,
			completed                      : completed || DEFAULT_VALUE,
		};
	}

	if (rest?.type === 'documents') {
		stats.forEach(({ key }) => {
			if (!statsData[key] && key !== 'only_total_count') {
				statsData[key] = '';
			}
		});
	}

	return statsData;
};
export default getSalesDashboardListStats;
