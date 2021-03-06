/*

  * Data Transfer Object *

  - Description: DTO that deliveries the authentication state.
    It implement the User's DTO as the value of loggedUser.

*/

import User from './User'

export default interface AuthState {
  auth: {
    loggedUser: User
  }
}