const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: null,
			userData: null,
		},
		actions: {
			register: async (user) => {
				const store = getStore();
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({ ...store, token: data.token });
						localStorage.setItem('token', JSON.stringify({ token: data.token }));
						// Puedes guardar el usuario en el store si lo necesitas
						setStore({ ...store, user: user });
					} else {
						console.log('Error en la solicitud:', resp.statusText);
					}
				} catch (error) {
					console.log('Error en la solicitud:', error);
				}
			},

			// Otras acciones...
		}
	};
};

export default getState;
