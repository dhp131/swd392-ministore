import { User } from '@/types'
import { atom } from 'jotai'

const userAtom = atom(null as User | null)

export { userAtom }
