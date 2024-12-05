export type Users = { 
    id: number
    username: string,
    password: string,
    role: string
    age: number,
    email: string
};

export type SessionData = {
    username: string,
    age?: number,
    role?: string,
    createdAt: number
}

export type SessionType = {
    sessionId: string,
    sessionData: SessionData
}