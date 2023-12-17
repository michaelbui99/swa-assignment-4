import type { Game } from '@/app/models/game'
import type { User } from '@/app/models/user'

export async function updateUser(updatedUserState: User): Promise<User> {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/users/${updatedUserState.id}?token=${updatedUserState.token}`
  const response = await fetch(endpoint, {
    body: JSON.stringify({
      displayName: updatedUserState.displayName,
      profileImageUrl: updatedUserState.profileImageUrl
    }),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return updatedUserState
}

export async function createUser(username: string, password: string): Promise<User> {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/users`
  const response = await fetch(endpoint, {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()

  const newUser: User = {
    admin: data.admin,
    id: data.id,
    games: [],
    password: data.password,
    username: data.username
  }

  return newUser
}

export async function getUserById(userId: number, token: string): Promise<User | undefined> {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/users/${userId}?token=${token}`
  const response = await fetch(endpoint)

  try {
    return (await response.json()) ?? undefined
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export async function loginUser(loginDTO: LoginRequestDTO): Promise<User | undefined> {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/login`
  const loginResponse = await fetch(endpoint, {
    body: JSON.stringify(loginDTO),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const loginData: LoginResponseDTO = await loginResponse.json()

  const user: User | undefined = await getUserById(loginData.userId, loginData.token)
  if (!user) {
    return undefined
  }

  user.token = loginData.token
  const games = await getAllGames(user.token)
  user.games = games.filter((game) => game.user === user.id)
  return user
}

export async function logoutUser(user: User) {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/logout?token=${user.token}`
  const logoutResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

async function getAllGames(token: string): Promise<Game[]> {
  const baseUrl = 'http://localhost:9090'
  const endpoint = `${baseUrl}/games?token=${token}`
  const response = await fetch(endpoint)
  return (await response.json()) as Game[]
}

export type LoginRequestDTO = {
  username: string
  password: string
}

export type LoginResponseDTO = {
  token: string
  userId: number
}
