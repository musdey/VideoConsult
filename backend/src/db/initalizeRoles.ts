
import Role from '../models/Role'

const initalizeRoles = async function () {
  try {
    const result = await Role.estimatedDocumentCount()
    if (result === 0) {
      await createRoles()
      console.log('Roles are created initially')
    }
  } catch (err) {
    await createRoles()
  }
}

const createRoles = async function () {
  const customerRole = new Role({ name: 'CUSTOMER' })
  const employeeRole = new Role({ name: 'EMPLOYEE' })
  const shopownerRole = new Role({ name: 'SHOPOWNER' })
  const adminRole = new Role({ name: 'ADMIN' })

  try {
    await customerRole.save()
    await employeeRole.save()
    await shopownerRole.save()
    await adminRole.save()
  } catch (err) {
    console.log(err)
  }
}

export default initalizeRoles
