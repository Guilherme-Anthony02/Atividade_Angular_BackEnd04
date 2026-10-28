import { ProdutoCatalogo } from './produto-catalogo';

export interface ItemCarrinho {
  produto: ProdutoCatalogo;
  quantidade: number;
}
