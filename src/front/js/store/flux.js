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
					const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					});
			
					if (resp.ok) {
						const data = await resp.json();
						setStore({ ...store, token: data.token });  // Guardar el token en el store
						localStorage.setItem('token', data.token);  // Guardar el token en localStorage
			
						// Puedes guardar el usuario en el store si lo necesitas
						// setStore({ ...store, user: user });
			
						console.log('Usuario registrado correctamente:', data);
					} else {
						// Manejar errores de solicitud
						console.log('Error en la solicitud:', resp.statusText);
						throw new Error('Error en la solicitud al registrar usuario');
					}
				} catch (error) {
					// Manejar errores de red u otros errores
					console.log('Error en la solicitud:', error.message);
					throw new Error('Error en la solicitud al registrar usuario');
				}
			},
			


			login: async (user) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/token`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: user.email,
                            password: user.password
                        })
                    });

                    if (!response.ok) {
                        throw new Error("Invalid response");
                    }

                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    return data;
                } catch (error) {
                    console.error("Error logging in:", error);
                }
            },

			
			
		}
	};
};

export default getState;
