export const formatAgentList = ({
	list = [],
}) => (
	list?.reduce(
		(acc, item) => (
			{
				...acc,
				[item?.agent_type]: [
					...(acc[item?.agent_type] || []),
					item,
				],
			}
		),
		{},
	)
);
