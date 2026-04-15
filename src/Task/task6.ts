interface UserInfo {
    name: string;
    email: string;
}

async function fetchUser(id: number): Promise<UserInfo | null> {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!response.ok) {
        console.log(
            "Произошла ошибка клиента или сервера при обращении к внешнему API"
        );
        return null;
    }

    const user = await response.json();

    if (typeof user?.name === "string" || typeof user?.email === "string") {
        return {
            name: user.name,
            email: user.email
        };
    } else {
        console.warn("API вернул нам какую то чушь");
        return null;
    }

    } catch (error) {
        console.warn("Произошла ошибка :", error.message);
        return null;
    }
    
}

const id = 1;

async function main() {
    try{
        const dataUser = await fetchUser(id);
        if (dataUser) {
            console.log(dataUser.name);
            console.log(dataUser.email);
        }
    } catch (error) {
        console.warn("Произошла ошибка", error.message);
    }
}

main()
