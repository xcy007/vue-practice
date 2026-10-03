import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores'

vi.mock('@/api/manager.js', () => ({
  login: vi.fn(),
  getinfo: vi.fn(),
}))

vi.mock('@/composables/auth.js', () => ({
  getToken: vi.fn(),
  setToken: vi.fn(),
  removeToken: vi.fn(),
}))

import { login, getinfo } from '@/api/manager.js'
import { setToken } from '@/composables/auth.js'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.resetAllMocks()
  })

  it('login 存储 token 并返回结果', async () => {
    login.mockResolvedValue({ token: 'abc123' })
    const store = useUserStore()

    const res = await store.login({ username: 'admin', password: '123456' })

    expect(login).toHaveBeenCalledWith('admin', '123456')
    expect(setToken).toHaveBeenCalledWith('abc123')
    expect(res).toEqual({ token: 'abc123' })
  })

  it('getinfo 写入 user 并返回结果', async () => {
    const user = { id: 1, name: 'admin' }
    getinfo.mockResolvedValue(user)
    const store = useUserStore()

    const res = await store.getinfo()

    expect(store.user).toEqual(user)
    expect(res).toEqual(user)
  })
})
