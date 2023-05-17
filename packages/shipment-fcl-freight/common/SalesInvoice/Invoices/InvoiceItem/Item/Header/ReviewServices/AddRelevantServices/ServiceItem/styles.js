.container{
	display: flex;
	align-items: center;
	background: #ffffff;
	width: 50%;
	margin-bottom: 12px;
}

.service_container{
	border: 1px dashed #bdbdbd;
	border-radius: 4px;
	padding: 10px 20px;
	display: flex;
	width: 60%;
	justify-content: space-between;
	margin-right: 16px;
	cursor: pointer;
}

.service_name{
	margin: 0;
	font-weight: 500;
	font-size: 12px;
	line-height: 16px;
	color: #bdbdbd;
}

.avg_margin{
	margin: 0;
	font-weight: 400;
	font-size: 10px;
	line-height: 16px;
	color: #393f70;
}

.icon_wrapper{
	display: flex;
	align-items: center;
	justify-content: center;
}

.flex_row{
	.business-checkbox-label {
		font-weight: 400;
		font-size: 12px;
		line-height: 14px;
		color: #828282;
		margin: 0 0 0 15px;
		cursor: pointer;
	}

	.ui-core-checkbox-root {
		&:hover {
			border-color: #5936f0;
		}

		&:focus-within {
			border-color: #5936f0;
			box-shadow: 0 0 0 1px #5936f0;
		}
	}

	.ui-core-checkbox-root.checked {
		background: #5936f0;
		border-color: #5936f0;
	}
}
