declare global {
    namespace Express {
        interface Request {
            isLogged: {
                logged: boolean,
                userId: String
            }
        }
    }
}
