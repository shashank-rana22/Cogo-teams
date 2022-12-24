import React from 'react';

export const RoutesContext = React.createContext({});

function RoutesProvider({ config, children }) {
	return <RoutesContext.Provider value={config}>{children}</RoutesContext.Provider>;
}

RoutesProvider.defaultProps = {
	config: {
		pathPrefix : '',
		asPrefix   : '',
		query      : {},
	},
};

export default RoutesProvider;
