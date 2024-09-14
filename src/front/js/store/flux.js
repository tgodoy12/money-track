// const url = process.env.BACKEND_URL;
const url = "https://turbo-carnival-76xgp9gjx5xhx6v7-3001.app.github.dev";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

		}
	};
};

export default getState;
