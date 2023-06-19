/* eslint-disable no-magic-numbers */
/* eslint-disable no-unsafe-optional-chaining */
const getSalesDashboardListStats = ({ data, rest, stats }) => {
	let totalListCount = 0;
	Object.keys(data?.[rest?.stats_key] || {}).forEach((key) => {
		totalListCount += data?.[rest?.stats_key][key];
	});

	let statsData = {
		...(data?.[rest?.stats_key] || {}),
		only_total_count : data?.total_count || 0,
		total_count      : Math.max(totalListCount || 0, data?.total_count || 0),
		ongoing_shipments:
			(data?.stats?.confirmed_by_importer_exporter || 0)
			+ (data?.stats?.in_progress || 0),
		cancelled_shipments:
			(data?.stats?.cancelled || 0) + (data?.stats?.aborted || 0),
		kyc_pending:
			(data?.kyc_stats?.pending_from_user || 0)
			+ (data?.kyc_stats?.pending_verification || 0),
		booked_enquiries : data?.quotation_stats?.booked || 0,
		documents_si     : data?.list?.documents || [],
		elapsed_time_1   : data?.elapsed_time || 0,
		reverted_key:
			data?.negotiation_stats?.total
				- data?.negotiation_stats?.total_unreverted || 0,
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
			total                            : total || 0,
			containers_not_departed          : containers_not_departed || 0,
			containers_not_gated_in          : containers_not_gated_in || 0,
			si_not_uploaded                  : si_not_uploaded || 0,
			draft_bl_not_uploaded            : draft_bl_not_uploaded || 0,
			booking_note_uploaded            : booking_note_uploaded || 0,
			booking_not_placed_with_supplier : booking_not_placed_with_supplier || 0,
			booking_placed_with_supplier     : booking_placed_with_supplier || 0,
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
			confirmed_by_importer_exporter : confirmed_by_importer_exporter || 0,
			containers_gated_in            : fcl_freight?.containers_gated_in || 0,
			cancelled                      : cancelled || 0,
			on_going                       : on_going || 0,
			completed                      : completed || 0,
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
