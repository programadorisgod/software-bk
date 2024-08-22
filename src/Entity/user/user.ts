export class User {
  //the decorators of typeOrm with respect to attributes already designed in the database

  id!: string

  name!: string

  lastName!: string

  email!: string

  phoneNumber!: string

  password!: string

  age!: number

  faceImage: string | undefined
}
