import { UserRoleTypes } from '../../../domain/models/user-role.interface'
import { ISetUserRole, ISetUserRoleModel } from '../../../domain/use-cases/set-user-role.interface'
import { SetUserRoleMock } from '../../../mocks/domain/use-cases/set-user-role'
import { SetUserRoleRepository } from '../set-user-role.repository'

const makeSut = (): {
  dbSetUserRole: ISetUserRole
  sut: ISetUserRole
  data: ISetUserRoleModel
} => {
  const dbSetUserRole = new SetUserRoleMock()
  const sut = new SetUserRoleRepository(dbSetUserRole)
  const data: ISetUserRoleModel = {
    user_id: 'user_id',
    role: UserRoleTypes.user
  }

  return {
    dbSetUserRole,
    sut,
    data
  }
}

describe('set-user-role.repository', () => {
  describe('setUserRole', () => {
    it('should call ISetUserRole', async () => {
      const { sut, dbSetUserRole, data } = makeSut()
      const setUserRoleSpy = jest.spyOn(dbSetUserRole, 'setUserRole')
      await sut.setUserRole(data)
      expect(setUserRoleSpy).toHaveBeenCalled()
    })
  })
})
