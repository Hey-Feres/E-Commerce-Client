/*

  * Data Transfer Object *

  - Description: DTO that deliveries the authentication header's values

*/

export default interface ApiData {
  'access-token': string
  'client': string
  'expiry': number
  'token-type': string
  'uid': string
}