import React, { use, useState } from 'react';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    const [users, setUsers] = useState(initialUsers);
    console.log(users);

    const handleAddUser = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email };
        console.log(user);

        // Create user
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Data After Post', data);
            const newUsers = [...users, data];
            setUsers(newUsers);
            e.target.reset();
        });
    };

    // ✅ Handle Delete
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log('Deleted:', data);
            // JSON-server delete returns empty object, so just update state anyway
            const remaining = users.filter(user => user.id !== id);
            setUsers(remaining);
        });
    };

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <input type="text" name='name' placeholder="Name" required />
                <br />
                <input type="email" name="email" placeholder="Email" required />
                <br />
                <input type="submit" value="Add User" />
            </form>

            <div>
                {
                    users.map(user => (
                        <p key={user.id}>
                            {user.name} : {user.email}
                            <button onClick={() => handleDelete(user.id)}>X</button>
                        </p>
                    ))
                }
            </div>
        </div>
    );
};

export default Users;
