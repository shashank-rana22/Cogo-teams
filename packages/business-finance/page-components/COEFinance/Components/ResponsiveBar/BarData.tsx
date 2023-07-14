const BarData = ({ dashboardData }) => dashboardData.map((item) => ({
	date     : item?.date,
	Uploaded : item?.uploadedCount,
	Approved : item?.approvedCount,
	Rejected : item?.rejectedCount,
}));
export default BarData;
