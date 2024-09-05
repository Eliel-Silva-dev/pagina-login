import { Environment } from '@/shared/environment';
import { Api } from '@/shared/services/api';

export interface IListagemUsers {
  email: string;
  password: string;
}
export interface IDetalheUsers {
  email: string;
  password: string;
}

type TUsersComTotalCount = {
  data: IListagemUsers[];
  totalCount: number;
};
