function ExtrasItem({ rowData }) {
	const { finalHeading, rowInfo } = rowData;
	console.log(rowData);
	return (
		<>
			<div>{finalHeading}</div>
			{/* <div>
				{rowInfo?.map((r) => (
					<div>{r.label}</div>
				))}

			</div> */}
		</>

	);
}

export default ExtrasItem;
