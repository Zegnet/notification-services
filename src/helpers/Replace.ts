/*
  Capturando a A clase e classe B de Replace de forma genérica e alterando as regras de um atributo
  especifico.
*/
export type Replace<T, R> = Omit<T, keyof R> & R;
