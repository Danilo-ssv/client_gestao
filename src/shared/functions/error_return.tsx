export interface ErrorModel {
  type: 'NotAuthenticated' | 'NotAllowed' | 'Common';
  message: string;
}

export function errorReturn(message: string): ErrorModel {
  if (message == 'NotAuthenticated') return { type: 'NotAuthenticated', message: 'Não está Autenticado!' };
  if (message == 'NotAllowed') return { type: 'NotAllowed', message: 'Não possui esta Autorização!' };
  return { type: 'Common', message };
}