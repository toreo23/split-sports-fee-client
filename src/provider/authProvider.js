const authProvider = {
    // called when the user attempts to log in
    login: ({ username, password }) => {
        const request = new Request('http://localhost:3001/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                return response.json().then(auth => {
                    if(response.ok)localStorage.setItem('auth', JSON.stringify(auth));
                    else throw new Error(auth.msg)
                });
            })
            .catch((e) => {
                console.log('catch e = ', e)
                throw new Error(e)
            });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () =>  {
        let localStorageAuth = localStorage.getItem('auth');
        let token = localStorageAuth ? JSON.parse(localStorageAuth).token : ''

        const request = new Request('http://localhost:3001/users/tokenIsValid', {
            method: 'POST',
            //body: JSON.stringify({ username, password }),
            headers: new Headers({ 
                'Content-Type': 'application/json',
                Authorization: "Bearer " + token }),
        });

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                if (response.status == 200) {
                    console.log('response.clone().json()', response.clone().json())
                    console.log('response', response)
                    
                    return response.json();
                    // console.log('response.json', response.json)
                    // if(!response.json()) throw new Error(response.statusText);
                }
                
            })
            .then(data=>{
                console.log('data', data)
                return data?Promise.resolve:Promise.reject()
            })
            .catch((e) => {
                console.log('e', e)
                throw new Error('Network error', e)
            });
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {

        //return Promise.resolve() 
        const role = localStorage.getItem('auth');
        return JSON.parse(role) && JSON.parse(role).user.permission ? Promise.resolve(JSON.parse(role).user.permission) : Promise.reject();
    },
};

export default authProvider;