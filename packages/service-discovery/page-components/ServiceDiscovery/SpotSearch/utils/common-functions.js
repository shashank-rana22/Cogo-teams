const commonFunctions = ({ setSelectedRow = () => {} }) => {
	const renderFunctions = {
		renderButton: (itemData, itemField) => (
			// eslint-disable-next-line react/jsx-no-useless-fragment
			<>
				<div
					role="presentation"
					onClick={(e) => {
						if (itemField.action) {
							e.stopPropagation();
							setSelectedRow({
								action : itemField.action,
								data   : itemData,
							});
						}
						return false;
					}}
				>
					{itemField.btnLabel}
				</div>
			</>
		),
	};
	return { renderFunctions };
};

export default commonFunctions;
