// import { GetterTree, ActionTree, MutationTree } from 'vuex'

type UserType = {
  isAuthenticated: false
  name: string
  email: string
}

const initialUser: UserType = {
  isAuthenticated: false,
  name: 'Daniel Strong',
  email: 'daniel@helloworld.com',
}

export const state = () => ({
  user: initialUser,
})

export type RootState = ReturnType<typeof state>
