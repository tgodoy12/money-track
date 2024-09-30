const url = process.env.BACKEND_URL;
// const url = "http://localhost:3001/";

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
			login: async (values) => {
				try {
					let response = await fetch(url + "/api/login",{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							"email": values.email,
							"password": values.password
						})
					});
					
					let data = await response.json()
						if (response.ok){
							localStorage.setItem('access_token', data.results.access_token)
							setStore({ user:data.results.user })
							return true
						}
						setStore({ user: null })
						return false
				} catch (error) {
					console.log("Error:" + error);
					setStore({ user: null })
					return false
				}
			}
		},

	}
};


export default getState;
