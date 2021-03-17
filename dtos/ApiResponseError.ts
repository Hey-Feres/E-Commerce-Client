// Nele estamos criando uma interface que irá receber um objeto contentdo um atributo do tipo field que pode ter qualquer atributo [key: string] contendo um array de strings.
// [key: string] determina que esse objeto poderá ter o seguinte formato:
// {
//   field: {
//     name: string[],
//     description: string[],
//     ...
//   }
// }

export default interface ApiResponseError {
  fields: {
    [key: string]: string[]
  }
}