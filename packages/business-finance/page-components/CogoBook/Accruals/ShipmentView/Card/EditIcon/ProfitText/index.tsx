function ProfitText({ itemData, profit }) {
	return (
		<div>{`${profit[itemData.jobId] || itemData.newProfitPercentage} %`}</div>
	);
}

export default ProfitText;
